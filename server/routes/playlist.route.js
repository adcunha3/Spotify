const express = require('express')
const router = express.Router()
const { PlayList, validate } = require("../models/playlist.model");
const {ObjectId} = require('mongodb');
const { User } = require("../models/user.model");

//Create playlist
router.post("/create", async (req, res) => {

	try {
		const user = await User.findById(req.body.user);

		const playList = await PlayList({
			user: ObjectId(req.body.user), 
			name: req.body.name,
			desc: req.body.desc 
		}).save();

		user.playlists.push(playList._id);
		await user.save();

		res.status(200).send({ message: "Playlist made" });
	} catch(err) {
		res.json({ status: 'error'})
	}

});

//Get list of playlist
router.post("/favourite", async (req, res) => {
	try {
		const user = await User.findById(req.body.user);
		const playlists = await PlayList.find({ _id: user.playlists });
		res.status(200).send({ data: playlists });
	} catch (err) {
		res.json({ status: 'error'})
	}

});

//Edit playlist
router.put('/edit/:id', async (req, res) => {
	const playlist = await PlayList.findById(req.params.id);
	const user = await User.findById(user._id);

	if(user === playlist) {
		playlist.name = req.body.name;
		playlist.desc = req.body.desc;
		await playlist.save();
	}

	res.status(200).send({ message: "Updated successfully" });
});

//Delete playlist
router.delete('/:id', async (req, res) => {
	const user = await User.findById(req.user._id);
	const playlist = await PlayList.findById(req.params.id);

	const index = user.playlists.indexOf(req.params.id);
	user.playlists.splice(index, 1);
	await user.save();
	await playlist.remove();
	res.status(200).send({ message: "Removed from library" });
})

//Add song
router.put('/add-song', async (req, res) => {
	const user = await User.findById(req.user._id);
	const playlist = await PlayList.findById(req.params.id);
})

module.exports = router;