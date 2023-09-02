import { useEffect, useRef, useState } from 'react'
import styles from './SignUpForm.module.scss'
import FormInput from '../FormInput/FormInput'

function SignUpForm() {

  const [values, setValues] = useState({
    name: "",
    email: "",
    password:"",
    confirm:"",
  })

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "First and Last name",
      errorMessage:
        "Required and can't include special characters",
      label: "Name",
      pattern: "^[A-Za-z0-9]+$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email@example.com",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 4,
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
      id: 5,
      name: "confirm",
      type: "password",
      placeholder: "Re-type your password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },

  ]

  const handleInputChange = (e) => {
    setValues({...values, [e.target.name]:e.target.value  })
  }

  return (
    <>
        <h1 className={styles.h1}>Register</h1>
        <form className={styles.form}>
          {inputs.map( input => <FormInput key={input.id} {...input} value={values[input.name]} handleInputChange={handleInputChange} />)}
          <button formMethod='dialog'>Sign Up</button>
        </form>

    </>
  )
}
export default SignUpForm