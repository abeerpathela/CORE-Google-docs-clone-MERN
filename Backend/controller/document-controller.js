
import Document from '../schema/documentSchema.js';
import asyncHandler from 'express-async-handler';

export const getDocument = async (id, userId = null) => {
    if (!id) return null;

    let document;
    
    if (userId) {
        document = await Document.findOne({
            _id: id,
            $or: [{ owner: userId }, { collaborators: userId }]
        });
    } else {
        document = await Document.findById(id);
    }

    if (document) return document;

    if (userId) {
        return await Document.create({ _id: id, data: "", owner: userId });
    }

    return null;
};

export const updateDocument = async (id, data) => {
    return await Document.findByIdAndUpdate(id, { data }, { new: true });
};

export const getUserDocuments = asyncHandler(async (req, res) => {
    const documents = await Document.find({
        $or: [{ owner: req.user._id }, { collaborators: req.user._id }]
    }).sort({ updatedAt: -1 });
    res.json(documents);
});

export const createDocument = asyncHandler(async (req, res) => {
    const { id, title } = req.body;
    const document = await Document.create({
        _id: id,
        title: title || 'Untitled Document',
        data: "",
        owner: req.user._id
    });
    res.status(201).json(document);
});

export const updateDocumentTitle = asyncHandler(async (req, res) => {
    const document = await Document.findById(req.params.id);

    if (!document) {
        res.status(404);
        throw new Error('Document not found');
    }

    if (document.owner.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
    }

    const updatedDocument = await Document.findByIdAndUpdate(
        req.params.id,
        { title: req.body.title },
        { new: true }
    );

    res.json(updatedDocument);
});

export const toggleFavorite = asyncHandler(async (req, res) => {
    const document = await Document.findById(req.params.id);

    if (!document) {
        res.status(404);
        throw new Error('Document not found');
    }

    if (document.owner.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
    }

    const updatedDocument = await Document.findByIdAndUpdate(
        req.params.id,
        { isFavorite: !document.isFavorite },
        { new: true }
    );

    res.json(updatedDocument);
});

export const deleteDocument = asyncHandler(async (req, res) => {
    const document = await Document.findById(req.params.id);

    if (!document) {
        res.status(404);
        throw new Error('Document not found');
    }

    if (document.owner.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
    }

    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: 'Document removed' });
});