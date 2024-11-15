
const apiKey = 't9ntYw8H6xKj4SnzMPZ4zBnQXvGazJNeIbn-kj4WCZo'; 
const searchBtn = document.getElementById('searchBtn');
const showMoreBtn = document.getElementById('showMoreBtn');
const imageGallery = document.getElementById('imageGallery');
const loadingIndicator = document.getElementById('loadingIndicator');
let searchQuery = '';
let page = 1;


async function fetchImages() {
    try {
        loadingIndicator.classList.remove('hidden');
        const response = await fetch(
            `https://api.unsplash.com/search/photos?page=${page}&query=${searchQuery}&client_id=${apiKey}&per_page=10`
        );
        const data = await response.json();
        if (page === 1) imageGallery.innerHTML = ''; 
        displayImages(data.results);
        loadingIndicator.classList.add('hidden');
        showMoreBtn.classList.remove('hidden');
    } catch (error) {
        console.error('Error fetching images:', error);
        loadingIndicator.classList.add('hidden');
    }
}


function displayImages(images) {
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.urls.small;
        imgElement.alt = image.alt_description;
        imgElement.title = 'Click to preview';
        imgElement.classList.add('thumbnail');
        imgElement.addEventListener('click', () => showImageModal(image.urls.full));
        imageGallery.appendChild(imgElement);
    });
}


searchBtn.addEventListener('click', () => {
    searchQuery = document.getElementById('searchInput').value;
    if (searchQuery) {
        page = 1;
        fetchImages();
    }
});


showMoreBtn.addEventListener('click', () => {
    page++;
    fetchImages();
});


function showImageModal(imageUrl) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `<img src="${imageUrl}" alt="Full view"><span class="close">&times;</span>`;
    document.body.appendChild(modal);

    modal.querySelector('.close').onclick = () => document.body.removeChild(modal);
}

