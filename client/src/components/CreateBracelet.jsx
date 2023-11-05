import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBracelet = ({allBracelets, setAllBracelets}) => {
    const [braceletName, setBraceletName] = useState("");
    const [description, setDescription] = useState("");
    const [era, setEra] = useState("Red");
    const [formData, setFormData] = useState()
    const navigate = useNavigate();
    const [file, setFile] = useState()
    const [preview, setPreview] = useState();

    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [eraError, setEraError] = useState('')
    const [fileError, setFileError] = useState('')
    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const imageUrl = URL.createObjectURL(selectedFile);
            setPreview(imageUrl);
        }
    }


    const testHandler = (event) => {
        event.preventDefault()

        let isFormValid = true;

        //VALIDATION LOGIC
        if(braceletName.length < 5){
            setNameError("Name must be at least 5 characters!")
            isFormValid = false;
        } else {
            setNameError('');
        }
        if(description.length < 5){
            setDescriptionError("Description must be at least 5 characters!")
            isFormValid = false;
        } else {
            setDescriptionError('');
        }
        if(!era){
            setEraError("Era is required!")
            isFormValid = false;
        } else {
            setEraError('');
        }
        if(!file){
            setFileError("Image is required!")
            isFormValid = false;
        } else {
            setFileError('');
        }

        if(isFormValid){
            const formData = new FormData()
            //file append
            formData.append('file', file)
            //Form Input - create form bracelet inputs
            formData.append('name', braceletName)
            formData.append('description', description)
            formData.append('era', era)
            console.log(era)
    
            console.log(formData)
            axios.post('http://127.0.0.1:8000/api/bracelets/', formData)
                .then(
                        res => {
                            setAllBracelets([...allBracelets, res.data])
                            navigate("/dashboard");
                        }
                    )
                .catch(err => console.log(err))
        }
    }
    
    return (
        <div>
            <div className="form-body">
                <div className="row">
                    <div className="form-holder">
                        <div className="form-content">
                            <div className="form-items">
                                {/* {preview && (
                                    <div className="preview-container">
                                        <img src={preview} alt="" className='preview-image' />
                                    </div>
                                )} */}
                                <h3>Create A Bracelet!</h3>
                                <form className="was-validation requires-validation" encType="multipart/form-data" onSubmit={testHandler} >
                                    {/* NAME INPUT */}
                                    <div className="col-md-12">
                                        <input type="text" name='' className="form-control" placeholder='Name'
                                        value={braceletName}
                                        onChange={event => setBraceletName(event.target.value)}
                                        required />
                                        <div className="valid-feedback">Name is valid!</div>
                                        <div className="invalid-feedbacks">{nameError}</div>
                                    </div>
                                    {/* DESCRIPTION INPUT */}
                                    <div className="col-md-12">
                                        <textarea name="description" id="description" cols="30" rows="5"
                                        className="form-control file-control" placeholder='Description'
                                        value={description}
                                        onChange={event => setDescription(event.target.value)}
                                        ></textarea>
                                        <div className="valid-feedback">Description is valid!</div>
                                        <div className="invalid-feedbacks">{descriptionError}</div>
                                    </div>
                                    {/* ERA INPUT */}
                                    <div className="col-md-12">
                                        <select name="" id="" className="form-select mt-3"
                                        value={era}
                                        onChange={event => setEra(event.target.value)}>
                                            <option selected disabled>Era</option>
                                            <option>Red</option>
                                            <option>1989</option>
                                            <option>Reputation</option>
                                            <option>Speak Now</option>
                                            <option>Folklore</option>
                                            <option>Lover</option>
                                            <option>Evermore</option>
                                            <option>Debut</option>
                                            <option>Midnight</option>
                                        </select>
                                            <div className="valid-feedback">Era is valid!</div>
                                            <div className="invalid-feedbacks">{eraError}</div>
                                    </div>
                                    {/* FILE INPUT */}
                                    <div className="col-md-12">
                                        <input type="file" className="form-control file-control" onChange={handleImageChange} />
                                            <div className="valid-feedback">File is valid!</div>
                                            <div className="invalid-feedbacks">{fileError}</div>
                                    </div>
                                    <div className="form-content preview-container">
                                        {preview && (
                                            <img
                                                src={preview}
                                                alt=""
                                                className="preview-image"
                                            />
                                        )}
                                    </div>
                                    <div className="form-button mt-3">
                                        <button className="btn btn-primary">Submit!</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateBracelet;