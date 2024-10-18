import {Post} from "../../models/index.js"

const getAllPosts = async(req,res)=>{
    try{
        const post = await Post.find()
        res.json(post)
    }catch(err){
        console.log(err); 
    }
}

export default getAllPosts