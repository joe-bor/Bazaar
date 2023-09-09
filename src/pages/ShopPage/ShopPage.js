import ProductList from "../../components/ProductList/ProductList"

export default function ShopPage({ items, user, setUser }) {
  return (
    <div>
      <ProductList productItems={items} user={user} setUser={setUser} />
    </div>
  )
}