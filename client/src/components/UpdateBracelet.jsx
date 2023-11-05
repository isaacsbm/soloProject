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
    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        console.log("Selected File: ", selectedFile);
        setNewImageFile(selectedFile);
    }

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
                        // navigate("/dashboard");
                    }
                )
            .catch(err => console.log(err))
    }
    return (
        <div>
            {imageURL && (
                <img src={imageURL} alt="image not found" />
            )}
            <h1 className='site-header'>Update a Bracelet!</h1>
            
            <form encType="multipart/form-data" onSubmit={testHandler}>
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
            </form>
        </div>
    )
}

export default UpdateBracelet;