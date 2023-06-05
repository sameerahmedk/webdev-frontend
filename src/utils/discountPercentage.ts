export interface Discount {
  quantity: number
  percentage: number
  _id: string
}

export function getDiscountedPricePercentage(
  orderQuantity: number,
  discounts: Discount[]
): number {
  let discountPercentage = 0

  for (const element of discounts) {
    if (
      orderQuantity >= element.quantity &&
      element.percentage > discountPercentage
    ) {
      discountPercentage = element.percentage
    }
  }

  return discountPercentage
}
