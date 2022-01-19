function addToDb() {
  // const body = {
  //   imdbid: props.imdbid,
  //   title: props.title,
  //   year: props.year,
  //   rated: props.rated,
  //   released: props.released,
  //   runtime: props.runtime,
  //   genre: props.genre,
  //   plot: props.plot,
  //   poster: props.poster,
  // };
  const body = {
    imdbid: 1,
    title: 'title',
    year: 'year',
    rated: 'props.rated',
    released: 'props.released',
    runtime: 'props.runtime',
    genre: 'props.genre',
    plot: 'props.plot',
    poster: 'props.poster',
  };

  addMediaToDb(body).then((res) => {
    console.log(res);
    console.log('media was added');
  });
}