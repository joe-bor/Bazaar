import { useRef, useState } from "react"
import SignUpForm from "../signUpForm/signUpForm"
import styles from './AuthModal.module.scss'

export default function AuthModal() {

    /* --- State --- */
    const modalRef = useRef()
    const [isModalOpen, setIsModalOpen] = useState(false)

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

  return (
    <>
        <button onClick={toggleModal}> {isModalOpen ? 'Close Modal' : 'Open Modal'} </button> //! DELETE when toggleModal has been anchored to the right element
        <dialog className={styles.dialog} ref={modalRef}  onClose={toggleModal}>
            <SignUpForm />
        </dialog>
    </>
  )
}

//ADD: close dialog w/ button || click outside