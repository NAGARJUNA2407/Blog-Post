 //import models
 const Like=require("../models/likeModel")
 const Post= require("../models/postModel")

 //Business logic for LIKE 
 exports.likePost= async (req,res)=>{
    try{
        const {post,user}=req.body;
        const like=new Like({post,user});
        const savedLike=await like.save();

        //create the post collection on this basis
        const updatedPost=await Post.findByIdAndUpdate(post,{$push:{likes:savedLike._id}},{new:true})
            .populate("likes").populate("comments").exec()

        res.json({
            post:updatedPost
        })
    }
    catch(error){
        res.status(500).json({
            error:"Error while Liking the Post "
        })
    }
 }
 //unlike wala business logic 
 exports.unlikePost=async (req,res)=>{
    try{
        const {post,like}=req.body;
        //find and delete in the Like collection
        const deletedLike=await Like.findOneAndDelete({post:post,_id:like})

        //update into the POST
        const updatedPost=await Post.findByIdAndUpdate(post,
                                                            {$pull:{likes:deletedLike._id}},
                                                            {new:true}).populate("likes").exec();
        res.json({
            post:updatedPost
        })
    }
    catch(error){
        res.status(500).json({
            error:"Error while Unliking the Post "
        })

    }
 }