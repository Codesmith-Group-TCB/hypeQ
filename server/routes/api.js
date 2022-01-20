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
router.post('/list/delete/:imdbid', mediaController.deleteMedia, mediaController.getList, (req, res) => {
  // console.log('req.params.imdbid', req.params.imdbid);
  // console.log('res.locals.test', res.locals.test);
  // console.log('req.params.imdbid', req.params.imdbid);
  return res.status(200).json(res.locals.media);
});

router.get('/watched', (req, res) => {
  res.status(200).json(res.locals.watched);
});

router.post('/watched', (req, res) => {
  res.status(200).json(res.locals.watched);
});

router.delete('/watched', (req, res) => {
  res.status(200).json(res.locals.watched);
});

router.patch('/watched/rank', (req, res) => {
  res.status(200).json();
});
module.exports = router;
