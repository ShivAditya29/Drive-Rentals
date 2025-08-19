const container = document.getElementById("products-cards-container");
const valuesCards = [
  {
    image: "./images/bike1.jpg",
    title: "Royal Enfield",
    content: "super content 1",
    model: "2018",
    cost: "Rs 11 per km",
    features: "Tubeless, Dual Channel, Dual Disc",
  },
  {
    image: "./images/bike2.jpg",
    title: "TVS Apache",
    content: "super content 2",
    model: "2019",
    cost: "Rs 19 per km",
    features: "Tubeless, Dual Channel, Single Disc",
  },
  {
    image: "./images/bike3.jpg",
    title: "Bajaj Pulsar",
    content: "blablablablbalbalbabla blablaba",
    model: "2009",
    cost: "Rs 9 per km",
    features: "Tubeless, Dual Channel, Dual Disc",
  },
  {
    image: "./images/bike4.jpg",
    title: "Hero Spendor",
    content: "blablablablbalbalbabla blablaba",
    model: "2020",
    cost: "Rs 11 per km",
    features: "Tubeless, Dual Channel, Dual Disc",
  },
  {
    image: "./images/bike5.jpg",
    title: "TVS Jupiter",
    content: "blablablablbalbalbabla blablaba",
    model: "2011",
    cost: "Rs 18 per km",
    features: "Tubeless, Dual Channel, Dual Disc",
  },
];

function returnCards(valuesCards) {
  return (
    valuesCards
      .map(
        (valuesCard) => `
        <div
          class="col-lg-4 d-flex justify-content-center align-items-center flex-column" style="margin-top: 20px;"
        >
  <div class="card" style="width: 25rem;">
  <img src="${valuesCard.image}" class="card-img-top" alt="..." width="500" height="250">
  <div class="card-body">
    <h5 class="card-title">${valuesCard.title}</h5>
    <p class="card-text">${valuesCard.content}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Model: ${valuesCard.model}</li>
    <li class="list-group-item">Cost: ${valuesCard.cost}</li>
    <li class="list-group-item">Features: ${valuesCard.features}</li>
  </ul>
  <div class="card-body">
     <a href="/buybike" class="btn btn-primary">Book Now</a>
  </div>
</div>
</div>
<br/>`
      )
      .join("") + "</div>"
  );
}

container.innerHTML = returnCards(valuesCards);
