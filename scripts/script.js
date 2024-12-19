const container = document.querySelector('.grid');
const apiKey = 'Id7ZnvcbuagCH5xt4V02lWUJAj4kCakcxGrbfEDiROH4zpHyC8DUI0Oa';
let page = 1;
const query = 'islamic art';
const perPage = 50;

function loadImages() {
  const URL = `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${page}`;

  fetch(URL, {
    headers: {
      Authorization: apiKey
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.photos && data.photos.length > 0) {
        data.photos.forEach(photo => {
          const img = document.createElement('img');
          img.src = photo.src.medium;
          img.alt = photo.photographer;
          container.appendChild(img);
        });
      }
    })
    .catch(error => {
      console.error('Error fetching images from Pexels:', error);
    });

  page++;
}

loadImages();

window.addEventListener('scroll', () => {
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
    loadImages();
  }
});



const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
  const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
  hamburger.setAttribute('aria-expanded', !expanded);
});

// filter code


function loadImages() {
  const URL = `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${page}`;

  fetch(URL, {
    headers: {
      Authorization: apiKey
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.photos && data.photos.length > 0) {
        data.photos.forEach(photo => {
        
          const gridItem = document.createElement('div');
          gridItem.classList.add('grid-item');

          const img = document.createElement('img');
          img.src = photo.src.medium;
          img.alt = photo.photographer;

          const categories = ['pottery', 'islamic', 'tapestry', 'glass'];
          const randomCategory =
            categories[Math.floor(Math.random() * categories.length)];
          img.setAttribute('data-category', randomCategory);

          gridItem.appendChild(img);
          container.appendChild(gridItem);
        });
      }
    })
    .catch(error => {
      console.error('Error fetching images from Pexels:', error);
    });

  page++;
}


document.querySelectorAll('.filter-button').forEach(button => {
  button.addEventListener('click', () => {
    const selectedFilter = button.getAttribute('data-filter');

    document.querySelectorAll('.grid img').forEach(img => {
      const gridItem = img.parentElement;

      if (selectedFilter === 'all' || img.dataset.category === selectedFilter) {
        gridItem.classList.remove('filtered');
      } else {
        if (!gridItem.querySelector('.overlay')) {
          const overlay = document.createElement('div');
          overlay.classList.add('overlay');
          gridItem.appendChild(overlay);
        }
        gridItem.classList.add('filtered');
      }
    });
  });
});

