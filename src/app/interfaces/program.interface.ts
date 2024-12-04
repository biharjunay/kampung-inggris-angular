export interface Program {
  id: number | string
  product_id: string
  name: string
  total_student: number
  review?: string
  total_minute?: number
  price: number
  discount_percentage: DiscountType
  discount_price: number
  is_discount: boolean
  type_id: number
}

enum DiscountType {
  percentage = 'percentage', flat = 'flat'
}
