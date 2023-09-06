import { useEffect, useRef, useState } from "react"
import SignUpForm from "../signUpForm/signUpForm"
import styles from './AuthModal.module.scss'
import LoginForm from "../LoginForm/LoginForm"

export default function AuthModal() {

    /* --- State --- */
    const modalRef = useRef()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showSignUp, setShowSignUp] = useState(true)

    /* --- Functions --- */
    const toggleModal = () => {
        // if (isModalOpen){
        //   modalRef.current.close()
        //   setIsModalOpen(false)
        // } else {
        //   modalRef.current.showModal()
        //   setIsModalOpen(true)
        // }
        
        setIsModalOpen(!isModalOpen)
        console.log('Invoked toggleModal()')
        console.log(isModalOpen)
      }

      const handleCloseModal = () => {
        setIsModalOpen(false)
        console.log('handleCloseModal invoked')
      }
      
      const toggleModalContents = () => {
        setShowSignUp(!showSignUp)
      }
      
      useEffect( () => {
        isModalOpen ? modalRef.current.showModal() : modalRef.current.close()
        console.log(isModalOpen)
    }, [isModalOpen])

  return (
    <>
        <button onClick={toggleModal}> {isModalOpen ? 'Close Modal' : 'Open Modal'} </button> //! DELETE when toggleModal has been anchored to the right element
        <dialog className={styles.dialog} ref={modalRef}  onClose={handleCloseModal}>
            <button onClick={handleCloseModal}>X</button>
            {showSignUp ? 
            <>
              <SignUpForm />
              <p>Already a member? <strong onClick={toggleModalContents}>Login</strong></p>
            </>  :
            <>
               <LoginForm />
              <p>Don't have an account? <strong onClick={toggleModalContents}>Sign Up</strong></p> 
            </>
            }
            
        </dialog>
    </>
  )
}

//ADD: close dialog w/ button || click outside