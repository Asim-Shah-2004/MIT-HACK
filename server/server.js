import express from "express";
import morgan from "morgan";
import http from "http";
import cors from "cors";
import "dotenv/config";

import { Server } from "socket.io";
import { logger } from "./utils/index.js";
import { connectDB } from "./services/index.js";
import { loginRouter, registerRouter, postRouter, feedBackRouter, eventRouter, userRouter , chatRouter , warehouseRouter , marketPlaceRouter} from "./routers/index.js";
import { authenticateToken } from "./middlewares/index.js"; 
import { proposal, chats, document } from "./webSockets/index.js";
import salesRouter from "./routers/khaataRouter/salesRouter.js";
import transactionRouter from "./routers/khaataRouter/transactionRouter.js";

const corsOptions = {
  origin: ["*", process.env.FRONTEND_URL, "http://192.168.118.236:5173"],
  methods: "POST, GET , PATCH",
  credentials: true,
};

const app = express();
const PORT = process.env.PORT;
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

connectDB();

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/feedback", feedBackRouter);

app.use('/transactions', transactionRouter);
app.use('/sales', salesRouter);

app.use(authenticateToken);

proposal(io);
chats(io);
document(io);


app.use("/event", eventRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/warehouse", warehouseRouter);
app.use('/chat',chatRouter)
app.use('/marketplace',marketPlaceRouter)

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

server.listen(PORT, "0.0.0.0", () => {
  logger.info(`Server is running on port ${PORT}`);
});
