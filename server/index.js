const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');


const usersRoute = require("./routes/user.route");
const songRoutes = require("./routes/song.route");
const playListRoutes = require("./routes/playlist.route");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());     
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/userDB", {
dbName: 'userDB',    
useNewUrlParser: true});


app.use("/api/users", usersRoute);
app.use("/api/songs", songRoutes);
app.use("/api/playlists", playListRoutes);


app.listen(3001, () => {console.log("Server running on port 3001")});
