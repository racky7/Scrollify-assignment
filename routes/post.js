const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model('Post')

/*
it is a protected route, to access this route we need a middleware (we require login before acessing this route)
*/
const requireLogin = require('../middleware/requireLogin')


router.get('/allpost', requireLogin, (req, res) => {
    Post.find()
        .populate("postedBy", "_id name")
        .then(posts => {
            res.json({ posts })
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/createpost', requireLogin, (req, res) => {
    const { caption, image } = req.body
    if (!caption || !image) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    //hiding user password for future use 
    req.user.password = undefined
    //create new post
    const post = new Post({
        caption,
        image,
        postedBy: req.user
    })
    post.save()
        .then(result => {
            res.json({ post: result })
        })
        .catch(err => {
            console.log(err)
        })

})

//like api
router.put("/like", requireLogin, (req, res)=>{
    Post.findByIdAndUpdate(req.body.postId, {
      $push:{likes:{userId:req.user._id, name:req.user.name}}
    }, {
      new:true
    }).exec((err,result)=>{
      if(err){
        return res.status(422).json({error:err})
      }
      else{
        res.json(result)
      }
    })
  })

//unlike api
  router.put("/unlike", requireLogin, (req, res)=>{
    Post.findByIdAndUpdate(req.body.postId, {
      $pull:{likes:{userId:req.user._id, name:req.user.name}}
    }, {
      new:true
    }).exec((err,result)=>{
      if(err){
        return res.status(422).json({error:err})
      }
      else{
        res.json(result)
      }
    })
  })

  //comment api

router.put("/comment", requireLogin, (req, res)=>{
  const { postId, text } = req.body
  Post.findByIdAndUpdate(postId, {
    $push:{comments:{userId:req.user._id, name:req.user.name, text }}
  }, {
    new:true
  }).exec((err,result)=>{
    if(err){
      return res.status(422).json({error:err})
    }
    else{
      res.json(result)
    }
  })
})

// get single post details
router.get("/:postId", (req,res)=>{
  Post.findById(req.params.postId)
  .populate("postedBy", "_id name")
  .then(post=>{
    if(post) res.json(post);
    else{
      res.status(404).json({ error: "Post not found" })
    }
  }).catch((error)=>{
    res.status(500).json(error.message);
  })
})


module.exports = router
