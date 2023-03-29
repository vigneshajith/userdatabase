import { connect } from 'mongoose'

export const dbConnect = () => {
    // For mongodb Atlas
    connect(process.env.MONGO_URL!).then(
        () => console.log("mongodb connected"),
        (err) => console.log(err)
    )
//     For mongodb local
//     connect("mongodb://127.0.0.1:27017").then(
//         () => console.log("mongodb connected"),
//         (err) => console.log(err)
//     )
    
}
