import React, { useState, useEffect } from 'react'
import { useAuthContext } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom'
import CreatePost from '../CreatePost'
import SinglePost from '../SinglePost'
import axios from 'axios'

const Home = () => {
  const { state } = useAuthContext()
  const navigate = useNavigate()
  const [allposts, setAllpost] = useState({})
  const [loading, setLoading] = useState(true)


  const handleLogout = () => {
    localStorage.clear();
    navigate('/login')
  }
  useEffect(() => {
    axios
      .get('https://4000-racky7-scrollifyassignm-gzo3u46h5fe.ws-us74.gitpod.io/api/post/allpost',
        {
          headers: {
            'authorization': 'Bearer ' + localStorage.getItem("token")
          }
        }
      )
      .then(response => {
        console.log(response.data.posts)
        setAllpost(response.data.posts)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
    
    return
  }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'space-between' }}>
        <h3>Hi, {state && state.name}</h3>
        <div className='btn btn-dark' onClick={handleLogout}>Logout</div>
      </div>

      <div className='m-3'>
        <CreatePost />
        {!loading?
        
          allposts.map((post, ind)=>{
            var liked = false;
            //check post liked by user
            post.likes.find(id=>id==state._id)?liked=true:liked=false
            return <SinglePost name={post.postedBy.name} caption={post.caption} postImage={post.image} totalLikes={post.likes.length} key={post._id} liked={liked} postId={post._id} />
          })
        
        :'Posts Loading...'}
      </div>

    </div>

  )
}

export default Home