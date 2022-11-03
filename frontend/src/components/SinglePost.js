import React, { useState } from 'react'

const SinglePost = ({name, caption, postImage}) => {
    const [addComment, setAddComment] = useState(false)
    return (
        <div className="card"
            style={{
                margin: '30px auto',
                minHeight: '500px',
                minWidth: '500px',
                padding: '20px',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <p style={{ fontWeight: 600, fontSize: 18 }}>{name}</p>
            <div
                className='mb-3'
                style={{
                    width: '400px',
                    maxHeight: '400px',
                    border: '1px solid black'
                }}
            >
                <img maxHeight="450" src={postImage} alt="post-id" />
            </div>
            <div>
                <div className='btn text-primary'>Like</div> <div onClick={()=>setAddComment(!addComment)} className='btn text-primary'>Comment</div> <div className='btn text-primary'>Share</div>
            </div>
            <p>Liked by Harsh Chauhan and<div className='btn text-primary'>100 others</div></p>
             {addComment && <div style={{ display: 'flex', width: '400px', border: '1px solid lightgrey' }}>
                    <textarea
                        className="form-control"
                        rows="1"
                        placeholder='Add a comment...'
                        style={{ width: '340px' }}
                    ></textarea>
                    <div className='btn text-primary'>Post</div>
                </div>
            }   
                
        </div>
    )
}

export default SinglePost