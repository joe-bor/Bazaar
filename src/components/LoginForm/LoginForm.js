import { useState } from "react"
import FormInput from "../FormInput/FormInput"
import styles from './LoginForm.module.scss'
import { login } from '../../utilities/users-service'

export default function LoginForm({ setUser, handleCloseAuthModal}) {

    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState('')

    const inputs = [
        {
            id: "login-name",
            name: "email",
            type: "email",
            label: "Email",
            placeholder: 'email@example.com',
            errorMessage: "Must be a valid email address",
            required: true
        },
        {
            id: "login-pw",
            name: "password",
            type: "password",
            label: "Password",
            placeholder: '********',
            errorMessage: "Must be at least 3 characters long",
            pattern: '^[A-Za-z0-9]{3,}$',
            required: true
        }
    ]

    const handleInputChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const loggedInUser = await login(values)
        setUser(loggedInUser)
        handleCloseAuthModal()
    }

    return (
        <>
            <h1 className={styles.h1}>Login</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                {inputs.map(input => <FormInput
                    key={input.id}
                    value={values[input.name]}
                    handleInputChange={handleInputChange}
                    {...input}
                />)}
                <button formMethod='dialog'>Log In</button>
            </form>

        </>
    )
}
