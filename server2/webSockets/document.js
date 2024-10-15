import {Doc} from "../models/index.js"
import {logger} from "../utils/index.js";

const document = (io) =>{
    io.on('connection', (socket) => {
        
        socket.on('edit',({docID,content})=>{
            io.to(docID).emit('update_content',content)
        })

        socket.on('save',async ({docID,content})=>{
            try {
                const doc = await Doc.findOne({docID})

                if(!doc){
                    logger.error("doc not found")
                    return;
                }

                doc.content = content;

                await doc.save();

                socket.emit('saved',{docID})

            } catch (error) {
                logger.error(error)
            }

        })

        socket.on('disconnect', () => {
        });
    });
}
export default document;