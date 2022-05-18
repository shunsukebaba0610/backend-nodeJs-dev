const express = require("express");
const threadModel = require('../model/thread');
const router = express.Router();

router.use(express.json());

//データの取得
router.get("/api/v1/threads", async(req, res) => {
	//データベースの中身を全て返す
	const allThreads = await threadModel.find({});
	try{
		res.status(200).json(allThreads);
		//res.send(threads);
	} catch(err){
		res.status(500).send(err);
	}
})

//データの作成
router.post("/api/v1/thread", async(req, res) => {
	const createThread = await threadModel.create(req.body);
	try{
		res.status(200).json(createThread);
		//res.send(threads);
	} catch(err){
		res.status(500).send(err);
	}
});

module.exports = router;
