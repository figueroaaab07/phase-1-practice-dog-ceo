// console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", () => {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'

  function renderOneImage(imageUrl) {
    let imgCont = document.createElement('img');
    imgCont.src = imageUrl;
    document.querySelector("#dog-image-container").appendChild(imgCont);
  }

  function getDogImages() {
    fetch(imgUrl)
    .then(res => res.json())
    .then(data => data["message"].forEach(imageUrl => renderOneImage(imageUrl)))
  }

  function breedCb(event) {
    const breedSelected = event.target;
    breedSelected.style.color = "red";
  // console.log(breedSelected.textContent);
  }

  function createDogLi(dogBreed) {
    let breedCont = document.createElement('li');
    breedCont.textContent = dogBreed;
    breedCont.className = dogBreed[0];
    breedCont.addEventListener("click", breedCb);
    document.querySelector("#dog-breeds").appendChild(breedCont);
  }

  function addOneBreed(dogBreed, filter) {
    console.log(filter);
    if (filter === ("--select--")) {
      createDogLi(dogBreed);
    } else if (filter === (dogBreed[0])) {
      createDogLi(dogBreed);
    }
  }

  function getDogList(filter = "--select--") {
    fetch(breedUrl)
    .then(res => res.json())
    .then(data => (Object.keys(data["message"])).forEach(dogBreed => addOneBreed(dogBreed, filter)))
  }

  function createDefaultOption() {
    let selectInitial = document.querySelector("#breed-dropdown");
    // console.log(selectInitial.value);
    let newOption = document.createElement("option");
    newOption.textContent = "--select--";
    newOption.value = "default";
    newOption.selected = true;
    selectInitial.insertAdjacentElement("afterbegin", newOption);
  }

  function getValueSelector() {
    createDefaultOption();
    let selectFinal = document.querySelector("#breed-dropdown");
    selectFinal.addEventListener("click", (event) => {
      document.getElementById("dog-breeds").innerHTML = "";
      let selection = event.target.value;
      // console.log(selection);
      (selection === "default") ? getDogList() : getDogList(selection);
    });
  }

  getDogImages();
  getDogList();
  getValueSelector();

});