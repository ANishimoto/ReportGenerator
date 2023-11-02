import TemplateTypeController from '../controller/TemplateTypeController.js';
import express from 'express';

const router = express.Router();

router.post('/templateType/', new TemplateTypeController().create);
router.get('/templateType/:id', new TemplateTypeController().findOne);
router.get('/templateType/', new TemplateTypeController().findAll);
router.put('/templateType/:id', new TemplateTypeController().update);
router.delete('/templateType/:id', new TemplateTypeController().delete);

export default router;