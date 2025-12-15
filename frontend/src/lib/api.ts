import axios from 'axios'
import type { FaceFeatures, FlowOptions, RecommendationResponse, TutorialResponse } from '../types'

const BASE_URL = 'http://localhost:4000'

export const fetchGuides = async (features: FaceFeatures, options: FlowOptions) => {
  const { data } = await axios.post<{ tutorial: TutorialResponse; recommendations: RecommendationResponse }>(
    `${BASE_URL}/api/analyze`,
    { features, options }
  )
  return data
}
