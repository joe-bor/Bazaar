import { useState } from 'react'
import { createShop, editShopInfo } from '../../utilities/shops-api'
import styles from './CreateShop.module.scss'
import FormInput from '../FormInput/FormInput'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../../utilities/users-service'
import { shopPost } from '../../utilities/image-upload'

export default function CreateShop({ user, setUser, location, userShop, setUserShop, toggleEditShop }) {
  const [shopValues, setShopValues] = useState({
    name: '',
    description: '',
    file: ''
  })
  const [file, setFile] = useState(null)
  const [photoUrl, setPhotoUrl] = useState('')

  const navigate = useNavigate()


  const shopInputs = [
    {
      id: "shop-name",
      name: "name",
      type: "text",
      placeholder: "Shop Name",
      value: location.pathname === '/account' ? shopValues.name : userShop?.name,
      errorMessage:
        "Shop name is required and can't include special characters",
      label: "Shop Name",
      pattern: "^[A-Za-z0-9 ']+$",
      required: true,
    },
    {
      id: "shop-description",
      name: "description",
      type: "text",
      placeholder: "Shop Description",
      value: location.pathname === '/account' ? shopValues.description : userShop?.description,
      errorMessage: "Shop description is required",
      label: "Shop Description",
      required: true,
    }
  ]

  const logoInputProps = {
    id: "shop-logo",
    name: "file",
    type: "file",
    accept: ".png, .jpg, .jpeg",
    errorMessage:
      "File type must be .png, .jpeg, or .jpg",
    label: "Shop Logo Image"
  }
  const imageInputProps = {
    id: "add-photo",
    name: "file",
    type: "file",
    accept: ".png, .jpg, .jpeg",
    errorMessage:
      "File type must be .png, .jpeg, or .jpg",
    label: "Shop Image"
  }

  const handleShopInputChange = (e) => {
    setShopValues({ ...shopValues, [e.target.name]: e.target.value })
  }

  // 🟥 function for handling image upload 🟥

  async function handleShopSubmit(e) {
    e.preventDefault()
    if (location.pathname === '/shopmgmt') {
      // send request to update shop
      const formData = new FormData()
        formData.append('file', file)
        for (let key in values) {
            formData.append(key, values[key])
        }
        const updatedShop = await shopPost(userShop._id, formData)
        setPhotoUrl(updatedShop.secure_url)
        console.log(updatedShop)
      setUserShop(updatedShop)
      toggleEditShop()
    } else {
      // send request to create shop
      const { shopOwner, shop } = await createShop({
        seller: user._id,
        name: shopValues.name,
        description: shopValues.description
      })
      // set user state to have shop info
      const updatedUser = await updateUser(user._id, shopOwner)      
      setUser(updatedUser)
      setUserShop(shop)
      navigate('/shopmgmt')
    }
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
    <div className={styles.CreateShop}>
      <div className="form-container">
        <h1 className={styles.h1}>{location.pathname === '/account' ? 'Create A Shop' : 'Edit Shop Details'}</h1>
        <form autoComplete="off" onSubmit={handleShopSubmit}>
          <FormInput {...imageInputProps} handleInputChange={handleImageChange} />
          {shopInputs.map(input => <FormInput key={input.id} {...input} value={shopValues[input.name]} handleInputChange={handleShopInputChange} />)}
          <button formMethod='dialog'>{location.pathname === '/account' ? 'Create Shop' : 'Update Shop'}</button>
        </form>
      </div>
    </div>
  )
}