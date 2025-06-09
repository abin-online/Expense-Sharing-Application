import mongoose, { Schema } from 'mongoose';


export interface IGroupMemberDocument extends Document {
    groupId: mongoose.Types.ObjectId;
    userId :  mongoose.Types.ObjectId;
    joinedAt : Date;
}


const GroupMemberSchema = new Schema({
  groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  joinedAt: { type: Date, default: Date.now }
});

export const GroupMemberModel = mongoose.model('GroupMember', GroupMemberSchema);
