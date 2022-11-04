import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import axios from "./axios/axios.js";
import SinglePost from './SinglePost.js';

const ViewSharedPost = () => {
    let { postId } = useParams(); 
    const [post, setPost] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log(postId);
        axios.get(`/api/post/${postId}`)
            .then(res =>{
                setPost(res.data)
                console.log(res.data)
                setLoading(false)
            })
            .catch(err=>{
                console.log(err)
                alert(err)
                setLoading(false)
            })
    },[]);
 
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        {!loading?
          post ? 
          <SinglePost name={post.postedBy.name} caption={post.caption} postImage={post.image} totalLikes={post.likes.length} key={post._id} liked={false} postId={post._id} likes={post.likes} currentUser={'Nil'} comments={post.comments} postDate={post.createdAt} />
          :'Server error... Try Again'
          
        
        :'Post Loading...'}
    </div>
  )
}

export default ViewSharedPost