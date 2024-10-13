import registerSME from "./userControllers/registerSME.js";
import addPost from "./communityControllers/addPost.js";
import addComment from "./communityControllers/commentPost.js";
import addLike from "./communityControllers/LikePost.js";
import registerInvestor from "./userControllers/registerInvestor.js"
import registerMentor from "./userControllers/registerMentor.js";
import loginUser from "./userControllers/login.js";
import createEvent from "./EventControllers/createEvent.js";

export{
    registerSME,
    addPost,
    addComment,
    addLike,
    registerInvestor,
    registerMentor,
    loginUser,
    createEvent
}