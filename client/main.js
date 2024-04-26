let moviesContainer = document.querySelector("#movies-container");
const form = document.querySelector("form");

const baseURL = `http://localhost:4004/api/hike`;

const moviesCallback = ({ data: hikes }) => {
  displayHikes(hikes);
  // console.log({ hikes })
}
const errCallback = (err) => console.log(err.response.data);


const createHike = (body) =>
  axios.post(baseURL, body).then((res) => createHikeCard(res.data));

const deleteHike = (id) =>
  axios.delete(`${baseURL}/${id}`).then((res) => {
    const hikeCard = document.querySelector(`.hike-card[data-hike-id="${id}"]`);
    hikeCard.remove();
    // alert(res.data.message);
  });
// const editHike = (id, type) =>
//   axios.put(`${baseURL}/${id}`, { type }).then(createHikeCard);

const editHike = (id, type) =>
  axios.put(`${baseURL}/${id}`, { type })
    .then(({ data: hike }) => {
      console.log(hike)
      const hikeCard = document.querySelector(`.hike-card[data-hike-id="${id}"]`);
      hikeCard.querySelector('.hike-rating').textContent = `${hike.rating} stars`;
    })
    .catch(errCallback);



const getRandomHikeButton = document.getElementById("getRandomHikeButton");



getRandomHikeButton.addEventListener("click", () => {
  axios.get("http://localhost:4004/api/hike/random")
    .then(response => {
      createHikeCard(response.data);
      // alert(`Random Hike:\nName: ${response.data.name}\nImage URL: ${response.data.imageURL}\nMiles: ${response.data.miles}`);
    })
    .catch(error => {
      console.error("Error fetching random hike:", error);
      // alert("Error fetching random hike. Please try again.");
    });
});

function createHikeFn(e) {
  e.preventDefault();

  let title = document.querySelector("#title");
  let rating = document.querySelector('input[name="ratings"]:checked');
  let imageURL = document.querySelector("#img");
  let miles = document.querySelector("#miles");

  let bodyObj = {
    name: title.value,
    rating: rating.value,
    imageURL: imageURL.value,
    miles: miles.value
  };

  createHike(bodyObj);

  title.value = "";
  rating.checked = false;
  imageURL.value = "";
  miles.value = "";
}

function createHikeCard(hike) {
  const hikeCard = document.createElement("div");
  hikeCard.classList.add("hike-card");
  hikeCard.dataset.hikeId = hike.id;

  hikeCard.innerHTML = `
    <img alt='hike cover' src=${hike.imageURL} class="hike-cover"/>
    <p class="hike-title">${hike.name}</p>
    <p>${hike.miles} Miles</p>
    <div class="btns-container">
        <button onclick="updateHike(${hike.id}, 'minus')">-</button>
        <p class="hike-rating">${hike.rating} stars</p>
        <button onclick="updateHike(${hike.id}, 'plus')">+</button>
    </div>
    <button class="delete-button" onclick="deleteHike(${hike.id})">Remove</button>
  `;

  moviesContainer.appendChild(hikeCard);
}

function displayHikes(arr) {
  // moviesContainer.innerHTML = ``;
  for (let i = 0; i < arr.length; i++) {
    createHikeCard(arr[i]);
  }
  // console.log(arr);
}

form.addEventListener("submit", createHikeFn);


function updateHike(id, type) {
  editHike(id, type);
}