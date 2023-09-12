import { useState } from 'react'
import styles from './CreateProduct.module.scss'
import FormInput from '../FormInput/FormInput'
import { useNavigate } from 'react-router-dom'
import { addItemToShop } from '../../utilities/shops-api'

export default function CreateProduct({ user, setUser, userShop, setUserShop, categories }) {
  const [productValues, setProductValues] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
    // images:
  })
  const navigate = useNavigate()

  const productInputs = [
    {
      id: "product-name",
      name: "name",
      type: "text",
      placeholder: "Product Name",
      value: location.pathname === '/shopmgmt' ? productValues.name : shop?.name,
      errorMessage:
        "Product name is required and can't include special characters",
      label: "Product Name",
      pattern: "^[A-Za-z0-9 ']+$",
      required: true,
    },
    {
      id: "product-description",
      name: "description",
      type: "text",
      placeholder: "Product Description",
      value: location.pathname === '/shopmgmt' ? productValues.description : shop?.description,
      errorMessage: "Product description is required",
      label: "Product Description",
      required: true,
    },
    {
      id: "product-price",
      name: "price",
      type: "text",
      placeholder: "00.00",
      value: location.pathname === '/shopmgmt' ? productValues.price : shop?.price,
      errorMessage: "Product price is required",
      label: "Product Price",
      required: true,
    },
  ]

  const photoInputProps = {
    id: "product-photo",
    name: "file",
    type: "file",
    accept: ".png, .jpg, .jpeg",
    errorMessage:
      "File type must be .png, .jpeg, or .jpg",
    label: "Product Photo"
  }

  const handleProductInputChange = (e) => {
    setProductValues({ ...productValues, [e.target.name]: e.target.value })
  }

  // 🟥 function for handling image upload 🟥

  async function handleProductSubmit(e) {
    e.preventDefault()

    // Create an item
    // save to db
    // add to shop (state) - i want it to show up
    const newItem = {
      name: productValues.name,
      price: productValues.price,
      description: productValues.description,
      category: productValues.category,
    }
    const shop = await addItemToShop(userShop._id, newItem)
    setUserShop(shop)
  }

  return (
    <div className={styles.CreateProduct}>
      <div className="form-container">
        <h1 className={styles.h1}>{location.pathname === '/shopmgmt' ? 'Create A Product' : 'Edit Product Details'}</h1>
        <form autoComplete="off" onSubmit={handleProductSubmit}>
          {/* <FormInput {...logoInputProps} handleInputChange={handleImageChange} /> */}
          {productInputs.map(input => <FormInput key={input.id} {...input} value={productValues[input.name]} handleInputChange={handleProductInputChange} />)}
          <label htmlFor='product-category'>Product Category:</label>
          <select id='product-category' name='category' value={productValues.category} onChange={handleProductInputChange}>
            {categories.slice(1).map( (category) => {
              return <option  key={category} value={category}>{category}</option>
            })}
          </select>
          <button formMethod='dialog'>{location.pathname === '/shopmgmt' ? 'Create Product' : 'Update Product'}</button>
        </form>
      </div>
    </div>
  )
}