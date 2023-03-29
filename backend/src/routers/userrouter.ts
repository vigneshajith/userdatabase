import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { UserInfoModel } from '../models/userInfo.model';
import { UserAddressItem, UserAddressModel } from '../models/userAddress.model';
import { UserInfo } from '../models/userInfo.model';


const router = Router();

router.get("/allusers", asyncHandler(async (req: any, res: any) => {
    try {
        const users = await UserInfoModel.aggregate([
            {
                $lookup:
                {
                    from: "useraddresses",
                    localField: "email",
                    foreignField: "email",
                    as: "Address"
                }
            }, {
                $project:
                {
                    "Address.email": 0,
                    "Address._id": 0,
                    "Address.address._id": 0
                }
            }
        ])
        res.send(users)
    }
    catch (error) {
        res.send(error)
    }
}));

router.post("/allusers", asyncHandler(async (req: any, res: any) => {


    const { name,age,email,address } = req.body

    const userInfo: UserInfo = {
        name: name,
        age: age,
        email: email
    }
    const userAddress: UserAddressItem = {
        email: email,
        address: address
    };
    try {
        await UserInfoModel.create(userInfo);
        await UserAddressModel.create(userAddress)
        res.send("user created sucessfully")
    } catch (error:any) {
        
        if (error.message.indexOf("11000") != -1) {
            res.send("email is already exist :(")
        } else {
            
            res.send(error)
        }
    }
}))



router.delete("/allusers", asyncHandler(async (req: any, res: any) => {
    try {
        await UserInfoModel.collection.drop();
        await UserAddressModel.collection.drop();
        res.send("all documents delete successfully ")
    } catch (error) {
        res.send(error)
    }
}))



router.get("/:email", asyncHandler(async (req: any, res: any) => {
    const email = req.params.email;
    try {
        const user = await UserInfoModel.aggregate([
            {
                $lookup:
                {
                    from: "useraddresses",
                    localField: "email",
                    foreignField: "email",
                    as: "Address"
                }
            },
            {
                $match: { email }
            },
            {
                $project:
                {
                    "Address.email": 0,
                    "Address._id": 0,
                    "Address.address._id": 0
                }
            }
        ]);
        res.send(user)
    } catch (error) {
        res.send(error)
    }
}))

router.delete("/:email", asyncHandler(async (req: any, res: any) => {
    const email = req.params.email;
    try {
        await UserInfoModel.deleteOne({ email })
        await UserAddressModel.deleteOne({ email })
        res.send(
            `${email} was delted successfully`
        )
    } catch (error) {
        res.send(error)
    }
}))

router.patch("/:email", asyncHandler(async (req: any, res: any) => {

    const email = req.params.email;
    try {

        await UserInfoModel.findOneAndUpdate({ email }, { $set: req.body })
        await UserAddressModel.findOneAndUpdate({ email }, { $set: req.body })
        res.send(email + " was updated")
    } catch (error) {
        res.send(error)
    }

}))
router.put("/:email", asyncHandler(async (req: any, res: any) => {

    const email = req.params.email;
    const { name, age, Newemail } = req.body;
    try {
        await UserInfoModel.findOneAndUpdate({ email }, { name,age,email:Newemail },{overwrite:true})
        await UserAddressModel.findOneAndUpdate({ email }, { address: req.body.address }, { overwrite: true })
        res.send(email + " was replaced with new data")
    } catch (error) {
        res.send(error)
    }

}))
export default router;