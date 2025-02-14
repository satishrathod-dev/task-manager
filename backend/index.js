const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const connectDB = require('./db/db');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');

connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// app.post('/users', async (req, res) => {
//     try {
//         const {fullname, email, password} = req.body;
//         console.log(fullname);
//         console.log(req.body);

//         const newUser = new userModel({
//             fullname,
//             email,
//             password,
//         });
//         await newUser.save();
//             res.status(201).json({
//                 message: "User created", user: newUser
//             })
//     }
//     catch (err){
//         console.log(err);
//     }
// })

// app.get('/users', async (req, res) => {
//     try {
//         const users = await userModel.find();  // Find all tasks in the database
//         res.status(200).json(users);  // Return the list of tasks
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching users.', error });
//     }
// });

app.get("/", (req, res) => {
    res.send("Hey there!");
})


app.use("/users", userRoutes)

const PORT = process.env.PORT || 8000;

server.listen(8000, () => {
    console.log(`Server is running on port ${PORT}`);
});