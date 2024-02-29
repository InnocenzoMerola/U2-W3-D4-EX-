const MY_URL = "https://api.pexels.com/v1/search?query=";
const MY_KEY = "cyhmXTFnFreB2vEhMOss9ffcFbptfWUypxvqnGXurjolxqwV1WCEQfSg";

const createCard = function (photos) {
  let album = document.querySelector(".album");
  let container = document.querySelector(".container");
  let row = document.querySelector(".row");

  row.innerHTML = "";

  photos.forEach((photo) => {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-md-4");

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "mb-4", "shadow-sm");

    const a = document.createElement("a");
    a.href = `./pexels-details.html?photoId=${photo.id}`;

    const img = document.createElement("img");
    img.src = photo.src.small;
    img.style.width = "100%";

    a.appendChild(img);
    cardDiv.appendChild(a);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const h5_a = document.createElement("a");
    h5_a.href = `./pexels-details.html?photoId=${photo.id}`;
    const h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.textContent = "Photo By";
    h5_a.appendChild(h5);

    const p = document.createElement("p");
    p.classList.add("card-text");
    p.textContent = "";

    const btnDiv = document.createElement("div");
    btnDiv.classList.add("d-flex", "justify-content-between", "align-items-center");

    const btnGroup = document.createElement("div");
    btnGroup.classList.add("btn-group");

    const btnView = document.createElement("button");
    btnView.type = "button";
    btnView.classList.add("btn", "btn-sm", "btn-outline-secondary");
    btnView.textContent = "View";

    const btnHide = document.createElement("button");
    btnHide.type = "button";
    btnHide.classList.add("btn", "btn-sm", "btn-outline-secondary");
    btnHide.textContent = "Hide";

    const small = document.createElement("small");
    small.classList.add("text-muted");
    small.textContent = photo.id;

    btnGroup.appendChild(btnView);
    btnGroup.appendChild(btnHide);
    btnDiv.appendChild(btnGroup);
    cardBody.appendChild(h5_a);
    cardBody.appendChild(p);
    cardBody.appendChild(btnDiv);
    cardBody.appendChild(small);
    cardDiv.appendChild(cardBody);
    colDiv.appendChild(cardDiv);
    row.appendChild(colDiv);
    container.appendChild(row);
    album.appendChild(container);
  });
};

const imgCreate = function (query) {
  fetch(MY_URL + query, {
    headers: {
      authorization: MY_KEY,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error getting the images");
      }
    })
    .then((data) => {
      console.log(data);
      createCard(data.photos);
    })
    .catch((error) => {
      console.log(error);
    });
};

window.onload = function () {
  let primaryButton = document.querySelector(".btn-primary");
  primaryButton.addEventListener("click", () => {
    imgCreate("nature");
  });

  let secondaryButton = document.querySelector(".btn-secondary");
  secondaryButton.addEventListener("click", () => {
    imgCreate("dog");
  });
};
