
let UserName = document.getElementById("UserName");
const user = JSON.parse(sessionStorage.getItem("user"));
UserName.innerText = `Hello, ${user.name}`;
let logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click",()=>{
    sessionStorage.clear();
})
let myImages = [
    "./assets/images/slide1.png",
    "./assets/images/slide2.png",

  ];
let SliderImg = document.getElementById("SliderImg");

let imgIndex = 0;
function slideLeft() {
    imgIndex++;
  if (imgIndex >= myImages.length) {
    imgIndex = 0;
  }
  SliderImg.setAttribute("src", myImages[imgIndex]);
}
function slideRight() {
    imgIndex--;
  if (imgIndex < 0) {
    imgIndex = (myImages.length)-1;
  }
  SliderImg.setAttribute("src", myImages[imgIndex]);
}
function autoSlide() {
    imgIndex++;
    if (imgIndex >= myImages.length) {
        imgIndex = 0;
    }
    SliderImg.setAttribute("src", myImages[imgIndex]);
}
let intervalImg = setInterval(autoSlide, 3000);
document.querySelector('.slider-container').addEventListener('mouseenter', () => {
    clearInterval(intervalImg);
});

document.querySelector('.slider-container').addEventListener('mouseleave', () => {
    intervalImg = setInterval(autoSlide, 3000);
});

let allBtn = document.getElementById("all");
let clothesBtn = document.getElementById("clothes");
let makeupBtn = document.getElementById("makeup");
let phonesBtn = document.getElementById("phones");
let products = document.getElementById("products");

let productsArr = [{ ID:1, name: "Jacket", price: 150, category: "Clothes", img:"./assets/images/jacket.jpg"},
  { ID:2, name: "jeans", price: 80, category: "Clothes", img:"./assets/images/jeans.jpg"},
  { ID:3, name: "Sweetshirt", price: 100, category: "Clothes", img:"./assets/images/sweetshirt.jpg"},
  { ID:4, name: "Shirt", price: 90, category: "Clothes", img:"./assets/images/shirt.jpg"},
  { ID:5, name: "Lipstick", price: 160, category: "Makeup", img:"./assets/images/lipstick.jpg"},
  { ID:6, name: "Hair Mask", price: 25, category: "Makeup", img:"./assets/images/hairmask.jpg"},
  { ID:7, name: "Mascara", price: 80, category: "Makeup", img:"./assets/images/mascara.jpg"},
  { ID:8, name: "Eyeshadow", price: 30, category: "Makeup", img:"./assets/products/Eyeshadow Palette.jpg"},
  { ID:9, name: "IPhone 16", price: 1000, category: "Phones", img:"./assets/images/iPhone16.jpg"},
  { ID:10, name: "Samsung Galaxy S23", price: 900, category: "Phones", img:"./assets/products/Samsung Galaxy S23.jpg"},
  { ID:11, name: "Google Pixel 7", price: 800, category: "Phones", img:"./assets/products/Google Pixel 7.jpg"},
  { ID:12, name: "OnePlus 11", price: 730, category: "Phones", img:"./assets/products/OnePlus 11.jpg"}];

  function showMessage() {
      let message = document.getElementById("successMessage");
      message.style.display = "block"; 
      message.style.opacity = 1;
  
      setTimeout(() => {
          message.style.opacity = 0;
          setTimeout(() => {
              message.style.display = "none";
          }, 500); 
      }, 3000);
  }

  function addToCart(product) {
      let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      const existingItem = cart.find(item => item.ID === product.ID);
      
      if (existingItem) {
          existingItem.quantity += 1;
      } else {
          cart.push({ ...product, quantity: 1 });
      }
      sessionStorage.setItem("cart", JSON.stringify(cart));
      showMessage();
  }
  function viewDeatils(product){
      window.sessionStorage.setItem("product",JSON.stringify(product));
      window.location.href = "productView.html";
  }
  
