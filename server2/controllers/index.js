import registerWarehouseOwner from "./authControllers/register/warehouseOwner.js";
import registerEntrepreneur from "./authControllers/register/entrepreneur.js";
import registerInvestor from "./authControllers/register/investor.js";
import loginUser from "./authControllers/login/login.js"
import addPost from "./postControllers/addPost.js";
import addComment from "./postControllers/addComment.js";
import addLike from "./postControllers/addLike.js";

export{
    registerWarehouseOwner,
    registerEntrepreneur,
    registerInvestor,
    loginUser,
    addPost,
    addComment,
    addLike
}