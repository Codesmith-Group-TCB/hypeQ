// grab database from models folder
const db = require('../models/userModels');

const mediaController = {};

// get all media activities for user_id
mediaController.getList = (req, res, next) => {
  // const id = req.query.user_id; // when we have more than one user
  const query = 'SELECT * FROM media;';
  db.query(query)
    .then((result) => {
      res.locals.media = result.rows;
      return next();
    })
    .catch((e) => {
      console.log('error at mediaController.getList', e);
      return next({
        log: 'Express error handler caught in getList middleware error',
        message: { err: 'An error occurred in getList middleware error' },
      });
    });
};

mediaController.addMedia = (req, res, next) => {
  // const user_id = req.query.user_id;
  const query =
    'INSERT INTO media (imdbid, title, year, rated, released,runtime,genre,plot,poster, rank) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);';

  const data = [
    req.body.imdbid,
    req.body.title,
    req.body.year,
    req.body.rated,
    req.body.released,
    req.body.runtime,
    req.body.genre,
    req.body.plot,
    req.body.poster,
    0,
  ];

  db.query(query, data)
    .then((data) => {
      db.query('SELECT * FROM media;')
        .then((data) => {
          res.locals.newMedia = data.rows;
          return next();
        })
        .catch((e) => {
          console.log('error at mediaController.addMedia.GET', e);
          return next({
            log: 'Express error handler caught in addMedia.GET middleware error',
            message: {
              err: 'An error occurred in addMedia.GET middleware error',
            },
          });
        });
    })
    .catch((e) => {
      console.log('error at mediaController.addMedia', e);
      return next({
        log: 'Express error handler caught in addMedia middleware error',
        message: { err: 'An error occurred in addMedia middleware error' },
      });
    });
};

mediaController.deleteMedia = (req, res, next) => {
  const query = 'DELETE FROM media WHERE imdbid = $1;';

  db.query(query, [req.body.imdbid])
    .then(() => {
      db.query('SELECT * FROM media;')
        .then((data) => {
          res.locals.newMedia = data.rows;
          return next();
        })
        .catch((e) => {
          console.log('error at mediaController.deleteMedia.GET', e);
          return next({
            log: 'Express error handler caught in deleteMedia.GET middleware error',
            message: {
              err: 'An error occurred in deleteMedia.GET middleware error',
            },
          });
        });
    })
    .catch((e) => {
      console.log('error at mediaController.deleteMedia', e);
      return next({
        log: 'Express error handler caught in deleteMedia middleware error',
        message: { err: 'An error occurred in deleteMedia middleware error' },
      });
    });
};

module.exports = mediaController;
