import FileGenerateController from '../controller/FileGenerateController.js';
import express from 'express';
import multer from 'multer';
const upload = multer({ dest: `${process.env.TEMP_UPLOAD_DIR}` });

const router = express.Router();

router.post('/text/', upload.single('file'), new FileGenerateController().generateTextFile);
router.post('/csv/', upload.single('file'), new FileGenerateController().generateCsvFile);
router.post('/pdf/', upload.single('file'), new FileGenerateController().generatePdfFile);
router.post('/html/', upload.single('file'), new FileGenerateController().generateHtmlFile);

export default router;