window.onload = function () {
  allBtn.style.backgroundColor = "rgb(219, 68, 68)";
  allBtn.style.color = "white";
  productsArr.forEach((value,index,arr)=>{
      let cards = document.createElement("div");
      cards.classList.add("col-lg-4","col-md-6","col-sm-12","CradsAlign");
      cards.innerHTML = `
                <div class="card m-0 p-0 mt-5" id="productCard" style="width: 18rem;">
                  <img src="${value.img}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h2 class="card-title ">${value.name}</h2>
                    <p class="card-text fw-bolder h5 mt-4">Price: ${value.price}$</p>
                    <div class="mt-4 container-fluid" id="cardBtns">
                      <a href="#" class="btn viewDetails" data-id="${value.ID}"><i class="bi bi-eye-fill" id="eye"></i></a>
                      <a href="#" class="btn btn-success AddToCart" data-id="${value.ID}"><i class="bi bi-plus-lg " id="plus"></i></a>
                    </div>
                  </div>
                </div>`;
                
              products.appendChild(cards);
  })
  document.querySelectorAll(".AddToCart").forEach(button => {
      button.addEventListener("click", (e) => {
          e.preventDefault();
          const productId = parseInt(e.target.closest("a").dataset.id);
          const selectedProduct = productsArr.find(product => product.ID === productId);
          if (selectedProduct) {
              addToCart(selectedProduct);
          }
      });
  });
  document.querySelectorAll(".viewDetails").forEach(button => {
      button.addEventListener("click", (e) => {
          e.preventDefault();
          const productId = parseInt(e.target.closest("a").dataset.id);
          const selectedProduct = productsArr.find(product => product.ID === productId);
          if (selectedProduct) {
              viewDeatils(selectedProduct);
          }
      });
  });
};
allBtn.addEventListener("click",(e)=>{
  e.preventDefault();
  products.innerHTML="";
  allBtn.style.backgroundColor = "rgb(219, 68, 68)";
  allBtn.style.color = "white";
  clothesBtn.style.backgroundColor = "white";
  clothesBtn.style.color = "blue";
  makeupBtn.style.backgroundColor = "white";
  makeupBtn.style.color = "blue";  
  phonesBtn.style.backgroundColor = "white";
  phonesBtn.style.color = "blue";  
  productsArr.forEach((value,index,arr)=>{
      console.log(value.name);
      console.log(value.img);
      let cards = document.createElement("div");
      cards.classList.add("col-lg-4","col-md-6","col-sm-12","CradsAlign");
      cards.innerHTML = `
                <div class="card m-0 p-0 mt-5" id="productCard" style="width: 18rem;">
                  <img src="${value.img}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h2 class="card-title ">${value.name}</h2>
                    <p class="card-text fw-bolder h5 mt-4">Price: ${value.price}$</p>
                    <div class="mt-4 container-fluid" id="cardBtns">
                      <a href="#" class="btn viewDetails" data-id="${value.ID}"><i class="bi bi-eye-fill" id="eye"></i></a>
                      <a href="#" class="btn btn-success AddToCart" data-id="${value.ID}"><i class="bi bi-plus-lg " id="plus"></i></a>
                    </div>
                  </div>
                </div>`;
              
              products.appendChild(cards);
  })
  document.querySelectorAll(".AddToCart").forEach(button => {
      button.addEventListener("click", (e) => {
          e.preventDefault();
          const productId = parseInt(e.target.closest("a").dataset.id);
          const selectedProduct = productsArr.find(product => product.ID === productId);
          addToCart(selectedProduct);
      });
  });
  document.querySelectorAll(".viewDetails").forEach(button => {
      button.addEventListener("click", (e) => {
          e.preventDefault();
          const productId = parseInt(e.target.closest("a").dataset.id);
          const selectedProduct = productsArr.find(product => product.ID === productId);
          if (selectedProduct) {
              viewDeatils(selectedProduct);
          }
      });
  });
})
clothesBtn.addEventListener("click",(e)=>{
  e.preventDefault();
  products.innerHTML="";
  clothesBtn.style.backgroundColor = "rgb(219, 68, 68)";
  clothesBtn.style.color = "white";
  allBtn.style.backgroundColor = "white";
  allBtn.style.color = "blue";
  makeupBtn.style.backgroundColor = "white";
  makeupBtn.style.color = "blue";  
  phonesBtn.style.backgroundColor = "white";
  phonesBtn.style.color = "blue";  
  const clothesProducts = productsArr.filter(product => product.category === "Clothes");
  clothesProducts.forEach((value,index,arr)=>{
      console.log(value.name);
      console.log(value.img);
      let cards = document.createElement("div");
      cards.classList.add("col-lg-4","col-md-6","col-sm-12","CradsAlign");
      cards.innerHTML = `
                <div class="card m-0 p-0 mt-5" id="productCard" style="width: 18rem;">
                  <img src="${value.img}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h2 class="card-title ">${value.name}</h2>
                    <p class="card-text fw-bolder h5 mt-4">Price: ${value.price}$</p>
                    <div class="mt-4 container-fluid" id="cardBtns">
                      <a href="#" class="btn viewDetails" data-id="${value.ID}"><i class="bi bi-eye-fill" id="eye"></i></a>
                      <a href="#" class="btn btn-success AddToCart" data-id="${value.ID}"><i class="bi bi-plus-lg " id="plus"></i></a>
                    </div>
                  </div>
                </div>`;
                
              products.appendChild(cards);
  })
  document.querySelectorAll(".AddToCart").forEach(button => {
      button.addEventListener("click", (e) => {
          e.preventDefault();
          const productId = parseInt(e.target.closest("a").dataset.id);
          const selectedProduct = productsArr.find(product => product.ID === productId);
          addToCart(selectedProduct);
      });
  });
  document.querySelectorAll(".viewDetails").forEach(button => {
      button.addEventListener("click", (e) => {
          e.preventDefault();
          const productId = parseInt(e.target.closest("a").dataset.id);
          const selectedProduct = productsArr.find(product => product.ID === productId);
          if (selectedProduct) {
              viewDeatils(selectedProduct);
          }
      });
  });
})
phonesBtn.addEventListener("click",(e)=>{
  e.preventDefault();
  products.innerHTML="";
  phonesBtn.style.backgroundColor = "rgb(219, 68, 68)";
  phonesBtn.style.color = "white";
  allBtn.style.backgroundColor = "white";
  allBtn.style.color = "blue";
  clothesBtn.style.backgroundColor = "white";
  clothesBtn.style.color = "blue";  
  makeupBtn.style.backgroundColor = "white";
  makeupBtn.style.color = "blue";  
  const PhonesProducts = productsArr.filter(product => product.category === "Phones");
  PhonesProducts.forEach((value,index,arr)=>{
      console.log(value.name);
      console.log(value.img);
      let cards = document.createElement("div");
      cards.classList.add("col-lg-4","col-md-6","col-sm-12","CradsAlign");
      cards.innerHTML = `
                <div class="card m-0 p-0 mt-5" id="productCard" style="width: 18rem;">
                  <img src="${value.img}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h2 class="card-title ">${value.name}</h2>
                    <p class="card-text fw-bolder h5 mt-4">Price: ${value.price}$</p>
                    <div class="mt-4 container-fluid" id="cardBtns">
                      <a href="#" class="btn viewDetails" data-id="${value.ID}"><i class="bi bi-eye-fill" id="eye"></i></a>
                      <a href="#" class="btn btn-success AddToCart" data-id="${value.ID}"><i class="bi bi-plus-lg " id="plus"></i></a>
                    </div>
                  </div>
                </div>`;
                
              products.appendChild(cards);
  })
  document.querySelectorAll(".AddToCart").forEach(button => {
      button.addEventListener("click", (e) => {
          e.preventDefault();
          const productId = parseInt(e.target.closest("a").dataset.id);
          const selectedProduct = productsArr.find(product => product.ID === productId);
          addToCart(selectedProduct);
      });
  });
  document.querySelectorAll(".viewDetails").forEach(button => {
      button.addEventListener("click", (e) => {
          e.preventDefault();
          const productId = parseInt(e.target.closest("a").dataset.id);
          const selectedProduct = productsArr.find(product => product.ID === productId);
          if (selectedProduct) {
              viewDeatils(selectedProduct);
          }
      });
  });
})

