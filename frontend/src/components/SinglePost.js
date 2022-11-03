import React, { useState } from 'react'
import axios from 'axios'

const SinglePost = ({ name, caption, postImage, totalLikes, liked, postId }) => {
    const [addComment, setAddComment] = useState(false)
    const [tempLike, setTemplike] = useState(0)
    
    const handleLike = () => {
        
        axios
            .put('https://4000-racky7-scrollifyassignm-gzo3u46h5fe.ws-us74.gitpod.io/api/post/like',
                { postId }
                ,
                {
                    headers: {
                        'authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                }
            )
            .then(response => {
                console.log(response)
                setTemplike(tempLike + 1)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleUnlike = () =>{
        axios
            .put('https://4000-racky7-scrollifyassignm-gzo3u46h5fe.ws-us74.gitpod.io/api/post/unlike',
                { postId }
                ,
                {
                    headers: {
                        'authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                }
            )
            .then(response => {
                console.log(response)
                setTemplike(tempLike - 1)
            })
            .catch(err => {
                console.log(err)
            })
    }

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
            <p style={{ fontWeight: 400, fontSize: 16 }}>{caption}</p>
            <div
                className='mb-3'
                style={{
                    width: '400px',
                    maxHeight: '400px',
                    border: '1px solid black'
                }}
            >
                <img width="380px" height="340px" src={postImage} alt="post-id" />
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex' }}>{liked || tempLike ? <div onClick={handleUnlike} className='btn text-primary' style={{ fontWeight: 600 }}>Unlike {totalLikes ? totalLikes + tempLike : 0}</div> : <div onClick={handleLike} className='btn text-primary'>Like {totalLikes ? totalLikes + tempLike : 0}</div>}</div> <div onClick={() => setAddComment(!addComment)} className='btn text-primary'>Comment</div> <div className='btn text-primary'>Share</div>
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