import { getDatabase } from "@/lib/mongodb"
import type { Communication, CreateCommunicationData, UpdateCommunicationData } from "@/lib/Communication"
import { ObjectId } from "mongodb"

export class CommunicationService {
  private static async getCollection() {
    const db = await getDatabase()
    return db.collection<Communication>("communications")
  }

  static async getAllCommunications(): Promise<Communication[]> {
    const collection = await this.getCollection()
    return await collection.find({}).sort({ publishDate: -1 }).toArray()
  }

  static async getPublishedCommunications(): Promise<Communication[]> {
    const collection = await this.getCollection()
    return await collection.find({ status: "published" }).sort({ publishDate: -1 }).toArray()
  }

  static async getCommunicationById(id: string): Promise<Communication | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ _id: new ObjectId(id) })
  }

  static async createCommunication(communicationData: CreateCommunicationData): Promise<Communication> {
    const collection = await this.getCollection()
    const now = new Date()

    const communication: Omit<Communication, "_id"> = {
      ...communicationData,
      createdAt: now,
      updatedAt: now,
    }

    const result = await collection.insertOne(communication)
    return { ...communication, _id: result.insertedId }
  }

  static async updateCommunication(id: string, updateData: UpdateCommunicationData): Promise<Communication | null> {
    const collection = await this.getCollection()
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } },
      { returnDocument: "after" },
    )
    return result
  }

  static async deleteCommunication(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount === 1
  }
}
