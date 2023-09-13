import { useState } from "react"
import styles from "./FormInput.module.scss"

export default function FormInput(props) {
    
  const [isBlur, setIsBlur] = useState(false)
  const { label, errorMessage, handleInputChange, id, type, ...inputProps } = props

  const handleInputBlur = (e) => {
    setIsBlur(true)
  }

  return (
    <div className={styles.formInput}>
    <label htmlFor={id}>{label}</label>
    <input
        id={id}
        type={type}
        {...inputProps}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        blurred={isBlur.toString()}
        onFocus={() => inputProps.name === 'confirm' && setIsBlur(true)}
    />
    <p className={styles.error}>{errorMessage}</p>
    </div>
  )
}