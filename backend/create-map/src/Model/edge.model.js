import mongoose from "mongoose";
import crypto from "crypto";

const EdgeScheme = new mongoose.Schema({
       projectId:{
            type: mongoose.Schema.Types.ObjectId,
             ref: 'Project'
        },
  source: { type: String, required: true }, 
  target: { type: String, required: true }, 
 
  label: { type: String },
  // style: {
  //   stroke: { type: String },
  //   strokeWidth: { type: Number },
  //   opacity: { type: Number },
  // },
  // animated: { type: Boolean, default: false },
  // data: {
  //   confidence: { type: Number },
  //   rationale: { type: String },
  // },
});

export const Edge= mongoose.model('Edge',EdgeScheme);