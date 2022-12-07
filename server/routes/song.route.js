const express = require('express')
const router = express.Router()
const { PlayList } = require("../models/playlist.model");
const {ObjectId} = require('mongodb');
const mongoose = require('mongoose');
const db = mongoose.connection;


// add song to playlist
router.post("/add-song", async (req, res) => {

	try {
		const playlist = await PlayList.findById(ObjectId(req.body.playlistid));
		const song = await db.collection('songs').findOne({track_title: req.body.track_title});


		if (!playlist.songs.includes(req.body.track_title)) {
			playlist.songs.push(song._id);
		}
		await playlist.save();
		res.status(200).send({ data: playlist, message: "Added to playlist" });
		
	} catch(err) {
		res.json({ status: 'error'});
	}
});

// get song id
// router.get("/:id", async (req, res) => {
// 	try {
// 		const song = await db.collection('songs').findOne({track_title: req.params.id});
// 		res.status(200).send({ data: song[0]._id});
// 	} catch (err) {
// 		res.json({ status: 'error'})
// 	}

// });

// remove song from playlist
router.delete("/:id", async (req, res) => {

    try{
        
        const user = await User.findById(req.user._id);
        const playlist = await PlayList.findById(req.body.playlistId);

    
        const index = playlist.songs.indexOf(req.body.songId);
        playlist.songs.splice(index, 1);
        await playlist.save();
        res.status(200).send({ data: playlist, message: "Removed from playlist" });

    } catch(err) {
		res.json({ status: 'error'});
	}

});

module.exports = router;