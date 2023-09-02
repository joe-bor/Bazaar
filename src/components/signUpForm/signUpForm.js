import { useRef, useState } from 'react'
import styles from './SignUpForm.module.scss'

function SignUpForm() {

  const dialogRef = useRef()
  const [isModalOpen, setIsModalOpen] = useState(true)
  
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
          <input type="text" name="name" id="name" placeholder='First Name and Last Name' autoFocus autoCapitalize="word" aria-autocomplete="list" aria-required></input>
          <br/>

          <label htmlFor="email" >Email:</label>
          <input type="email" name="email" id="email" autoComplete="list" autoCapitalize="none" placeholder='example@email.com' aria-required></input>
          <br/>

          <label htmlFor="password" >Password:</label>
          <input type="password" name="password" id="password" placeholder='Must be at least 3 characters' minLength={3} aria-required></input>
          <br/>
          <label htmlFor="confirm">Confirm:</label>
          <input type="password" name="confirm" id="confirm" placeholder='Re-type password' minLength={3} required></input>
          <br/>
          <button formMethod='dialog'>Sign Up</button>
          <p>Already a member? <span>Login</span></p>
        </form>
      </dialog>
    </>
  )
}
export default SignUpForm