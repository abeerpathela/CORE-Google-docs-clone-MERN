import mongoose from 'mongoose';

const documentSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            default: 'Untitled Document'
        },
        data: {
            type: Object,
            required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        collaborators: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        isFavorite: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Document = mongoose.model('Document', documentSchema);

export default Document;
