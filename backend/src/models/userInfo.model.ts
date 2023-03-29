import { model, Schema } from "mongoose";

export interface UserInfo {
    name: string;
    age: number;
    email: string;
}

export const UserInfoSchema = new Schema<UserInfo>({
    name: { type: String, required: [true, "name is missing"] },
    age: { type: Number, required: [true, "age is missing"] },
    email: { type: String, required: [true, "email is missing"], unique: true }
},
    {
        timestamps: true,
    })

export const UserInfoModel = model<UserInfo>("userInfo",UserInfoSchema)