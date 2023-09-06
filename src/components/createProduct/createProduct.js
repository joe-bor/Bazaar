import { useState } from 'react'
import { createItem } from '../../utilities/items-api'
// import update user function from user-service to update user's shop property
// import image upload function from utilities

export default function CreateProduct({ }) {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    images: null // 🟥 add images to item schema 🟥
  })
  const [error, setError] = useState('')
  const [showProductModal, setShowProductModal] = useState(false)

  function toggleProductModal() {
    setShowProductModal(!showProductModal)
  }

  function handleChange(e) {
    setProductData({ ...productData, [e.target.name]: e.target.value })
    setError('')
  }

  // 🟥 function for handling image upload 🟥

  function handleSubmit(e) {
    e.preventDefault()
    try {
      const formData = { ...productData }
      // send request to create product
      createItem(formData)
      // 🟥 update shop's products property with product._id 🟥
      // 🟥 set user state to have updated user info 🟥
      toggleProductModal()
    } catch {
      // an error happened on the server
      setError('product creation failed - try again')
    }
  }

  return (
    <div className={styles.CreateProduct}>
      <div className={styles.closeBtn} onClick={toggleProductModal}>X</div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Product Name</label>
          <input type="text" name="name" value={productData.name} onChange={handleChange} required />
          <label>Product Description</label>
          <input type="text" name="description" value={productData.description} onChange={handleChange} required />
          <label>Product Price</label>
          <input type="text" name="price" value={productData.price} onChange={handleChange} required />
          {/* 🟥 need to be able to upload images with express-fileupload and cloudinary 🟥 */}
          <label>Product Images</label>
          <input type="file" name="images" accept=".png, .jpg, .jpeg" value={productData.images} onChange={handleChange} multiple />
          <button type="submit">Create Product</button>
        </form>
      </div>
      <p className="error-message">{error}</p>
    </div>
  )
}