const ol = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!')); // AQUI ESTÁ O BOTÃO!!
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
// Requisito 4: LocalStorage
const gettingItem = () => {
  ol.innerHTML = localStorage.getItem('cartItems');
};

// Requisito 5: soma

const totalPrice = async () => {
  let sum = 0;
  const gettingPrice = document.querySelector('.total-price');
  const lis = document.querySelectorAll('.cart__item'); // [li .cart__item, li cart__item]
  lis.forEach((li) => {
    const unit = li.innerText.split(' '); 
    const gettingNumber = unit[unit.length - 1]; // string
    const price = gettingNumber.slice(1);
    const number = parseFloat(price);
    sum += number;
  });
  gettingPrice.innerText = sum;

  // console.log(gettingPrice);
};

// Requisito 3: Deleta item + edição do LocalStorage
function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove('.cart__item');
  localStorage.setItem('cartItems', ol.innerHTML);
  totalPrice();
}

// Requisito 6  - Apaga o carrinho;
const clearAll = () => {
  ol.innerHTML = '';
  localStorage.clear();
  totalPrice();
};
const buttonClear = document.querySelector('.empty-cart');
buttonClear.addEventListener('click', clearAll);

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

window.onload = () => { };
// Requisito 2:
const createCart = async (id) => {
  const response = await fetchItem(id);
  const data = {
    sku: response.id,
    name: response.title,
    salePrice: response.price,
  };
  ol.appendChild(createCartItemElement(data));
  saveCartItems(ol.innerHTML);
  totalPrice();
};

// Requisito 7:
const addText = () => {
  const loading = document.createElement('p');
  const section = document.querySelector('.items');
  loading.className = 'loading';
  loading.innerText = 'carregando...';
  section.appendChild(loading);
};
const deleteText = () => {
  const loading = document.querySelector('.loading');
  const section = document.querySelector('.items');
  section.removeChild(loading);
};

// requisito 1 com alteração de add escutador no botão e add a adição e exclusão do texto.
const createElements = async () => {  
  addText();
  const section = document.querySelector('.items');
  const results = await fetchProducts('computador');
  results.forEach((result, index) => {
    const param = {
      sku: result.id,
      name: result.title,
      image: result.thumbnail,
    };
    section.appendChild(createProductItemElement(param));

    const button = document.querySelectorAll('.item__add');
     // for (let index = 0; index < results.length; index += 1) {   ==> Não funcionou, só colocou um produto, por isso coloquei o index lá em cima do forEach, pra trabalhar de forma conjunto com os demais elementos)

    button[index].addEventListener('click', () => createCart(param.sku));
  });
  deleteText();
};

window.onload = async () => {
    createElements();
    gettingItem();
    ol.addEventListener('click', cartItemClickListener);
    totalPrice();
};