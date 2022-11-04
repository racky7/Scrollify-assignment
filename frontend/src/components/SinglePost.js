import React, { useEffect, useState } from 'react'
import axios from "./axios/axios.js";
import LikesModal from './LikesModal'
import CommentsModal from './CommentsModal.js';
import ShareModal from './ShareModal.js';
import moment from 'moment'

const SinglePost = ({ name, caption, postImage, totalLikes, liked, postId, likes, currentUser, comments, postDate }) => {
    const [addComment, setAddComment] = useState(false)
    const [tempLike, setTemplike] = useState(0)
    const [userLiked, setUserliked] = useState(liked)
    const [likeModal, setLikeModal] = useState(false);
    const [commentModal, setCommentModal] = useState(false);
    const [shareModal, setShareModal] = useState(false);
    const [comment, setComment] = useState(null)
    const [commentLength, setCommentLength] = useState(0)

    useEffect(() => {
      setCommentLength(comments.length)
    }, [])
    

    
    const handleLike = () => {
        
        axios
            .put('/api/post/like',
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
                likes.push({name:currentUser})
                setUserliked(true)
                setTemplike(tempLike + 1)

            })
            .catch(err => {
                console.log(err)
                alert('Please login to like')
            })
    }

    const handleUnlike = () =>{
        axios
            .put('/api/post/unlike',
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
                likes.pop()
                console.log(likes)
                setUserliked(false)
                setTemplike(tempLike - 1)
            })
            .catch(err => {
                console.log(err)
                alert(err)
            })
    }

    const handleComment = () => {
        if(!comment){
            alert('Please add a comment.')
            return
        }
        axios
            .put('/api/post/comment',
            {postId, text:comment},
            {
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }
            )
            .then(response=>{
                console.log(response)
                setCommentLength(commentLength+1)
                comments.push({name:currentUser, text:comment})
                alert('Comment added successfully!')
                
            })
            .catch(err => {
                console.log(err)
                alert('Please login to comment!')
            })

        setComment('')
    }

    return (
        <div className="card"
            style={{
                margin: '30px auto',
                minHeight: '450px',
                minWidth: '500px',
                padding: '20px',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <div style={{display:'flex'}}><p style={{ fontWeight: 600, fontSize: 18 }}>{name + ' - '}</p> <span className="text-small">{ moment(postDate).fromNow()}</span></div>
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
                    
                    {userLiked ? <div onClick={handleUnlike} className='btn text-primary' style={{ fontWeight: 600 }}>Unlike {totalLikes ? totalLikes + tempLike : tempLike}</div> : <div onClick={handleLike} className='btn text-primary'>Like {totalLikes ? totalLikes + tempLike : tempLike}</div>}
                
                </div> 
                    <div onClick={() => setAddComment(!addComment)} className='btn text-primary'>Comment</div> <div onClick={() => setShareModal(true)} className='btn text-primary'>Share</div>
            </div>
            <p>Liked by <div onClick={() => setLikeModal(true)} className='btn text-primary'>{totalLikes + tempLike} users</div></p>
            <p className='mt-0'>View all <div onClick={() => setCommentModal(true)} className='btn text-primary'>{commentLength} comments</div></p>
            {addComment && <div style={{ display: 'flex', width: '400px', border: '1px solid lightgrey' }}>
                <textarea
                    className="form-control"
                    rows="1"
                    placeholder='Add a comment...'
                    style={{ width: '340px' }}
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                ></textarea>
                <div onClick={handleComment} className='btn text-primary'>Post</div>
            </div>
            }
            
            <LikesModal
            show={likeModal}
            onHide={() => setLikeModal(false)}
            likes={likes}
            />

            <CommentsModal 
            show={commentModal}
            onHide={()=> setCommentModal(false)}
            comments={comments}
            />

            <ShareModal 
            show={shareModal}
            onHide={()=> setShareModal(false)}
            sharelink = {window.location.origin+`/post/${postId}`}
            />
        </div>
    )
}

export default SinglePost