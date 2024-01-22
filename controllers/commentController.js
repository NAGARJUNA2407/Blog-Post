//import model 
const Post = require("../models/postModel")
const Comment = require("../models/commentModel")

//Business Logic
exports.createComment = async (req,res)=>{
    try{
        //fetch data from req body 
         const {post, user , body }=req.body;

        //create a comment Object
        const comment = new Comment({post,user,body});

       

        //use .save instead of .Create using object save
        const savedComment= await comment.save();

        //find the post by ID and add new comment to its comment array
        const updatedPost = await Post.findByIdAndUpdate(post,{$push:{comments:savedComment._id}},{new:true} )
                                     .populate("comments" )//populate the comment array with comment documents
                                        .exec();

        res.json({
            post:updatedPost
        })

         
    }
    catch(error){ 
        console.log("Error while creating comment ",error)
        return res.status(500).json({
            error:"Error While creating Comment"
        });

        
    }
}
