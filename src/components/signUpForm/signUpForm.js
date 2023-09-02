import { useRef, useState } from 'react'
import styles from './SignUpForm.module.scss'

function SignUpForm() {

  const dialogRef = useRef()
  const [isModalOpen, setIsModalOpen] = useState(true)

  /* --- Will most likely be prop */
  const [user, setUser] = useState({
    name: "",
    nameError:"Name field can't contain special characters",
    email: "",
    emailError:"Must be a valid email address",
    password:"",
    passwordError: "Must be at least 3 characters long",
    confirm:"",
    confirmError: "Passwords don't match"
  })
  
  const toggleModal = () => {
    if (isModalOpen){
      dialogRef.current.close()
      setIsModalOpen(false)
    } else {
      dialogRef.current.showModal()
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <button onClick={toggleModal}>useRef</button>
      <dialog className={styles.dialog} ref={dialogRef} open={isModalOpen} onClose={toggleModal}>
        {console.log(dialogRef.current)}
        <h1 className={styles.h1}>Register</h1>
        <form className={styles.form}>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" placeholder='First Name and Last Name' autoFocus autoCapitalize="word" autoComplete="list" required pattern='^[A-Za-z0-9]$'></input>
          <p className={styles.error}>{user.nameError}</p>

          <label htmlFor="email" >Email:</label>
          <input type="email" name="email" id="email" autoComplete='list' autoCapitalize="none" placeholder='example@email.com' required></input>
          <p className={styles.error}>{user.emailError}</p>

          <label htmlFor="password" >Password:</label>
          <input type="password" name="password" id="password" placeholder='Must be at least 3 characters' minLength={3} required></input>
          <p className={styles.error}>{user.passwordError}</p>

          <label htmlFor="confirm">Confirm:</label>
          <input type="password" name="confirm" id="confirm" placeholder='Re-type password' minLength={3} pattern={user.password} required></input>
          <p className={styles.error}>{user.confirmError}</p>

          <button formMethod='dialog'>Sign Up</button>
          <p>Already a member? <span>Login</span></p>

        </form>
      </dialog>
    </>
  )
}
export default SignUpForm

/**
 * add error messages that describes the requirements for each input field
 *  - should by rendered dynamically base on value of controlled inputs
 * 
 * right now modal only closes with ESC key or by submitting form,
 * add a way to close dialog by clicking outside
 * 
 * clicking login at the bottom -> render the loginForm component
 * 
 * 
 * STYLING:
 * change focus color
 * change modal background
 */