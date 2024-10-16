import {Post} from "../../models/index.js"

const addComment = async(req,res)=>{
    
    const {commentorName,postId,comment} = req.body;

    const post = await Post.findOne({postId:postId})

    if(!post) return res.status(400).send({message:"post does not exist"})

    post.comments.push({
        commenterName:commentorName,
        commentText : comment,
        createdAt : Date.now()
    })

    await post.save()

    return res.status(200).send({message:"added comment successfully"})

}

export default addComment