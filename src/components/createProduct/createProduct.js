import { useState } from 'react'
import styles from './CreateProduct.module.scss'
import FormInput from '../FormInput/FormInput'
import { useNavigate } from 'react-router-dom'
import { addItemToShop } from '../../utilities/shops-api'
import { itemPost } from '../../utilities/image-upload'

export default function CreateProduct({ user, setUser, userShop, setUserShop, categories, setShopProducts, shopProducts }) {
  const [productValues, setProductValues] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    file: '',
  })
  const [file, setFile] = useState(null)
  const [photoUrl, setPhotoUrl] = useState('')
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

  const imageInputProps = {
    id: "add-photo",
    name: "file",
    type: "file",
    accept: ".png, .jpg, .jpeg",
    errorMessage:
      "File type must be .png, .jpeg, or .jpg",
    label: "Product Image"
  }

  const handleInputChange = (e) => {
    setProductValues({ ...productValues, [e.target.name]: e.target.value })
  }

  // 🟥 function for handling image upload 🟥

  async function handleProductSubmit(e) {
    e.preventDefault()
    // Create an item
    // save to db
    // add to shop (state) - i want it to show up
    // const newItem = {
    //   name: productValues.name,
    //   price: parseInt(productValues.price, 10),
    //   description: productValues.description,
    //   category: productValues.category,
    // }
    // console.log(newItem)
    // const { shop, item } = await addItemToShop(userShop._id, newItem)
    // console.log(item)
    // setUserShop(shop)
    // setShopProducts( [...shopProducts, item])
    const formData = new FormData()
    formData.append('file', file)
    for (let key in values) {
      formData.append(key, values[key])
    }
    const data = await itemPost(formData)
    setPhotoUrl(data.secure_url)
    console.log(data)
  }

  const handleImageChange = (e) => {
    e.preventDefault()
    console.log(e.target.files)
    let reader = new FileReader()
    let file = e.target.files[0]
    reader.onloadend = () => {
      setFile(file)
    }
    reader.readAsDataURL(file)
  }
  return (
    <div className={styles.CreateProduct}>
      <div className="form-container">
        <h1 className={styles.h1}>{location.pathname === '/shopmgmt' ? 'Create A Product' : 'Edit Product Details'}</h1>
        <form autoComplete="off" onSubmit={handleProductSubmit}>
          <FormInput {...imageInputProps} handleInputChange={handleImageChange} />
          {productInputs.map(input => <FormInput key={input.id} {...input} value={productValues[input.name]} handleInputChange={handleInputChange} />)}
          <label htmlFor='product-category'>Product Category:</label>
          <select id='product-category' name='category' value={productValues.category} onChange={handleInputChange}>
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