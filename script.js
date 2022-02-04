const imgContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader');

let ready = false;
let imagesLoaded = 0;
let photoArray = [];
let count = 15;

function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === photoArray.length - 6) {
		ready = true;
		loader.hidden = true;
		imagesLoaded = 0;
	}
}

function displayPhotos() {
	photoArray.forEach((photo) => {
		let image = document.createElement('img');
		image.setAttribute('src', photo.url);
		image.setAttribute('alt', 'cat photo');
		imgContainer.appendChild(image);
		image.addEventListener('load', imageLoaded);
	});
}

let url = `https://api.thecatapi.com/v1/images/search?limit=${count}&random&order=Desc`;
// Get photos
async function getPhotos() {
	try {
		const response = await fetch(url);
		photoArray = await response.json();
		displayPhotos();
	} catch (err) {
		console.error(err);
	}
}

// Check to see if scroll is at bottom of page.
window.addEventListener('scroll', function (e) {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
		ready
	) {
		getPhotos();
		ready = false;
	}
});

getPhotos();


