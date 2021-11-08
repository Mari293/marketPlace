const main = document.querySelector('#principal-container');
const btn_cart = document.querySelector('.btn-cart');
const cart = document.querySelector('.cart');
const productsCart = document.querySelector('.productsCart'); 
const seeTotal = document.querySelector('.messageTotal');

const closeModal = document.querySelector('.close');
const openModal = document.querySelector('.new-product');
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal-container');

const addProduct = document.querySelector('.addProduct');
const nameProduct = document.querySelector('#name_product');
const priceProduct = document.querySelector('#price_product');
const descriptionProduct = document.querySelector('#description_product');

cart_products = [];

openModal.addEventListener('click', seeModal);
closeModal.addEventListener('click', hiddenModal);
window.addEventListener('click', closeModalcontainer);
btn_cart.addEventListener('click', seeCart);
addProduct.addEventListener('click', addProducts);

create_Cards()
function seeCart(event){
  event.preventDefault();
  cart.classList.toggle('cart-container');
}

function seeModal(event){
  event.preventDefault();
  modalContainer.style.opacity = "1";
  modalContainer.style.visibility = "visible";
  modal.classList.toggle("modal-close");
}

function hiddenModal(){
  modal.classList.toggle('modal-close');
  setTimeout(function(){
    modalContainer.style.opacity = "0";
    modalContainer.style.visibility = "hidden";
  },850);
}

function closeModalcontainer(event){
  if (event.target==modalContainer){
    modal.classList.toggle("modal-close");
    setTimeout(function(){
    modalContainer.style.opacity = "0";
    modalContainer.style.visibility = "hidden";
  },900);}
}

function addProducts(){
  let id = {id: products.length + 1};
  let name = {name: nameProduct.value};
  let price = {price: priceProduct.value};
  let img = showImg.src;
  let description = {description: descriptionProduct.value};
  let newProduct = Object.assign(id, name, price, img, description);
  products.push(newProduct);
}

function create_Cards() {
  products.forEach(product => {
    const card = document.createElement('div');
    const card_product = document.createElement('div');
    const card_information = document.createElement('div');
    const title_card = document.createElement('h3');
    const img_card = document.createElement('img');
    const description_card = document.createElement('p');
    const price_card = document.createElement('p');
    const btn_card =document.createElement('button');
    
    card.classList.add('card');
    card_product.classList.add('card_product');
    card_information.classList.add('card_information');
    title_card.setAttribute('id', 'h3');
    img_card.setAttribute('id', 'img');
    description_card.classList.add('description_card');
    btn_card.classList.add('btn_card');
    btn_card.setAttribute('id', product.id); 
    btn_card.addEventListener('click', addCart)
    
    title_card.textContent = product.name;
    price_card.textContent = `$${price_product(product.price)}`;
    img_card.src=product.img;
    description_card.textContent = product.description;
    
    btn_card.textContent = "Add";
    
    card.appendChild(card_product);
    card.appendChild(card_information);
    card_product.appendChild(title_card);
    card_product.appendChild(img_card);
    card_product.appendChild(price_card);
    card_information.appendChild(description_card);
    card_information.appendChild(btn_card);
    main.appendChild(card);
  });
}

function price_product(price) {
  let decimal = price.toString().split(".");
  decimal[0] = decimal[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return decimal.join(".");
}

function addCart(event){
  cart_products.push(event.target.getAttribute('id'));
  showCart();
  calculateTotal();
}

function showCart(){
  productsCart.innerHTML = ' ';
  let index = new Set(cart_products);
  index.forEach(product =>{
    const productAttribute = products.filter(element =>{
      return parseInt(product)===element.id;
    })

    let counter = 0;
    for(i of cart_products){
      if (i === product){
        counter+=1;
      }
    }

    const productContainer = document.createElement('div');
    const nameProduct = document.createElement('p');
    const priceProduct = document.createElement('p');
    const imgProduct = document.createElement('img');
    const informationContainer = document.createElement('div');
    const infoImgContainer = document.createElement('div');
    const countContainer = document.createElement('div');
    const imgAdd = document.createElement('img');
    const imgSubtract = document.createElement('img');
    const imgDelete = document.createElement('img');
    const countProduct = document.createElement('p');
    
    productContainer.classList.add('product-container');
    informationContainer.classList.add('information-container');
    infoImgContainer.classList.add('info-img-container');
    nameProduct.classList.add('name-product');
    imgProduct.classList.add('imgProduct');
    countContainer.classList.add('count-container')
    imgAdd.classList.add('icons');
    imgSubtract.classList.add('icons');
    imgDelete.classList.add('icons','trash');
    
    nameProduct.textContent = productAttribute[0].name;
    priceProduct.textContent = `Price: $${price_product(parseInt(productAttribute[0].price) * counter)}`;
    imgProduct.src = productAttribute[0].img;    
    imgAdd.src = 'images/add.png';    
    imgSubtract.src = 'images/subtract.png';    
    imgDelete.src = 'images/trash.png';    
    countProduct.textContent = `Cantidad:${counter}`;
    imgAdd.setAttribute('id', productAttribute[0].id);
    imgSubtract.setAttribute('id', productAttribute[0].id);
    imgDelete.setAttribute('id', productAttribute[0].id);

    imgAdd.addEventListener('click', addCart);
    imgSubtract.addEventListener('click', subtractCart);
    imgDelete.addEventListener('click', deleteProduct);

    productContainer.appendChild(nameProduct);
    productContainer.appendChild(informationContainer);
    informationContainer.appendChild(countContainer);
    informationContainer.appendChild(priceProduct);
    productContainer.appendChild(infoImgContainer);
    infoImgContainer.appendChild(imgProduct);
    infoImgContainer.appendChild(informationContainer);
    countContainer.appendChild(imgSubtract);
    countContainer.appendChild(countProduct);
    countContainer.appendChild(imgAdd);
    productContainer.appendChild(imgDelete);
    productsCart.appendChild(productContainer);
  });
}

function subtractCart(event){
  cart_products.splice(parseInt(cart_products.indexOf(event.target.getAttribute('id'))),1);
  showCart();  
  calculateTotal();
}

function deleteProduct(event){
  cart_products = cart_products.filter(item => {
    return event.target.getAttribute('id') !== item;
  });
  showCart();
  calculateTotal();
}

function calculateTotal(){
  let total = 0;
  cart_products.forEach(product => {
    let allProducts = products.filter(element=>{
      return parseInt(product) === element.id;
    });
    if (allProducts[0].id === parseInt(product)){
      total = total + allProducts[0].price;
    };
    seeTotal.textContent = `Total: $${price_product(total)}`;
  })
}