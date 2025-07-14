import dynamic from "next/dynamic"
import { Suspense } from "react"

const FoodClient = dynamic(() => import("./FoodClient"), { ssr: false })

export default function FoodPage() {
  return (
    <Suspense fallback={<div>Loading menu...</div>}>
      <FoodClient />
    </Suspense>
  )
}
