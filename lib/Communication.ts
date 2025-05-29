import type { ObjectId } from "mongodb"

export interface Communication {
  _id?: ObjectId
  title: string
  content: string
  publishDate: string
  status: "draft" | "published"
  createdAt: Date
  updatedAt: Date
}

export interface CreateCommunicationData {
  title: string
  content: string
  publishDate: string
  status: "draft" | "published"
}

export interface UpdateCommunicationData extends Partial<CreateCommunicationData> {
  updatedAt: Date
}
