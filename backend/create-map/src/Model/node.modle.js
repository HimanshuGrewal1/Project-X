import mongoose from "mongoose";

const NodeScheme = new mongoose.Schema({
    projectId:{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Project'
    },
  id: { type: String },
  
    label: { type: String,  },
    description: { type: String,  },
    
 
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  icon: { type: String },
  // type: { type: String, default: "default" },
  // style: {
  //   backgroundColor: { type: String },
  //   color: { type: String },
  //   fontWeight: { type: String },
  //   border: { type: String },
  //   padding: { type: Number },
  //   borderRadius: { type: String },
  //   width: { type: Number },
  //   textAlign: { type: String },
  //   opacity: { type: Number },
  // },
});


export const Node= mongoose.model('Node',NodeScheme);