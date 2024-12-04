import { Benefit } from "./benefit.interface"
import { ProductType } from "./product-type.interface"
import { Program } from "./program.interface"

export interface Product {
  id: number
  name: string
  image_url: string
  type: ProductType
  benefits_count: number
  total_student: number
  program_title: string
  rating: number | string;
  published_by: string;
}

export interface ProductDetail extends Product {
  programs: Program[]
  benefits: Benefit[]
  type: ProductType
}
