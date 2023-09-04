import { useState } from 'react'
// import update user function from user-service to update user's shop property

export default function CreateProduct({ }) {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    images: null // 🟥 add images to item schema 🟥
  })
  const [error, setError] = useState('')

  function handleChange(e) {
    setProductData({ ...productData, [e.target.name]: e.target.value })
    setError('')
  }

  // 🟥 function for handling image upload 🟥

  function handleSubmit(e) {
    e.preventDefault()
    try {
      const formData = { ...productData }
      // 🟥 send request to create product 🟥
      // 🟥 update shop's products property with product._id 🟥
      // 🟥 set user state to have updated user info 🟥
    } catch {
      // an error happened on the server
      setError('product creation failed - try again')
    }
  }

  return (
    <div className={styles.CreateProduct}>
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
        </form>
      </div>
      <p className="error-message"></p>
    </div>
  )
}