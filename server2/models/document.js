import mongoose, { Collection } from "mongoose";
const Schema = mongoose.Schema;

const docSchema = new Schema(
  {  
    docID: {
        type: String,
        required:true,
        unique : true
      
      },
    
    Content: {
      type: String,
    
    },

      
  },
  {collections:"Doc"}
)

const Doc = mongoose.model("Doc", docSchema);

export default Doc;
