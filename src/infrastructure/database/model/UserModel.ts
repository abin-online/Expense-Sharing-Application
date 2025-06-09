import mongoose, { Document, Schema } from 'mongoose';

export interface IUserDocument extends Document {
    name: string;
    email: string;
    passwordHash: string;
}

const UserSchema = new Schema<IUserDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }
},
    {
        timestamps: true,
    });

// Create the Mongoose model
export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);