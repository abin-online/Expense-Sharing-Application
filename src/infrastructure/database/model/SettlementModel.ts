import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISettlement extends Document {
    groupId: Types.ObjectId;
    payerId: Types.ObjectId;
    payeeId: Types.ObjectId;
    amount: number;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

const SettlementSchema = new Schema<ISettlement>({
    groupId: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    payerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    payeeId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
}, { timestamps: true });

export default mongoose.model<ISettlement>('Settlement', SettlementSchema);
