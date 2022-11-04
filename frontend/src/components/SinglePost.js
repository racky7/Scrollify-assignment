import React, { useState } from 'react'
import axios from 'axios'
import LikesModal from './LikesModal'

const SinglePost = ({ name, caption, postImage, totalLikes, liked, postId, likes }) => {
    const [addComment, setAddComment] = useState(false)
    const [tempLike, setTemplike] = useState(0)
    const [userLiked, setUserliked] = useState(liked)
    const [likeModal, setLikeModal] = useState(false);
    
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
                setUserliked(true)
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
                setUserliked(false)
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
                <div style={{ display: 'flex' }}>
                    
                    {userLiked ? <div onClick={handleUnlike} className='btn text-primary' style={{ fontWeight: 600 }}>Unlike {totalLikes ? totalLikes + tempLike : 0}</div> : <div onClick={handleLike} className='btn text-primary'>Like {totalLikes ? totalLikes + tempLike : 0}</div>}
                
                </div> 
                    <div onClick={() => setAddComment(!addComment)} className='btn text-primary'>Comment</div> <div className='btn text-primary'>Share</div>
            </div>
            <p>Liked by <div onClick={() => setLikeModal(true)} className='btn text-primary'>{totalLikes + tempLike} users</div></p>
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
            
            <LikesModal
            show={likeModal}
            onHide={() => setLikeModal(false)}
            likes={likes}
            />
        </div>
    )
}

export default SinglePost