import { useEffect, useRef, useState } from 'react'
import styles from './SignUpForm.module.scss'
import FormInput from '../FormInput/FormInput'

function SignUpForm() {

  const dialogRef = useRef()
  const [isModalOpen, setIsModalOpen] = useState(false)

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
  
  /* ----- Functions ----- */


  //! when the modal is on, i cant trigger my document event listeners
  // useEffect(() => {
  //   const handleClickOutsideModal = (e) => {
  //     console.log(e.target)
  //     if (isModalOpen && e.currentTarget === dialogRef.current){
  //       toggleModal()
  //     } 
  //   }

  //   document.addEventListener('click', handleClickOutsideModal)

  //   return () => document.removeEventListener('click', handleClickOutsideModal)
  // }, [isModalOpen])

  const toggleModal = () => {
    if (isModalOpen){
      dialogRef.current.close()
      setIsModalOpen(false)
    } else {
      dialogRef.current.showModal()
      setIsModalOpen(true)
    }
    console.log('Invoked toggleModal()')
  }

  const handleInputChange = (e) => {
    setValues({...values, [e.target.name]:e.target.value  })
  }

  return (
    <>
      <button onClick={toggleModal}> {isModalOpen ? 'Close Modal' : 'Open Modal'} </button> //! DELETE when toggleModal has been anchored to the right element
      <dialog className={styles.dialog} ref={dialogRef}  onClose={toggleModal}>
        <h1 className={styles.h1}>Register</h1>
        <form className={styles.form}>
          
          {inputs.map( input => <FormInput key={input.id} {...input} value={values[input.name]} handleInputChange={handleInputChange} />)}

          <button formMethod='dialog'>Sign Up</button>
          <p>Already a member? <span>Login</span></p>

        </form>
      </dialog>
    </>
  )
}
export default SignUpForm

/*
 * add a way to close dialog by clicking outside / close button inside

 * clicking login at the bottom -> render the loginForm component

 */