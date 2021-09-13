const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-danger" onclick="productDetails('${product.id}')">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
     // console.log(product.price)

  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal()
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200 &&priceConverted > 2) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400 &&priceConverted > 2) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500 &&priceConverted > 2) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
    
  document.getElementById("total").innerText = grandTotal.toFixed();
};

//detais section 
const productDetails=id=>{
  const URL=`https://fakestoreapi.com/products/${id}`
  fetch(URL)
 .then(res=>res.json())
.then(data=>displayDetails(data))
  //console.log(id)
}
productDetails()
const displayDetails=details=>{
  const productDetailsContainer=document.getElementById('product-details')
const card=document.getElementById('card')
 card.innerHTML=`
  
  <img src="${details.image}" class="card-img-top img-fluid" alt="Product Image">
        <div class="card-body">
        <h3>${details.title}</h3>
      <p>Category: ${details.category}</p>
      <h2>Price: $ ${details.price}</h2>
      <button onclick="addToCart(${details.id},${details.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
          <p class="card-text">${details.description}.</p>
        </div>
  
  `
  productDetailsContainer.appendChild(card)
  console.log(details)
}