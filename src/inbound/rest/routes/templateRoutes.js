import TemplateController from '../controller/TemplateController.js';
import express from 'express';

const router = express.Router();

router.post('/template/', new TemplateController().create);
router.get('/template/:id', new TemplateController().findOne);
router.get('/template/', new TemplateController().findAll);
router.put('/template/:id', new TemplateController().update);
router.delete('/template/:id', new TemplateController().delete);

export default router;