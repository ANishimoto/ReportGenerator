import UserController from '../controller/UserController.js';
import express from 'express';

const router = express.Router();
const middleware = (req, res, next) => {
    next();
}

router.use(middleware);

router.post('/user/', new UserController().create);
router.get('/user/:id', new UserController().findOne);
router.get('/user/', new UserController().findAll);
router.put('/user/:id', new UserController().update);
router.delete('/user/:id', new UserController().delete);

export default router;