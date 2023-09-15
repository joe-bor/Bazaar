import { useEffect, useRef, useState } from 'react'
import styles from './EditProductForm.module.scss'
import FormInput from '../FormInput/FormInput'
import { itemPut } from '../../utilities/image-upload'
import { getById } from '../../utilities/items-api'
import { getShop } from '../../utilities/shops-api'

function EditProductForm({ userShop, setUserShop, user, setUser, categories }) {
    const [product, setProduct] = useState(null)
    const [shop, setShop] = useState(null)
    const [products, setProducts] = useState([])
    const [id, setId] = useState('')
    const [values, setValues] = useState({})
    const [file, setFile] = useState(null)
    const [photoUrl, setPhotoUrl] = useState('')

    useEffect(() => {
        async function fetch() {
            if (shop === null) {
                const search = await getShop(user.shop)
                console.log(search)
                setShop(search)
            }
        }
        // fetch()
    }, [])
    useEffect(() => {
        if (shop) {
            setProducts([...shop.products])
            setValues({
                product: '',
            })
        }
    }, [shop])
    useEffect(() => {
        if (product) {
            setValues({
                product: '',
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                file: product.file,
            })
            setId(product._id)
        }
    }, [product])


    const imageInputProps = {
        id: "edit-photo",
        name: "file",
        type: "file",
        accept: ".png, .jpg, .jpeg",
        errorMessage:
            "File type must be .png, .jpeg, or .jpg",
        label: "Product Image"
    }

    const handleInputChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleImageChange = (e) => {
        e.preventDefault()
        console.log(e.target.files)
        let reader = new FileReader()
        let file = e.target.files[0]
        reader.onloadend = () => {
            setFile(file)
        }
        reader.readAsDataURL(file)
    }

    const handleFirstSubmit = async (e) => {
        e.preventDefault()
        console.log(values)
        setProduct(values.product)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // once you have the file from the user's comupter, call set file and then save that to the state variable
        // then send the file from state to the upload route - need separate function to handle upload function (need utility)
        // then use a .then to send the request to update user
        const formData = new FormData()
        formData.append('file', file)
        for (let key in values) {
            formData.append(key, values[key])
        }
        const data = await itemPut(id, formData)
        setPhotoUrl(data.secure_url)
        console.log(data)
    }
    if (product === null) {
        return (
            <>
                <h1 className={styles.h1}>Select Product to Edit</h1>
                <form className={styles.form} onSubmit={handleFirstSubmit} >
                    <select id='products' name='product' value={values.product} onChange={handleInputChange}>
                        <option key="" value="">--Please choose an option--</option>
                        {products.map((productItem) => {
                            console.log(productItem)
                            return <option key={productItem} value={productItem}>{productItem.name}</option>
                        })}
                    </select>
                    <button formMethod='dialog'>Select Item</button>
                </form>

            </>
        )
    } else {
        console.log('product = ' + product)
        const inputs = [
            {
                id: "edit-name",
                name: "name",
                type: "text",
                placeholder: product.name,
                value: product.name,
                errorMessage:
                    "Product name is required and can't include special characters",
                label: "Name",
                pattern: "^[A-Za-z0-9]+$",
                required: true,
            },
            {
                id: "edit-description",
                name: "description",
                type: "text",
                placeholder: product.description,
                value: product.description,
                errorMessage: "Product description is required",
                label: "Description",
                required: true,
            },
            {
                id: "edit-price",
                name: "price",
                type: "number",
                placeholder: product.price,
                value: product.price,
                errorMessage:
                    "",
                label: "price",
                required: true
            }
        ]
        return (
            <>
                <h1 className={styles.h1}>Edit Product Info</h1>
                <form className={styles.form} onSubmit={handleSubmit} >
                    <FormInput {...imageInputProps} handleInputChange={handleImageChange} />
                    {inputs.map(input => <FormInput key={input.id} {...input} value={values[input.name]} handleInputChange={handleInputChange} />)}
                    <select id='product-category' name='category' value={values.category} onChange={handleInputChange}>
                        {categories.slice(1).map((category) => {
                            return <option key={category} value={category}>{category}</option>
                        })}
                    </select>
                    <button formMethod='dialog'>Update</button>
                </form>

            </>
        )
    }
}
export default EditProductForm

