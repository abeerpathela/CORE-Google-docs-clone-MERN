import express from 'express';
import {
    getUserDocuments,
    createDocument,
    updateDocumentTitle,
    toggleFavorite,
    deleteDocument
} from '../controller/document-controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getUserDocuments)
    .post(protect, createDocument);

router.route('/:id')
    .put(protect, updateDocumentTitle)
    .delete(protect, deleteDocument);

router.route('/:id/favorite')
    .put(protect, toggleFavorite);

export default router;
