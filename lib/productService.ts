import { getDatabase } from "@/lib/mongodb"
import type { Product, CreateProductData, UpdateProductData } from "@/lib/Product"
import { ObjectId } from "mongodb"

export class ProductService {
  private static async getCollection() {
    const db = await getDatabase()
    return db.collection<Product>("products")
  }

  static async getAllProducts(): Promise<Product[]> {
    const collection = await this.getCollection()
    return await collection.find({}).sort({ createdAt: -1 }).toArray()
  }

  static async getFeaturedProducts(): Promise<Product[]> {
    const collection = await this.getCollection()
    return await collection.find({ featured: true }).sort({ createdAt: -1 }).limit(6).toArray()
  }

  static async getProductsByCategory(category: string): Promise<Product[]> {
    const collection = await this.getCollection()
    return await collection.find({ category }).sort({ createdAt: -1 }).toArray()
  }

  static async getProductById(id: string): Promise<Product | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ _id: new ObjectId(id) })
  }

  static async createProduct(productData: CreateProductData): Promise<Product> {
    const collection = await this.getCollection()
    const now = new Date()

    const product: Omit<Product, "_id"> = {
      ...productData,
      rating: 0,
      reviews: 0,
      createdAt: now,
      updatedAt: now,
    }

    const result = await collection.insertOne(product)
    return { ...product, _id: result.insertedId }
  }

  static async updateProduct(id: string, updateData: UpdateProductData): Promise<Product | null> {
    const collection = await this.getCollection()
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } },
      { returnDocument: "after" },
    )
    return result
  }

  static async deleteProduct(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount === 1
  }

  static async searchProducts(query: string): Promise<Product[]> {
    const collection = await this.getCollection()
    return await collection
      .find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
        ],
      })
      .toArray()
  }
}
