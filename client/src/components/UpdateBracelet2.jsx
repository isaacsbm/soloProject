import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios, { all } from 'axios';

const UpdateBracelet2 = ({ allBracelets, setAllBracelets }) => {
    // BRACELET STATE
    const [braceletName, setBraceletName] = useState('');
    const [braceletDescription, setBraceletDescription] = useState('');
    const [braceletEra, setBraceletEra] = useState('');
    const [file, setFile] = useState(''); //this is the new file
    // FILE PREVIEW ON SELECT
    const [preview, setPreview] = useState(null); //this is the current file

    // ERROR STATE
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [eraError, setEraError] = useState('');
    const [fileError, setFileError] = useState('');

    // NAVIGATE and PARAMS
    const navigate = useNavigate();
    const { id } = useParams();

     // Image Preview and Holds the image in state
    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        console.log(selectedFile) // Why is this returning nothing? 
        console.log('HandleImageCHANGE FILE: ', selectedFile)  // Why is this returning nothing? 
        if (selectedFile) {
            setFile(selectedFile);
            const imageUrl = URL.createObjectURL(selectedFile);
            setPreview(imageUrl);
        }
    };


    // GET REQUEST
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/bracelets/${id}`)
            .then((res) => {
                setBraceletName(res.data.name);
                setBraceletDescription(res.data.description);
                setBraceletEra(res.data.era);
                setPreview(`http://localhost:8000/${res.data.image}`)
                console.log(res.data.image)
            })
            .catch((err) => console.log(err));
    }, [id]);

    // FORM HANDLER
    const formHandler = (event) => {
        event.preventDefault();

        // VALIDATIONS
        let isFormValid = true;

        if (braceletName.length < 5) {
            setNameError('Name must be at least 5 characters!');
            isFormValid = false;
        } else {
            setNameError('');
        }
        if (braceletDescription.length < 5) {
            setDescriptionError('Description must be at least 5 characters!');
            isFormValid = false;
        } else {
            setDescriptionError('');
        }
        if (!braceletEra) {
            setEraError('Era is required!');
            isFormValid = false;
        } else {
            setEraError('');
        }
        // if (!file) {
        //     setFileError('Image is required!');
        //     isFormValid = false;
        // } else {
        //     setFileError('');
        // }

        // FORM POST REQUEST
        if (isFormValid) {
            const updatedFormData = new FormData();
            if (file) {
                updatedFormData.append('image', file);
            }
            updatedFormData.append('name', braceletName);
            console.log(braceletName)
            updatedFormData.append('description', braceletDescription);
            updatedFormData.append('era', braceletEra);
            
            console.log('Updated Form: ', updatedFormData); // Check updated form after the call

            axios
                .patch(`http://127.0.0.1:8000/api/bracelets/${id}`, updatedFormData)
                .then((res) => {
                    console.log('Bracelet updated:', res.data);
                    setAllBracelets(allBracelets => allBracelets.map (bracelet => {
                        if(bracelet._id == res.data._id){
                            return res.data;
                        }
                        return bracelet;
                    }))
                    navigate('/dashboard');
                })
                .catch((error) => {
                    console.log('Error updating bracelet:', error);
                });
        }
    };

    return (
        <div>
            <h1>UpdateBraceletTake2</h1>
            <div className="form-body">
                <div className="row">
                    <div className="form-holder">
                        <div className="form-items">
                            <h3>Update a Bracelet!</h3>
                            <form onSubmit={formHandler} className="was-validation requires-validation" encType="multipart/form-data">
                                {/* NAME INPUT */}
                                <div className="col-md-12">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="form-control"
                                        value={braceletName}
                                        placeholder="Name"
                                        onChange={(event) => setBraceletName(event.target.value)}
                                    />
                                    {nameError && <span className="error-message">{nameError}</span>}
                                </div>
                                {/* DESCRIPTION INPUT */}
                                <div className="col-md-12">
                                    <textarea
                                        name="description"
                                        id="description"
                                        cols="30"
                                        rows="10"
                                        className="form-control file-control"
                                        placeholder="Description"
                                        value={braceletDescription}
                                        onChange={(event) => setBraceletDescription(event.target.value)}
                                    ></textarea>
                                    {descriptionError && <span className="error-message">{descriptionError}</span>}
                                </div>
                                {/* ERA INPUT */}
                                <div className="col-md-12">
                                    <select
                                        name="era"
                                        id="era"
                                        className="form-select mt-3"
                                        value={braceletEra}
                                        onChange={(event) => setBraceletEra(event.target.value)}
                                    >
                                        <option defaultValue disabled>
                                            Era
                                        </option>
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
                                    {eraError && <span className="error-message">{eraError}</span>}
                                </div>
                               {/* FILE INPUT */}
                                    <div className="col-md-12">
                                        <input type="file" className="form-control file-control" onChange={handleImageChange} />
                                        {/* {fileError && <span className="error-message">{fileError}</span>} */}
                                    </div>
                                <div className="form-button mt-3">
                                    <button className="btn btn-primary">Submit!</button>
                                </div>
                            </form>
                            {preview && <img src={preview} alt="Preview" className="preview-image" />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateBracelet2;
