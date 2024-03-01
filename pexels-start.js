const MY_URL = "https://api.pexels.com/v1/search?query=";
const MY_KEY = "cyhmXTFnFreB2vEhMOss9ffcFbptfWUypxvqnGXurjolxqwV1WCEQfSg";

const removed = (e) => {
  const deletedCol = e.closest(".col-md-4");
  deletedCol.removed();
};

const createCard = function (photos) {
  const row = document.querySelector(".album .container .row");

  row.innerHTML = "";

  photos.forEach((photo) => {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-md-4");

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "mb-4", "shadow-sm");

    const a = document.createElement("a");
    a.href = `./pexels-details.html?photoId=${photo.id}`;

    const img = document.createElement("img");
    img.src = photo.src.medium;

    img.style = "height: 40vh; width:100%";

    a.appendChild(img);
    cardDiv.appendChild(a);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.innerText = photo.alt;

    const p = document.createElement("p");
    p.classList.add("card-text");
    p.innerText = "";

    const btnDiv = document.createElement("div");
    btnDiv.classList.add("d-flex", "justify-content-between", "align-items-center");

    const btnGroup = document.createElement("div");
    btnGroup.classList.add("btn-group");

    const btnView = document.createElement("button");
    btnView.type = "button";
    btnView.classList.add("btn", "btn-sm", "btn-outline-secondary");
    btnView.innerText = "View";

    const btnHide = document.createElement("button");
    btnHide.type = "button";
    btnHide.classList.add("btn", "btn-sm", "btn-outline-secondary");
    btnHide.innerText = "Hide";

    const small = document.createElement("small");
    small.classList.add("text-muted");
    small.innerText = photo.id;

    btnGroup.appendChild(btnView);
    btnGroup.appendChild(btnHide);
    btnDiv.appendChild(btnGroup);
    btnDiv.appendChild(small);
    cardBody.appendChild(h5);
    cardBody.appendChild(p);
    cardBody.appendChild(btnDiv);
    cardDiv.appendChild(cardBody);
    colDiv.appendChild(cardDiv);
    row.appendChild(colDiv);
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
        throw new Error("Error");
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
  const primaryButton = document.querySelector(".btn-primary");
  primaryButton.addEventListener("click", () => {
    imgCreate("sea");
  });

  const secondaryButton = document.querySelector(".btn-secondary");
  secondaryButton.addEventListener("click", () => {
    imgCreate("dogs");
  });

  const search = document.querySelector(".input-group .form-control");
  const btnSearch = document.getElementById("button-addon2");
  btnSearch.addEventListener("click", () => {
    imgCreate(search.value);
  });
};
