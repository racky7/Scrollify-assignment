import React, { useState, useEffect } from 'react'
import { useAuthContext } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom'
import CreatePost from '../CreatePost'
import SinglePost from '../SinglePost'
import axios from "../axios/axios.js";

const Home = () => {
  const { state } = useAuthContext()
  const navigate = useNavigate()
  const [allposts, setAllpost] = useState()
  const [loading, setLoading] = useState(true)


  const handleLogout = () => {
    localStorage.clear();
    navigate('/login')
  }
  useEffect(() => {
    document.title = 'iSocialMedia';
    axios
      .get('/api/post/allpost',
        {
          headers: {
            'authorization': 'Bearer ' + localStorage.getItem("token")
          }
        }
      )
      .then(response => {
        console.log(response.data.posts)
        setAllpost(response.data.posts.reverse())
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
    
    return
  }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', maxWidth:'500px', margin:'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between!important', width:'500px', gap:'30px' }}>
        <h3>Hi, {state && state.name}</h3>
        <div className='btn btn-dark' onClick={handleLogout}>Logout</div>
      </div>

      <div className='m-3'>
        <CreatePost setAllpost={setAllpost}/>
        {!loading?
          allposts ? 
          allposts.map((post, ind)=>{
            var liked = false;
            //check post liked by user
            post.likes.find(likedby=>likedby.userId===state._id)?liked=true:liked=false
            return <SinglePost name={post.postedBy.name} caption={post.caption} postImage={post.image} totalLikes={post.likes.length} key={post._id} liked={liked} postId={post._id} likes={post.likes} currentUser={state.name} comments={post.comments} postDate={post.createdAt} />
          }) 
          :'Server error... Try Again'
          
        
        :'Posts Loading...'}
      </div>

    </div>

  )
}

export default Home