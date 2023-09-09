import { useEffect, useRef, useState } from 'react'
import styles from './EditUserForm.module.scss'
import FormInput from '../FormInput/FormInput'
import { updateUser } from '../../utilities/users-service'

function EditUserForm({ user, setUser }) {

  const [values, setValues] = useState({
    name: user.name,
    email: user.email,
    password: "",
    confirm: "",
  })

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
      pattern: "^[A-Za-z0-9]+$",
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

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = { ...values }
    delete formData.confirm
    const updatedUser = await updateUser(user._id, formData)
    setUser(updatedUser)
  }

  return (
    <>
      <h1 className={styles.h1}>Edit User Info</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {inputs.map(input => <FormInput key={input.id} {...input} value={values[input.name]} handleInputChange={handleInputChange} />)}
        <button formMethod='dialog'>Update</button>
      </form>

    </>
  )
}
export default EditUserForm