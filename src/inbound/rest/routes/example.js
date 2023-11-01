import AbstractController from '../controller/AbstractController.js';
import express from 'express';

const router = express.Router();

router.get('/health', new AbstractController().health);

export default router;