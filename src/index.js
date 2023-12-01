import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import '../node_modules/slim-select/dist/slimselect.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.css';

const optionsContainer = document.querySelector('.breed-select');
const infoContainer = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

function optionsMarkup(data) {
  return data
    .map(item => {
      const { name, id } = item;
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
}

function catMarkup(cat) {
  const {
    url,
    breeds: {
      0: { description, temperament, name },
    },
  } = cat[0];
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

fetchBreeds()
  .then(data => {
    if (Array.isArray(data) && data.length > 0) {
      optionsContainer.innerHTML =
        `<option data-placeholder="true"></option>` + optionsMarkup(data);
      loader.style.visibility = 'hidden'; 
    } else {
      optionsContainer.innerHTML = '';
    }
  })
  .then(() => {
    new SlimSelect({
      select: '#single',
      settings: {
        placeholderText: 'Select a cat',
      },
      events: {
        afterChange: () => {
          infoContainer.style.visibility = 'hidden';
          loader.style.visibility = 'visible'; 
          fetchCatByBreed(optionsContainer.value)
            .then(cat => {
              loader.style.visibility = 'hidden';
              infoContainer.style.visibility = 'visible';
              infoContainer.innerHTML = catMarkup(cat);

              if (cat.length === 0) {
                optionsContainer.innerHTML = '';
                iziToast.error({
                  title: 'Error!',
                  message: 'Oops! Something went wrong while loading breeds.',
                  position: 'topRight',
                });
                return;
              }
            })
            .catch(error => {
              loader.style.visibility = 'hidden'; 
              infoContainer.style.visibility = 'hidden';
              console.error(`Error occurred: ${error}`);
              iziToast.error({
                title: 'Error!',
                message: 'Oops! Something went wrong while loading the cat.',
                position: 'topRight',
              });
            });
        },
      },
    });
  })
  

  