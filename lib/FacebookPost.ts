import type { ObjectId } from "mongodb"

export interface FacebookPost {
  _id?: ObjectId
  content: string
  image?: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  type: "promotion" | "product" | "food" | "service" | "news"
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateFacebookPostData {
  content: string
  image?: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  type: "promotion" | "product" | "food" | "service" | "news"
  active: boolean
}
