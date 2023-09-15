import { useEffect, useRef, useState } from 'react'
import styles from './EditUserForm.module.scss'
import FormInput from '../FormInput/FormInput'
// import { updateUser } from '../../utilities/users-service'
import { userPut } from '../../utilities/image-upload'


function EditUserForm({ user, setUser }) {

  const [values, setValues] = useState({
    name: user.name,
    email: user.email,
    password: "",
    confirm: "",
  })
  const [file, setFile] = useState(null)

  const inputs = [
    {
      id: "edit-name",
      name: "name",
      type: "text",
      placeholder: "First and Last name",
      value: user.name,
      errorMessage:
        "Required and can't include special characters",
      label: "Name",
      pattern: "^[A-Za-z0-9 ]+$",
      required: true,
    },
    {
      id: "edit-email",
      name: "email",
      type: "email",
      placeholder: "Email@example.com",
      value: user.email,
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: "edit-password",
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be at least 3 characters long",
      label: "Password",
      pattern: "^[A-Za-z0-9]{3,}$",
    },
    {
      id: "edit-confirm",
      name: "confirm",
      type: "password",
      placeholder: "Re-type your password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
    },

  ]

  const imageInputProps = {
    id: "edit-photo",
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
    console.log(e.target.files)
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



    const data = await userPut(user._id, formData)
    console.log(data.data) // JWT of updated user
    // clear current token in localstorage
    localStorage.removeItem('token');
    // replace with data.data
    localStorage.setItem('token', data.data);
    // extract user from token
    const newUser = JSON.parse(atob(data.data.split('.')[1])).user
    setUser(newUser)

  }

  return (
    <>
      <h1 className={styles.h1}>Edit User Info</h1>
      <form className={styles.form} onSubmit={handleSubmit} >
        <FormInput {...imageInputProps} handleInputChange={handleImageChange} />
        {inputs.map(input => <FormInput key={input.id} {...input} value={values[input.name]} handleInputChange={handleInputChange} />)}
        <button formMethod='dialog'>Update</button>
      </form>

    </>
  )
}
export default EditUserForm

