import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    milestones: [
        {
            text: {
                type: String,
                required: true,
                trim: true,
            },
            done: {
                type: Boolean,
                default: false,
            },
            completedAt: {           // ← New optional field (minimal addition)
                type: Date,
            },
        },
    ],
    isActive: {
        type: Boolean,
        default: true,
    },
    completedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Goal', goalSchema);