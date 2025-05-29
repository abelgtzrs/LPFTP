import type { ObjectId } from "mongodb"

export interface Promotion {
  _id?: ObjectId
  title: string
  body: string
  image: string
  startDate: string
  endDate: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreatePromotionData {
  title: string
  body: string
  image: string
  startDate: string
  endDate: string
  active: boolean
}

export interface UpdatePromotionData extends Partial<CreatePromotionData> {
  updatedAt: Date
}
