Get all user data 

http://localhost:3000/api/users/allusers

Create new user 

http://localhost:3000/api/users/allusers

payload
    {
        name:string,
        age:number,
        email:string,
        address:[
            {
                street:string,
                city:string
            }
        ]
    }

DELETE all user data
http://localhost:3000/api/users/allusers


Get user by email
http://localhost:3000/api/users/:email

Replace (put) user with new document
http://localhost:3000/api/users/:email

update (patch) user with new values
http://localhost:3000/api/users/:email


