import { useState } from 'react'
import styles from './CreateShop.module.scss'
import FormInput from '../FormInput/FormInput'
import { useNavigate } from 'react-router-dom'
import { shopPost, shopPut } from '../../utilities/image-upload'

export default function CreateShop({ user, setUser, location, userShop, setUserShop, toggleEditShop }) {
  const [shopValues, setShopValues] = useState({
    name: '',
    description: ''
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

  const handleShopInputChange = (e) => {
    setShopValues({ ...shopValues, [e.target.name]: e.target.value })
  }

  async function handleShopSubmit(e) {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('file', file)
      for (let key in shopValues) {
        formData.append(key, shopValues[key])
      }
      formData.append('token', localStorage.getItem('token'))
      // edit the shop in shop management
      if (location.pathname === '/shopmgmt') {
        const updatedShop = await shopPut(userShop._id, formData)
        setUserShop(updatedShop)
        toggleEditShop()
        // create shop in account page
      } else {
        // send request to create shop
        const { currentUser, newShop } = await shopPost(formData)
        // set user state to have shop info
        setUser(currentUser)
        setUserShop(newShop)
        navigate(`/shopmgmt/${newShop._id}`)
      }
    } catch (error) {
      console.error(error)
    } finally {

    }
  }

  const handleImageChange = (e) => {
    e.preventDefault()
    let reader = new FileReader()
    let file = e.target.files[0]
    reader.onloadend = () => {
      setFile(file)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className={styles.CreateShop}>
      <div>
        <h1 className={styles.h1}>{location.pathname === '/account' ? 'Create A Shop' : 'Edit Shop Details'}</h1>

        <form className={styles.form} autoComplete="off" onSubmit={handleShopSubmit}>
          <FormInput {...logoInputProps} handleInputChange={handleImageChange} />

          {shopInputs.map(input => <FormInput key={input.id} {...input} value={shopValues[input.name]} handleInputChange={handleShopInputChange} />)}
          <button formMethod='dialog'>{location.pathname === '/account' ? 'Create Shop' : 'Update Shop'}</button>
        </form>
      </div>
    </div>
  )
}