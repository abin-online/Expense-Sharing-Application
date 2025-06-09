import mongoose, { Schema } from 'mongoose';

export interface IGroupDocument extends Document {
    name: string;
    ownerId: mongoose.Types.ObjectId;
}

const GroupSchema = new Schema<IGroupDocument>({
  name: { type: String, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const GroupModel = mongoose.model('Group', GroupSchema);