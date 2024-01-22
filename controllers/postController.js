//import the model 
const Post=require("../models/postModel")

//Business Logic
exports.createPost=async (req,res)=>{
    try{
        const {title,body}=req.body;
        const post = new Post({title,body});

        const savedPost= await post.save();

        res.json({
            post:savedPost
        })
    }
    catch(error){
        return res.status(500).json({
            error:"Error While Creating Post "
        });
    }
}

exports.getAllPosts=async (req,res)=>{
    try{
        const posts=await Post.find().populate("comments").exec();
        res.json({
            posts
        })
    }
    catch(error){
         res.status(500).json({
            error:"Error while fetching posts "
        })
    }
}
