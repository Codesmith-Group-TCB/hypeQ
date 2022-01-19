const express = require('express');

const mediaController = require('../controllers/mediaController');

const router = express.Router();

router.get('/list', mediaController.getList, (req, res) =>
  res.status(200).json(res.locals.media)
);

router.post('/list', mediaController.addMedia, (req, res) =>
  res.status(200).json(res.locals.newList)
);

router.patch('/:media', mediaController.updateMedia, (req, res) =>
  res.status(200).json(res.locals.updatedMedia)
);

// Delete a media from the database
// http://localhost:3000/api/"media_id"
router.delete('/:media', mediaController.deleteMedia, (req, res) => {
  res.status(200).send();
});

module.exports = router;
