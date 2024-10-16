import {Post} from "../../models/index.js"

const addLike = async(req,res)=>{
    
    const {postId} = req.body;

    const post = await Post.findOne({postId:postId})

    if(!post) return res.status(400).send({message:"post does not exist"})

    post.likes = post.likes + 1

    await post.save()

    return res.status(200).send({message:"added Like successfully"})

}

export default addLike