import React, { useState } from 'react'

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

    const submitPost = () =>{
        if (!finalImage || !caption){
            alert('Write some caption please...')
            return
        }

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
                <img src={image} alt="new-post-image" />
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
            style={{width:'400px'}}
            >
                <textarea 
                class="form-control"
                rows="3"
                placeholder='Write a caption...'
                onChange={(e)=>setCaption(e.target.value)}
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