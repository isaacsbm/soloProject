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
    // const newBraceletHandler = (event) => {
    //     event.preventDefault();
    //     // const newBracelet = {
    //     //     name: braceletName,
    //     //     description: description,
    //     //     era: era
    //     //     // image: formData.append('image', event.target.image.files[0]) - gives error on forming data before actualization
    //     // };
    //     const data = new FormData()
        
    //     data.append('name', braceletName)
    //     data.append('description', description)
    //     data.append('era', era)
    //     data.append('image', event.target.image.files[0])

    //     setFormData(data)
    //     axios.post("http://127.0.0.1:8000/api/bracelets/", formData)
    //     .then(
    //         res => {
    //             setBraceletName([...allBracelets, res.data])
    //             navigate("/dashboard");
    //         }
    //     )
    //     .catch( err => {
    //         if (err.response) {

    //             // Request was made, server responded with status != 2xx
                
    //             console.log(err.response.data)
    //             console.log(err.response.status)
    //             console.log(err.response.headers)
                
    //     }
    //     })
    // }
    const handleImageChange = (event) => {
        setFile(event.target.files[0])
        // console.log(event.target.files)
        // const fileType = file.type
        // console.log(fileType)
      }
    const testHandler = (event) => {
        event.preventDefault()
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
    return (
        <div>
            <h1 className='site-header'>Create A Bracelet!</h1>
            
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
                        <input type="file" id='file' name='file'  onChange={handleImageChange} />
                    </label>
                </div>
                <button>Submit!</button>
            </form>
        </div>
    )
}

export default CreateBracelet;