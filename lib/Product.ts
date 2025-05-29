import type { ObjectId } from "mongodb"

export interface Product {
  _id?: ObjectId
  name: string
  category: string
  price: number
  originalPrice?: number
  description: string
  image: string
  stock: number
  popular: boolean
  featured: boolean
  discount: number
  rating?: number
  reviews?: number
  createdAt: Date
  updatedAt: Date
}

export interface CreateProductData {
  name: string
  category: string
  price: number
  originalPrice?: number
  description: string
  image: string
  stock: number
  popular: boolean
  featured: boolean
  discount: number
}

export interface UpdateProductData extends Partial<CreateProductData> {
  updatedAt: Date
}
