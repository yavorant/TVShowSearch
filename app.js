// URL: /search/shows?q=:query
// Example: https://api.tvmaze.com/search/shows?q=girls

const form = document.querySelector('#searchForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  // console.dir(form);
  console.log(form.elements.query.value);
  const searchTerm = form.elements.query.value;
  // ****************************************************************
  // const res = await axios.get(
  //   `https://api.tvmaze.com/search/shows?q=${searchTerm}`
  // );
  // the same as but we could add more parameters to query:
  const config = { params: { q: searchTerm } };
  const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);

  // *******************************************************************
  // console.log(res.data[0].show.image.medium);
  // to separate function makeImages next code to loop over array res.data:
  // const img = document.createElement('IMG');
  // img.src = res.data[0].show.image.medium;
  // document.body.append(img);
  makeImages(res.data);
  form.elements.query.value = '';
  const btnClear = document.getElementById('clear');
  btnClear.addEventListener('click', deleteImages);
});

const makeImages = (shows) => {
  for (const result of shows) {
    // console.log(result);
    if (result.show.image) {
      //otherwise we ignore it
      const img = document.createElement('IMG');
      img.src = result.show.image.medium;
      document.body.append(img);
    }
  }
};

const deleteImages = () => {
  const images = document.querySelectorAll('img');
  for (let img of images) {
    img.remove();
  }
};
