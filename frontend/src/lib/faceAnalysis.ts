import * as faceapi from 'face-api.js'
import type { FaceFeatures } from '../types'

let modelsLoaded = false

export const loadFaceModels = async () => {
  if (modelsLoaded) return
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  ])
  modelsLoaded = true
}

const distance = (a: { x: number; y: number }, b: { x: number; y: number }) =>
  Math.hypot(a.x - b.x, a.y - b.y)

const summarizeLandmarks = (landmarks: faceapi.FaceLandmarks68): FaceFeatures => {
  const pts = landmarks.positions
  const faceWidth = distance(pts[0], pts[16])
  const cheekWidth = distance(pts[2], pts[14])
  const jawWidth = distance(pts[4], pts[12])
  const faceHeight = distance(pts[27], pts[8])
  const ratio = faceHeight / faceWidth
  const jawRatio = jawWidth / cheekWidth

  let faceShape: FaceFeatures['faceShape'] = 'oval'
  if (ratio > 1.55) faceShape = 'long'
  else if (ratio < 1.05 && jawRatio > 0.92) faceShape = 'square'
  else if (jawRatio < 0.75) faceShape = 'heart'
  else if (ratio < 1.25) faceShape = 'round'
  else if (jawRatio < 0.85) faceShape = 'diamond'

  const leftEyeWidth = distance(pts[36], pts[39])
  const rightEyeWidth = distance(pts[42], pts[45])
  const leftEyeHeight = distance(pts[37], pts[41])
  const rightEyeHeight = distance(pts[43], pts[47])
  const eyeOpening = (leftEyeHeight / leftEyeWidth + rightEyeHeight / rightEyeWidth) / 2
  const eyeGap = distance(pts[39], pts[42]) / ((leftEyeWidth + rightEyeWidth) / 2)

  const eyeSize: FaceFeatures['eyes']['size'] =
    eyeOpening > 0.34 ? 'large' : eyeOpening < 0.27 ? 'small' : 'medium'
  const eyeSpacing: FaceFeatures['eyes']['spacing'] =
    eyeGap > 1.65 ? 'wide' : eyeGap < 1.25 ? 'narrow' : 'balanced'

  const noseLengthRatio = distance(pts[27], pts[33]) / faceHeight
  const noseWidthRatio = distance(pts[31], pts[35]) / faceWidth
  const noseLength: FaceFeatures['nose']['length'] =
    noseLengthRatio > 0.55 ? 'long' : noseLengthRatio < 0.45 ? 'short' : 'medium'
  const noseWidth: FaceFeatures['nose']['width'] =
    noseWidthRatio > 0.32 ? 'broad' : noseWidthRatio < 0.26 ? 'slim' : 'balanced'

  const mouthWidth = distance(pts[48], pts[54])
  const lipVolume = (distance(pts[50], pts[58]) + distance(pts[52], pts[56])) / 2 / mouthWidth
  const lipFullness: FaceFeatures['lips']['fullness'] =
    lipVolume > 0.35 ? 'full' : lipVolume < 0.26 ? 'thin' : 'medium'

  const symmetryGap =
    Math.abs(distance(pts[36], pts[33]) - distance(pts[45], pts[33])) / Math.max(faceWidth, 1)
  const symmetry: FaceFeatures['symmetry'] = symmetryGap > 0.025 ? 'slightly-asymmetric' : 'balanced'

  return {
    faceShape,
    eyes: { size: eyeSize, spacing: eyeSpacing },
    nose: { length: noseLength, width: noseWidth },
    lips: { fullness: lipFullness },
    symmetry,
  }
}

export const analyzeFromDataUrl = async (dataUrl: string): Promise<FaceFeatures> => {
  await loadFaceModels()
  const img = await faceapi.fetchImage(dataUrl)
  const detection = await faceapi
    .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions({ inputSize: 416 }))
    .withFaceLandmarks()

  if (!detection) {
    throw new Error('얼굴이 감지되지 않았습니다.')
  }

  return summarizeLandmarks(detection.landmarks)
}
