import { useState } from 'react'
import { createShop, editShopInfo } from '../../utilities/shops-api'
import styles from './CreateShop.module.scss'
import FormInput from '../FormInput/FormInput'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../../utilities/users-service'

export default function CreateShop({ user, setUser, location, userShop, setUserShop }) {
  const [shopValues, setShopValues] = useState({
    name: '',
    description: '',
    // logoImage: null
  })

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

  const handleShopInputChange = (e) => {
    setShopValues({ ...shopValues, [e.target.name]: e.target.value })
  }

  // 🟥 function for handling image upload 🟥

  async function handleShopSubmit(e) {
    e.preventDefault()
    const formData = { ...shopValues }
    if (location.pathname === '/shopmgmt') {
      // send request to update shop
      const updatedShop = await editShopInfo(userShop._id, formData)
      setUserShop(updatedShop)

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
      // navigate('/shopmgmt')
    }
  }

  return (
    <div className={styles.CreateShop}>
      <div className="form-container">
        <h1 className={styles.h1}>{location.pathname === '/account' ? 'Create A Shop' : 'Edit Shop Details'}</h1>
        <form autoComplete="off" onSubmit={handleShopSubmit}>
          {/* <FormInput {...logoInputProps} handleInputChange={handleImageChange} /> */}
          {shopInputs.map(input => <FormInput key={input.id} {...input} value={shopValues[input.name]} handleInputChange={handleShopInputChange} />)}
          <button formMethod='dialog'>{location.pathname === '/account' ? 'Create Shop' : 'Update Shop'}</button>
        </form>
      </div>
    </div>
  )
}