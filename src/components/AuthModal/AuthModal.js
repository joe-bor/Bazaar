import { useRef, useState } from "react"
import SignUpForm from "../signUpForm/signUpForm"
import styles from './AuthModal.module.scss'
import LoginForm from "../LoginForm/loginForm"

export default function AuthModal() {

    /* --- State --- */
    const modalRef = useRef()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showSignUp, setShowSignUp] = useState(true)

    /* --- Functions --- */
    const toggleModal = () => {
        if (isModalOpen){
          modalRef.current.close()
          setIsModalOpen(false)
        } else {
          modalRef.current.showModal()
          setIsModalOpen(true)
        }
        console.log('Invoked toggleModal()')
      }

    const toggleSignIn = () => {
      setShowSignUp(!showSignUp)
    }

  return (
    <>
        <button onClick={toggleModal}> {isModalOpen ? 'Close Modal' : 'Open Modal'} </button> //! DELETE when toggleModal has been anchored to the right element
        <dialog className={styles.dialog} ref={modalRef}  onClose={toggleModal}>
            {showSignUp ? 
            <>
              <SignUpForm />
              <p>Already a member? <strong onClick={toggleSignIn}>Login</strong></p>
            </>  :
            <>
               <LoginForm />
              <p>Don't have an account? <strong onClick={toggleSignIn}>Sign Up</strong></p> 
            </>
            }
            
        </dialog>
    </>
  )
}

//ADD: close dialog w/ button || click outside