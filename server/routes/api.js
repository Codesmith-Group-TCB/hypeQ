const express = require('express');

const mediaController = require('../controllers/mediaController');

const router = express.Router();

router.get('/list', mediaController.getList, (req, res) => {
  res.status(200).json(res.locals.media);
});

router.post(
  '/list',
  mediaController.addMedia,
  mediaController.getList,
  (req, res) => {
    return res.status(200).json(res.locals.media);
  }
);
// Delete a media from the database
// http://localhost:3000/api/"media_id"
router.post(
  '/list/delete/:imdbid',
  mediaController.deleteMedia,
  mediaController.getList,
  (req, res) => {
    res.status(200).json(res.locals.media);
  }
);

router.get('/watched', mediaController.getWatched, (req, res) => {
  res.status(200).json(res.locals.watched);
});

router.post(
  '/watched',
  mediaController.addWatched,
  mediaController.getWatched,
  (req, res) => {
    res.status(200).json(res.locals.watched);
  }
);

router.delete(
  '/watched/delete/:imdbid',
  mediaController.deleteWatched,
  mediaController.getWatched,
  (req, res) => {
    res.status(200).json(res.locals.watched);
  }
);

router.post('/watched/rank', mediaController.updateRank, (req, res) => {
  res.status(200).json(res.locals.rank);
});
module.exports = router;
