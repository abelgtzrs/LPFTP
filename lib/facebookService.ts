import { getDatabase } from "@/lib/mongodb"
import type { FacebookPost, CreateFacebookPostData } from "@/lib/FacebookPost"
import { ObjectId } from "mongodb"

export class FacebookService {
  private static async getCollection() {
    const db = await getDatabase()
    return db.collection<FacebookPost>("facebook_posts")
  }

  static async getActivePosts(): Promise<FacebookPost[]> {
    const collection = await this.getCollection()
    return await collection.find({ active: true }).sort({ timestamp: -1 }).limit(10).toArray()
  }

  static async createPost(postData: CreateFacebookPostData): Promise<FacebookPost> {
    const collection = await this.getCollection()
    const now = new Date()

    const post: Omit<FacebookPost, "_id"> = {
      ...postData,
      createdAt: now,
      updatedAt: now,
    }

    const result = await collection.insertOne(post)
    return { ...post, _id: result.insertedId }
  }

  static async updatePostEngagement(
    id: string,
    likes: number,
    comments: number,
    shares: number,
  ): Promise<FacebookPost | null> {
    const collection = await this.getCollection()
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { likes, comments, shares, updatedAt: new Date() } },
      { returnDocument: "after" },
    )
    return result
  }
}
