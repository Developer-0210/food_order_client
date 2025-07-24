import { Suspense } from "react"
import FoodClient from "./FoodClient"
export default function FoodPage() {
  return (
    <Suspense fallback={<div>Loading menu...</div>}>
      <FoodClient />
    </Suspense>
  )
}
