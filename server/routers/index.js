import registerRouter from "./authRouters/registerRouter.js";
import loginRouter from "./authRouters/loginRouter.js";
import postRouter from "./communityRouter/postRouter.js";
import feedBackRouter from "./communityRouter/feedBackRouter.js";
import eventRouter from "./communityRouter/eventRouter.js";
import userRouter from "./generelRouters/userRouter.js";
import warehouseRouter from "./InvenotrySpaceRoutes/warehouseRoutes.js";
import chatRouter from "./communityRouter/chatRouter.js";
import marketPlaceRouter from "./communityRouter/marketplaceRouter.js";
import salesRouter from "./khaataRouter/salesRouter.js";
import transactionRouter from "./khaataRouter/transactionRouter.js";
export{
    registerRouter,
    loginRouter,
    postRouter,
    feedBackRouter,
    eventRouter,
    userRouter,
    warehouseRouter,
    chatRouter,
    marketPlaceRouter,
    salesRouter,
    transactionRouter
}