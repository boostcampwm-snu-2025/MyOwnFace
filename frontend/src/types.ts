export type FaceFeatures = {
  faceShape: 'oval' | 'round' | 'square' | 'heart' | 'long' | 'diamond'
  eyes: { size: 'small' | 'medium' | 'large'; spacing: 'narrow' | 'balanced' | 'wide' }
  nose: { length: 'short' | 'medium' | 'long'; width: 'slim' | 'balanced' | 'broad' }
  lips: { fullness: 'thin' | 'medium' | 'full' }
  symmetry: 'balanced' | 'slightly-asymmetric'
}

export type Step = { title: string; detail: string }
export type Recommendation = { name: string; reason: string }
export type TutorialResponse = { basic: Step[]; detailed: Step[] }
export type RecommendationResponse = { base: Recommendation[]; color: Recommendation[] }

export type FlowOptions = {
  tpo: 'daily' | 'office' | 'date' | 'event'
  mood: 'balanced' | 'fresh' | 'bold'
  style: 'modern' | 'classic' | 'glow' | 'bold'
  tone: 'neutral' | 'warm' | 'cool'
}
