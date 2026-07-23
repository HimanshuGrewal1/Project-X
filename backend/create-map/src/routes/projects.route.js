import express from 'express';
import { AddEdge, AddNote, createProject, EditNode, getProject, getProjectsByUser ,EditEdge,DeleteNode,DeleteEdge} from '../controllers/project.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
// import upload from '../utils/multer.js';

const router = express.Router();

router.post('/project', verifyToken, createProject);
router.get('/project', verifyToken, getProjectsByUser);
router.get('/project/:projectId', getProject);
router.post('/project/:projectId/creatNode', verifyToken, AddNote);
router.post('/project/:projectId/creatEdge', verifyToken, AddEdge);
router.post('/project/:projectId/editNode', verifyToken, EditNode);
router.post('/project/:projectId/editEdge', verifyToken, EditEdge);
router.post('/project/:projectId/deleteNode', verifyToken, DeleteNode);
router.post('/project/:projectId/deleteEdge', verifyToken, DeleteEdge);


export default router;