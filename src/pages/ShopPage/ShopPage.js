import ProductList from "../../components/ProductList/ProductList"

export default function ShopPage({ items }) {
  return (
    <div>
      <p>This is the Shop Page</p>
      <ProductList productItems={items} />
    </div>
  )
}