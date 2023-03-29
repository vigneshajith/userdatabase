import { model, Schema, Types } from "mongoose";

export interface User {
    userInfo: Types.ObjectId;
    userAddress: Types.ObjectId;
} 

export const UserSchema = new Schema<User>({
    userInfo: { type: Schema.Types.ObjectId, required: [true, "userInfo is missing"] },
    userAddress:{type:Schema.Types.ObjectId,required:[true,"userAddress is missing"]}
})

export const UserModel = model<User>("user",UserSchema)