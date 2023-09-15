import { useState } from 'react'
import styles from './SignUpForm.module.scss'
import FormInput from '../FormInput/FormInput'
import { userPost } from '../../utilities/image-upload'

function SignUpForm({ setUser, handleCloseAuthModal }) {

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    file: ''
  })
  const [file, setFile] = useState(null)
  const [photoUrl, setPhotoUrl] = useState('')


  const inputs = [
    {
      id: "name",
      name: "name",
      type: "text",
      placeholder: "First and Last name",
      errorMessage:
        "Required and can't include special characters",
      label: "Name",
      pattern: "^[A-Za-z0-9 ]+$",
      required: true,
    },
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Email@example.com",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be at least 3 characters long",
      label: "Password",
      pattern: "^[A-Za-z0-9]{3,}$",
      required: true,
    },
    {
      id: "confirm",
      name: "confirm",
      type: "password",
      placeholder: "Re-type your password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
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
    label: "Profile Image"
  }

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', file)
    for (let key in values) {
      if (key !== 'confirm') {
        formData.append(key, values[key])
      }
    }
    const newUser = await userPost(formData)
    localStorage.removeItem('token')
    // replace with data.data
    localStorage.setItem('token', newUser.data)
    // extract user from token
    const createdUser = JSON.parse(atob(newUser.data.split('.')[1])).user
    setUser(createdUser)
    handleCloseAuthModal()
  }

  return (
    <>
      <h1 className={styles.h1}>Register</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <FormInput {...imageInputProps} handleInputChange={handleImageChange} />
        {inputs.map(input => <FormInput key={input.id} {...input} value={values[input.name]} handleInputChange={handleInputChange} />)}
        <button formMethod='dialog'>Sign Up</button>
      </form>

    </>
  )
}
export default SignUpForm