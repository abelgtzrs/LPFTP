import { getDatabase } from "@/lib/mongodb"
import type { Promotion, CreatePromotionData, UpdatePromotionData } from "@/lib/Promotion"
import { ObjectId } from "mongodb"

export class PromotionService {
  private static async getCollection() {
    const db = await getDatabase()
    return db.collection<Promotion>("promotions")
  }

  static async getAllPromotions(): Promise<Promotion[]> {
    const collection = await this.getCollection()
    return await collection.find({}).sort({ createdAt: -1 }).toArray()
  }

  static async getActivePromotions(): Promise<Promotion[]> {
    const collection = await this.getCollection()
    const today = new Date().toISOString().split("T")[0]

    return await collection
      .find({
        active: true,
        startDate: { $lte: today },
        endDate: { $gte: today },
      })
      .sort({ createdAt: -1 })
      .toArray()
  }

  static async getPromotionById(id: string): Promise<Promotion | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ _id: new ObjectId(id) })
  }

  static async createPromotion(promotionData: CreatePromotionData): Promise<Promotion> {
    const collection = await this.getCollection()
    const now = new Date()

    const promotion: Omit<Promotion, "_id"> = {
      ...promotionData,
      createdAt: now,
      updatedAt: now,
    }

    const result = await collection.insertOne(promotion)
    return { ...promotion, _id: result.insertedId }
  }

  static async updatePromotion(id: string, updateData: UpdatePromotionData): Promise<Promotion | null> {
    const collection = await this.getCollection()
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } },
      { returnDocument: "after" },
    )
    return result
  }

  static async deletePromotion(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount === 1
  }
}
