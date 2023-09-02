import { useState } from "react"
import FormInput from "../FormInput/FormInput"
import styles from './LoginForm.module.scss'

function LoginForm() {

    const [values, setValues] = useState({
        email:"",
        password:""
    })

    const inputs = [
        {
            id:1,
            name:"email",
            type:"email",
            label:"Email",
            placeholder:'email@example.com',
            errorMessage:"Must be a valid email address",
            required: true
        },
        {
            id:2,
            name:"password",
            type:"password",
            label:"Password",
            placeholder:'********',
            errorMessage:"Must be at least 3 characters long",
            pattern: '^[A-Za-z0-9]{3,}$',
            required: true
        }
    ]

    const handleInputChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

  return (
    <>
        <h1 className={styles.h1}>Login</h1>
        <form className={styles.form}>
            {inputs.map(input => <FormInput
            key={input.id}
            value={values[input.name]}
            handleInputChange={handleInputChange}
            {...input}
            />)}
            <button>Log In</button>
        </form>
    
    </>
  )
}
export default LoginForm