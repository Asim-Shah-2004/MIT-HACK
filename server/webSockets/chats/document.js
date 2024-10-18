import { Doc } from "../../models/index.js";
import jwt from "jsonwebtoken";

const document = (io) => {
  io.on("connection", (socket) => {
    let documentRoomID = null;
    let userID = null;

    const handleError = (event, message) => {
      socket.emit(event, message);
    };

    socket.on("get-document", async ({ documentID, token }) => {
      if (!token) {
        return handleError("error-unauthorized-document-access", "Unauthorized access");
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userID = decoded.email;
      } catch {
        return handleError("error-unauthorized-document-access", "Unauthorized access");
      }

      try {
        let doc = await Doc.findOne({ docID: documentID });
    
        if (!doc) {
            try {
                doc = new Doc({
                    docID: documentID,
                    owner: userID,
                    participants: [userID],
                    lastAccessed: Date.now(),
                    createdAt: Date.now(),
                    modifiedAt: Date.now(),
                });
    
                await doc.save();
            } catch (error) {
                return handleError("error-document-creation-failed", error.message);
            }
        } 
        // else if (!doc.participants.includes(userID)) {
        //     return handleError("error-unauthorized-document-access", "Unauthorized access");
        // }
    
        // Update last accessed time and save the document
        doc.lastAccessed = Date.now();
        await doc.save();
    
        socket.emit("load-document", doc.content);
    } catch (err) {
        console.error("Error getting document:", err);
        // handleError("error-getting-document", err.message);
    }

      socket.join(documentID);
      documentRoomID = documentID;

      socket.on("send-changes", (delta) => {
        socket.to(documentID).emit("receive-changes", delta);
      });

      socket.on("save-document", async (content) => {
        try {
          const doc = await Doc.findOne({ docID: documentID });
          if (doc) {
            doc.content = content;
            doc.modifiedAt = Date.now();
            await doc.save();
          }
        } catch (err) {
          console.error("Error saving document: ", err);
        }
      });
    });

    socket.on("disconnect", () => {});
  });
};

export default document;
