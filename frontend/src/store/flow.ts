import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'
import { analyzeFromDataUrl } from '../lib/faceAnalysis'
import { fetchGuides } from '../lib/api'
import type { FaceFeatures, FlowOptions, RecommendationResponse, TutorialResponse } from '../types'

type FlowState = {
  preview: string | null
  analysis: FaceFeatures | null
  tutorial: TutorialResponse
  recommendations: RecommendationResponse
  options: FlowOptions
  loading: boolean
  error: string | null
  setPreview: (dataUrl: string | null) => void
  setOptions: (opts: Partial<FlowOptions>) => void
  runAnalysis: () => Promise<void>
  applyOptions: () => Promise<void>
  reset: () => void
}

const defaultOptions: FlowOptions = {
  tpo: 'daily',
  mood: 'balanced',
  style: 'modern',
  tone: 'neutral',
}

const emptyGuide: TutorialResponse = { basic: [], detailed: [] }
const emptyRec: RecommendationResponse = { base: [], color: [] }

export const useFlowStore = createWithEqualityFn<FlowState>(
  (set, get) => ({
  preview: null,
  analysis: null,
  tutorial: emptyGuide,
  recommendations: emptyRec,
  options: defaultOptions,
  loading: false,
  error: null,
  setPreview: (dataUrl) =>
    set(() => ({
      preview: dataUrl,
      analysis: null,
      tutorial: emptyGuide,
      recommendations: emptyRec,
      error: null,
    })),
  setOptions: (opts) =>
    set((state) => ({
      options: { ...state.options, ...opts },
    })),
  runAnalysis: async () => {
    const { preview, options } = get()
    if (!preview) {
      set({ error: '얼굴 사진을 먼저 업로드해 주세요.' })
      return
    }
    set({ loading: true, error: null })
    try {
      const features = await analyzeFromDataUrl(preview)
      set({ analysis: features })
      const guides = await fetchGuides(features, options)
      set({ tutorial: guides.tutorial, recommendations: guides.recommendations })
    } catch (err: any) {
      const message = err?.message || '분석 중 오류가 발생했습니다.'
      set({ error: message })
    } finally {
      set({ loading: false })
    }
  },
  applyOptions: async () => {
    const { analysis, options } = get()
    if (!analysis) return
    set({ loading: true, error: null })
    try {
      const guides = await fetchGuides(analysis, options)
      set({ tutorial: guides.tutorial, recommendations: guides.recommendations })
    } catch (err: any) {
      set({ error: err?.message || '옵션 적용 중 오류가 발생했습니다.' })
    } finally {
      set({ loading: false })
    }
  },
  reset: () =>
    set({
      preview: null,
      analysis: null,
      tutorial: emptyGuide,
      recommendations: emptyRec,
      options: defaultOptions,
      loading: false,
      error: null,
    }),
  }),
  shallow
)