makeupBtn.addEventListener("click",(e)=>{
  e.preventDefault();
  products.innerHTML="";
  makeupBtn.style.backgroundColor = "rgb(219, 68, 68)";
  makeupBtn.style.color = "white";
  allBtn.style.backgroundColor = "white";
  allBtn.style.color = "blue";
  clothesBtn.style.backgroundColor = "white";
  clothesBtn.style.color = "blue";  
  phonesBtn.style.backgroundColor = "white";
  phonesBtn.style.color = "blue";  
  const MakeupProducts = productsArr.filter(product => product.category === "Makeup");
  MakeupProducts.forEach((value,index,arr)=>{
      console.log(value.name);
      console.log(value.img);
      let cards = document.createElement("div");
      cards.classList.add("col-lg-4","col-md-6","col-sm-12","CradsAlign");
      cards.innerHTML = `
                <div class="card m-0 p-0 mt-5" id="productCard" style="width: 18rem;">
                  <img src="${value.img}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h2 class="card-title ">${value.name}</h2>
                    <p class="card-text fw-bolder h5 mt-4">Price: ${value.price}$</p>
                    <div class="mt-4 container-fluid" id="cardBtns">
                      <a href="#" class="btn viewDetails" data-id="${value.ID}"><i class="bi bi-eye-fill" id="eye"></i></a>
                      <a href="#" class="btn btn-success AddToCart" data-id="${value.ID}"><i class="bi bi-plus-lg " id="plus"></i></a>
                    </div>
                  </div>
                </div>`;
                
              products.appendChild(cards);
  })
  document.querySelectorAll(".AddToCart").forEach(button => {
      button.addEventListener("click", (e) => {
          e.preventDefault();
          const productId = parseInt(e.target.closest("a").dataset.id);
          const selectedProduct = productsArr.find(product => product.ID === productId);
          addToCart(selectedProduct);
      });
  });
  document.querySelectorAll(".viewDetails").forEach(button => {
      button.addEventListener("click", (e) => {
          e.preventDefault();
          const productId = parseInt(e.target.closest("a").dataset.id);
          const selectedProduct = productsArr.find(product => product.ID === productId);
          if (selectedProduct) {
              viewDeatils(selectedProduct);
          }
      });
  });
})




let goTop = document.getElementById("goTop");

window.onscroll = function () {
  if (document.documentElement.scrollTop > 200) {
      goTop.style.display = "block";
  } else {
      goTop.style.display = "none";
  }
};
goTop.addEventListener("click",()=>{
  window.scrollTo({ top: 0, behavior: "smooth" });
})