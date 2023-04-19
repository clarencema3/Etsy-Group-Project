import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePhoto } from '../../store/products';
import { useModal } from '../../context/Modal';
import { useHistory } from 'react-router-dom';


const EditImage = ({ product }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const history = useHistory()
    const [photo, setPhoto] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //included for aws, taking formData because we are sending a file to the backend
        const formData = new FormData()
        formData.append("preview_img", photo);
       
        const data = await dispatch(updatePhoto(product.id,formData))
        if (data) {
            setErrors(data)
        } else {
            closeModal()
            history.push(`/products/${product.id}`)
        }
    }
    //encType on form element for aws
    return (
        <div className='edit-photo-div'>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-section">
                    <h1>Update product image</h1>
                    <input className='form-input' type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} required/>
                </div>
                <div className="sign-button-div">
                    <button className="sign-form-button" type="submit">Edit photo</button>
                </div>
            </form>
        </div>
    )
}

export default EditImage