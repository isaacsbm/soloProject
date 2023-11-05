import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBracelet = ({allBracelets, setAllBracelets}) => {
    const [braceletName, setBraceletName] = useState("");
    const [description, setDescription] = useState("");
    const [era, setEra] = useState("Red");
    const [imageURL, setImageURL] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const [newImageFile, setNewImageFile] = useState(null);
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
    };
    

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/bracelets/" + id)
            .then(res => {
                setBraceletName(res.data.name)
                setDescription(res.data.description)
                setEra(res.data.era)
                setImageURL(`http://localhost:8000/${res.data.image}`)
            }) 
            .catch(err => console.log(err))
    }, [])
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
            const updatedFormData = new FormData()
    
            if (newImageFile) {
                updatedFormData.append('file', newImageFile);
            }
            //Form Input - create form bracelet inputs
            updatedFormData.append('name', braceletName)
            updatedFormData.append('description', description)
            updatedFormData.append('era', era)
            console.log(updatedFormData.get('file'))
            axios.patch(`http://127.0.0.1:8000/api/bracelets/${id}`, updatedFormData)
                .then(
                        res => {
                            const updatedBracelet = allBracelets.filter(bracelet => bracelet._id !== res.data._id);
                            setAllBracelets([...updatedBracelet, res.data]);
                            navigate("/dashboard");
                        }
                    )
                .catch(err => console.log(err))}}
    return (
        <div>
            <h1 className='site-header'>Update a Bracelet!</h1>
            <div className="form-body">
                <div className="row">
                    <div className="form-holder">
                        <div className="form-content">
                            <div className="form-items">
                                <h3>Update Your Bracelet!</h3>
                                <form
                                className="was-validation requires-validation"
                                encType="multipart/form-data"
                                onSubmit={testHandler}>
                                    {/* NAME INPUT */}
                                    <div className="col-md-12">
                                        <input type="text" name='' className="form-control" placeholder='Name'
                                        value={braceletName}
                                        onChange={event => setBraceletName(event.target.value)}
                                        />
                                        <div className="valid-feedback">Name is valid!</div>
                                        <div className="invalid-feedbacks">Name cannot be blank!</div>
                                    </div>
                                    {/* DESCRIPTION INPUT */}
                                    <div className="col-md-12">
                                        <textarea name="description" id="description" cols="30" rows="5"
                                        className="form-control file-control" placeholder='Description'
                                        value={description}
                                        onChange={event => setDescription(event.target.value)}
                                        ></textarea>
                                        <div className="valid-feedback">Description is valid!</div>
                                        <div className="invalid-feedbacks">Description cannot be blank!</div>
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
                                        <div className="valid-feedback">Image is valid!</div>
                                        <div className="invalid-feedbacks">{fileError}</div>
                                    </div>
                                    {/* IMAGE PREVIEW */}
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
            {/* <form encType="multipart/form-data" onSubmit={testHandler}>
                <div>
                    <label htmlFor="name"> 
                        Name: 
                        <input type="text" id='name' value={braceletName}
                        onChange={event => setBraceletName(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="description"> 
                        Description: 
                        <textarea name="description" id="description" value={description} cols="20" rows="10"
                        onChange={event => setDescription(event.target.value)}
                        ></textarea>
                    </label>
                </div> 
                <div>
                    <label htmlFor="era"> 
                        Era: 
                        <select value={era}
                        onChange={event => setEra(event.target.value)}
                        >
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
                    </label>
                </div>
                <div>
                    <label htmlFor="file">
                        Upload your picture!
                        <input 
                        type="file" 
                        id='newImage' 
                        name='newImage'  
                        onChange={handleImageChange} />
                    </label>
                </div>
                <button>Submit!</button>
            </form> */}
        </div>
    )
}

export default UpdateBracelet;