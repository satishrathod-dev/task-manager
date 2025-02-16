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
const taskRoutes = require('./routes/tasks.routes')

connectDB();

const corsOptions = {
    origin: ['http://localhost:3000'], 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
};
app.use(cors(corsOptions));

// app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
    res.send("Hey there!");
})


app.use("/api", userRoutes)
app.use("/api", taskRoutes)

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
