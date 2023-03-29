import { model, Schema } from "mongoose";

export interface Address {
    street: string;
    city: string;
}
export interface UserAddressItem {
    email: string;
    address:Address[]
}

export const AddressSchema = new Schema<Address>({
    street:{type:String,required:[true,"street is required"]},
    city:{type:String,required:[true,"city is required"]}
})


export const UserAddressSchema = new Schema<UserAddressItem>({
    email: { type: String, required: true },
     address:{type:[AddressSchema],required:true}
}, {
    timestamps: true,
})

export const UserAddressModel = model<UserAddressItem>("userAddress",UserAddressSchema)