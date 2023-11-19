import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import '../node_modules/slim-select/dist/slimselect.css';

const optionsContainer = document.querySelector('.breed-select');
const infoContainer = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

function optionsMarkup(data) {
  return data
    .map(item => {
      const { name, reference_image_id } = item;
      return `<option value="${reference_image_id}">${name}</option>`;
    })
    .join('');
}

function catMarkup(cat) {
  const {
    url,
    breeds: {
      0: { description, temperament, name },
    },
  } = cat;
  loader.classList.remove('visible');
    return `<h2>${name}</h2>
  <div class="info-container">
  <img width="500" src="${url}" class="cat-image">
  <div class="text-container">
  <p class="cat-p">${description}</p>
  <p class="cat-p">
  <span class="bold">Temperament: </span>${temperament}</p>
  </div>
  </div>`;
}

loader.classList.add('visible');

fetchBreeds()
  .then(data => {
    console.log(data);
    optionsContainer.innerHTML =
      `<option data-placeholder="true"></option>` + optionsMarkup(data);
  })
  .then(() => {
    new SlimSelect({
      select: '#single',
      settings: {
        placeholderText: 'Select a cat',
      },
      events: {
        afterChange: () => {
          infoContainer.classList.add('invisible');
          loader.classList.remove('invisible');
          fetchCatByBreed(optionsContainer.value)
            .then(cat => (infoContainer.innerHTML = catMarkup(cat)))
            .then(() => {
              loader.classList.add('invisible');
              infoContainer.classList.remove('invisible');
            })
            .catch(error =>
              console.error(`Error occurred: ${error}`)
            );
        },
      },
    });
    loader.classList.add('invisible');
    document.getElementById('single').classList.remove('invisible');
  })
   .catch(error =>
    console.error(`Error occurred: ${error}`)
  );