import { useState } from 'react'
// import update user function from user-service to update user's shop property

export default function CreateShop({ }) {
  const [shopData, setShopData] = useState({
    name: '',
    description: '', // 🟥 add shop description to shop schema 🟥
    logoImage: null, // 🟥 add shop logo to shop schema 🟥
    headerImage: null
  })
  const [error, setError] = useState('')

  function handleChange(e) {
    setShopData({ ...shopData, [e.target.name]: e.target.value })
    setError('')
  }

  // 🟥 function for handling image upload 🟥

  function handleSubmit(e) {
    e.preventDefault()
    try {
      const formData = { ...shopData }
      // 🟥 send request to create shop 🟥
      // 🟥 update user's shop property with shop._id 🟥
      // 🟥 set user state to have updated user info 🟥
    } catch {
      // an error happened on the server
      setError('shop creation failed - try again')
    }
  }

  return (
    <div className={styles.CreateShop}>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Shop Name</label>
          <input type="text" name="name" value={shopData.name} onChange={handleChange} required />
          <label>Shop Description</label>
          <input type="text" name="description" value={shopData.description} onChange={handleChange} required />
          {/* 🟥 need to be able to upload images with express-fileupload and cloudinary 🟥 */}
          <label>Shop Logo Image</label>
          <input type="file" name="logoImage" accept=".png, .jpg, .jpeg" value={shopData.logoImage} onChange={handleChange} multiple />
          <label>Shop Header Image</label>
          <input type="file" name="headerImage" accept=".png, .jpg, .jpeg" value={shopData.headerImage} onChange={handleChange} multiple />
        </form>
      </div>
      <p className="error-message"></p>
    </div>
  )
}