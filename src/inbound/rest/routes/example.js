import AbstractController from '../controller/AbstractController.js';
import express from 'express';

const router = express.Router();
const middleware = (req, res, next) => {
    next();
}

router.use(middleware);

router.get('/health', new AbstractController().health);

export default router;