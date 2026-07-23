import { Project } from "../Model/Project.modle.js";
import { Node } from "../Model/node.modle.js";
import { Edge } from "../Model/edge.model.js";
// import cloudinary from "../utils/cloudinary.js";
// import fs from "fs";
import crypto from "crypto";
 


export const createProject = async (req, res) => {
  try {
    const { title, description, nodes = [], edges = [] } = req.body;
    const owner = req.userId; // Ensure this comes from auth middleware
    console.log(req.body);
    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Title and description are required" });
    }

    // Step 1: Create project
    const project = await Project.create({
      owner,
      title,
      description,
    });

    // Step 2: Add projectId to nodes/edges
    const projectId = project._id;

   const safeNodes = nodes.map((n, i) => ({
  ...n,
  projectId,
  
}));

const safeEdges = edges.map((e, i) => ({
  ...e,
  projectId,
  
}));

const createdNodes = await Node.insertMany(safeNodes);
const createdEdges = await Edge.insertMany(safeEdges);
    // Step 3: Send response
    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: projectId 
   
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


//     await project.save();

//     res.status(201).json({
//       success: true,
//       message: "Project created successfully",
//       project,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

export const getProjectsByUser = async (req, res) => {
    const owner = req.userId;
    try {
        const projects = await Project.find({ owner });
        res.status(200).json({
            success: true,
            projects
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getProject = async (req, res) => {
  const { projectId } = req.params;

  try {
   
    const Nodes = await Node.find({ projectId });
    const Edges = await Edge.find({ projectId });

  
    res.status(200).json({
      success: true,
      project: {
        Nodes,
        Edges,
      },
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch project data.",
    });
  }
};


export const AddNote= async (req,res)=>{
    const {projectId}= req.params;
    const {position,label,description,icon,id}= req.body;
    console.log(req.body);
    try {{
        const newNode= new Node({
            projectId,
          id,
            position,
            label,
            description,
            icon,
        });
        await newNode.save();
        res.status(201).json({
            success:true,
            message:"Node added successfully",
            node: newNode
        });
    }} catch (error) {
        res.status(400).json({ success: false, message: error.message });
        console.log(error);
    }

}

export const AddEdge= async (req,res)=>{
    const {projectId}= req.params;
    const {source,target,label}= req.body;
    console.log(req.body);
    try {{
        const newEdge= new Edge({
            projectId,
            label,
            source,
            target,
           
        });
        await newEdge.save();
        res.status(201).json({
            success:true,
            message:"Edge added successfully",
            edge: newEdge
        });
    }} catch (error) {
        res.status(400).json({ success: false, message: error.message });
        console.log(error);
    }
}

export const EditNode= async (req,res)=>{
    const {projectId}= req.params;
    const {id,position,label,description,icon}= req.body;
    console.log(req.body);
    try {{
        const updatedNode= await Node.findOneAndUpdate(
            { projectId, id },
            { position, label, description, icon },
            { 'returnDocument':"after" }
        );
        if (!updatedNode) {
            throw new Error("Node not found");
        }
        res.status(200).json({
            success:true,
            message:"Node updated successfully",
            node: updatedNode
        });
    }} catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const EditEdge= async (req,res)=>{
    const {projectId}= req.params;
    const {_id,source,target,label}= req.body;
    try {{
        const updatedEdge= await Edge.findOneAndUpdate(
            { projectId, _id },
            { source, target, label },
            { 'returnDocument':"after" }
        );
        if (!updatedEdge) {
            throw new Error("Edge not found");
        }
        res.status(200).json({
            success:true,
            message:"Edge updated successfully",
            edge: updatedEdge
        });
    }} catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
  }

  export const DeleteNode= async (req,res)=>{
    const {projectId}= req.params;
    const {id}= req.body;
    try {{
        const deletedNode= await Node.findOneAndDelete(
            { projectId, id }
        );
        if (!deletedNode) {
            throw new Error("Node not found");
        }
        res.status(200).json({
            success:true,
            message:"Node deleted successfully",
            node: deletedNode
        });
    }} catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
  }

  export const DeleteEdge= async (req,res)=>{
    const {projectId}= req.params;
    const {_id}= req.body;
    try {{
        const deletedEdge= await Edge.findOneAndDelete(
            { projectId, _id }
        );
        if (!deletedEdge) {
            throw new Error("Edge not found");
        }
        res.status(200).json({
            success:true,
            message:"Edge deleted successfully",
            edge: deletedEdge
        });
    }} catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
  }

