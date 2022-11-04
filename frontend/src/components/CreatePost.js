import React, { useState } from 'react'
import axios from 'axios'
import axios2 from "./axios/axios.js";

const CreatePost = () => {
    const [image, setImage] = useState()
    const [caption, setCaption] = useState()
    const [finalImage, setFinalImage] = useState()
    const imageUpload = (data) => {
        if (data) {
            console.log(data)
            setImage(URL.createObjectURL(data));
            console.log(URL.createObjectURL(data))
            setFinalImage(data)
        }
    }

    const submitPost = () => {
        console.log(caption)
        if (!finalImage || !caption) {
            alert('Write some caption please...')
            return
        }
        
        //two step upload
        //1. upload image to cloudinary, get image url in response
        //2. upload image to server

        var data = new FormData();
        data.append("file", finalImage);
        data.append("upload_preset", 'iSocialMedia');
        data.append("cloud_name", 'digf8dtoq');

        axios
            .post('https://api.cloudinary.com/v1_1/digf8dtoq/image/upload', data)
            .then(res =>{
                console.log(res.data.url)
                
                axios2
                    .post('/api/post/createpost', 
                    {caption, image:res.data.url},
                    {
                        headers: {
                            'authorization': 'Bearer '+localStorage.getItem("token")
                        } 
                    }
                    )
                    .then(response => {
                        console.log(response.data.post)
                        setImage(null)
                        setCaption(null)
                    })
                    .catch(err=>{
                        console.log(err)
                    })

            })
            .catch(err =>{
                console.log(err)
            })

    }

    return (
        <div className="card"
            style={{
                margin: '30px auto',
                minWidth: '500px',
                padding: '20px',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <p style={{ fontWeight: 600, fontSize: 18 }}>Create new post</p>
            {image && <div
                className='mb-3'
                style={{
                    maxHeight: '400px',
                    width: '400px',
                    border: '1px solid black'
                }}
            >
                <img width="400px" height="360px" src={image} alt="new post" />
            </div>}
            {!image ? <div className="d-grid gap-2 w-50">
                <input
                    type="file"
                    id="upload-btn"
                    onChange={(e) => imageUpload(e.target.files[0])}
                    hidden />

                <label
                    className="btn btn-primary"
                    htmlFor="upload-btn"

                >Upload image</label>{' '}
            </div> : <div><div
                className='m-2'
                style={{ width: '400px' }}
            >
                <textarea
                    class="form-control"
                    rows="3"
                    placeholder='Write a caption...'
                    onChange={(e) => setCaption(e.target.value)}
                ></textarea>
            </div>

                <div onClick={submitPost} className='btn btn-primary'>
                    Share your post
                </div>

            </div>
            }



        </div>
    )
}

export default CreatePost