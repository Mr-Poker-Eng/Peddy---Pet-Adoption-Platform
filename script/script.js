const loadcategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await response.json();
  showCategory(data.categories);
};

const showCategory = (categories) => {
  categories.forEach((element) => {
    // console.log(element)
    const categoryContainer = document.getElementById("category-container");

    const div = document.createElement("div");
    div.innerHTML = `
        <button onclick="loadPets('${element.category}')" class ="btn">${element.category}<img class="w-8" src="${element.category_icon}" alt="category image"></button>
        `;

    categoryContainer.appendChild(div);
  });
};

const loadPets = async (categoryName) => {
    makeHide("status");
    //   console.log(categoryName);
    show("loader");
    show("petsContainer");
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  );
  const data = await response.json();
  if(data.data){
      displayPets(data.data);
      makeHide("loader");
  }
};

const displayPets = (pets) => {
//   console.log(pets);
  if (pets.length < 1) {
    makeHide("petsContainer");
    show("status");
  }

  pets.forEach((pet) => {
    // console.log(pet);
    const petsContainer = document.getElementById("petsContainer");
    petsContainer.innerHTML = "";

    const div = document.createElement("div");
    div.classList.add("mt-5");
    div.innerHTML = `
        <div class="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src="${pet.image}"
      alt="" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${pet.pet_name}</h2>
    <p>${pet.pet_details}</p>
    <div class="card-actions justify-end">
      <button class="btn work bg-green-400">Buy Now</button>
      <button onclick="handleDetails('${pet.petId}')" class="btn details bg-red-400">Details</button>
    </div>
  </div>
</div>
        `;

    petsContainer.appendChild(div);
  });

  const allSelectBtn = document.getElementsByClassName("work");
  for(const button of allSelectBtn){
    button.addEventListener("click", (event) => {
        const title = event.target.parentNode.parentNode.childNodes[1].innerText;
        console.log(title);
        alert("You have selected " + event.target.parentNode.parentNode.childNodes[1].innerText);


        const listContainer = document.getElementById("selected-container");
        const div = document.createElement("div");
        div.classList.add("flex");
        div.innerHTML = `
        <li>${title}</li>
        <button class="delete-btn btn">Delete</button>
        `;
        listContainer.appendChild(div);

        const prevCount = getValueById("itemNumber");
        const newCount = prevCount + 1;
        document.getElementById("itemNumber").innerText = newCount;
    });
  }
};

const makeHide = (id) => {
    document.getElementById(id).style.display = "none";
}

const show = (id) => {
    document.getElementById(id).style.display = "block";
}

const getValueById = (id) => {
    const element = document.getElementById(id).innerText;
    const convertedValue = parseInt(element);
    return convertedValue;
}

const handleDetails = async(petId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await response.json();
    console.log(data.petData);
}

loadPets("cat");
loadcategory();
