const instruments = [
  {
    id: 1,
    img: 'https://static.dnipro-m.ua/cache/products/7056/catalog_origin_218728.jpg',
    name: 'Шуруповерт',
    price: 150,
    description:
      'Сетевой дрель-шуруповерт TD-30 — надежный помощник для работ по дому и в небольшой мастерской, особенно для работы с крепежом. Муфта регулировки крутящего момента делает инструмент универсальным выбором как для сверления, так и для работы с креплениями.',
  },
  {
    id: 3,
    img: 'https://static.dnipro-m.ua/cache/products/1248/catalog_origin_305128.jpg',
    name: 'Шлифовальная машина',
    price: 1299,
    description:
      'Угловая шлифовальная машина Dnipro-M GS-98 – модель, объединяющая оптимальное соотношение мощности, веса и мобильности. Дизайн обеспечивает удобную и надежную работу даже одной рукой, идеально подходит для работ на высоте и в труднодоступных местах.',
  },
  {
    id: 4,
    img: 'https://static.dnipro-m.ua/cache/products/5596/catalog_origin_191105.jpg',
    name: 'Пила',
    price: 11049,
    description:
      'Мобильная аккумуляторная цепная пила DCS-200BC DUAL предназначена для обрезки лишних веток, спиливания деревьев и кустарника, заготовки дров, распила стройматериалов и демонтажных работ. Проста в использовании в любых местах.',
  },
  {
    id: 5,
    img: 'https://static.dnipro-m.ua/cache/products/2021/catalog_origin_304149.jpg',
    name: 'Уровень',
    price: 897,
    description:
      'Уровень серии ProVision от DNIPRO-M обладает не только высокой точностью измерений и отличными защитными свойствами, но и максимальным комфортом пользователя в процессе эксплуатации.',
  },
  {
    id: 6,
    img: 'https://static.dnipro-m.ua/cache/products/6566/catalog_origin_310499.jpg',
    name: 'Триммер',
    price: 3699,
    description:
      'Электрический триммер Dnipro-M 110 предназначен для стрижки густой травы, а также кустарников с диаметром стебля до 10 мм.',
  },
  {
    id: 7,
    img: 'https://static.dnipro-m.ua/cache/products/6484/catalog_origin_308955.jpg',
    name: 'Мотокоса',
    price: 11049,
    description:
      'Мотокоса Dnipro-M 43 предназначена для стрижки травы, кустарников, сорняков, газонов, а также для заготовки сена в небольших масштабах. Используется для полевых работ на садовом участке площадью до 2000 м².',
  },
  {
    id: 8,
    img: 'https://static.dnipro-m.ua/cache/products/4980/catalog_origin_183761.jpg',
    name: 'Генератор',
    price: 10890,
    description:
      'Бензиновый генератор GX-25 номинальной мощностью 2,5 кВт обеспечит автономность бытовых приборов на даче или в частном доме. Вы сможете одновременно подключить к нему освещение, холодильник, зарядку телефона, ноутбук и водяной насос.',
  },
];

import { updateBasketCount } from './basketCount.js';
window.PRODUCT_LS = 'basket';
updateBasketCount();
const container = document.querySelector('.js-list');

// if (
//   window.location.pathname === '/index.html' ||
//   window.location.pathname === '/'
// ) {
// }
container.insertAdjacentHTML('beforeend', createMarkup(instruments));
container.addEventListener('click', handleAdd);

function createMarkup(arr) {
  return arr
    .map(({ id, img, name, price, description }) => {
      const shortDescription =
        description.length > 100
          ? description.slice(0, 100) + '...'
          : description;

      return `
            <li data-id="${id}" class="product-card js-product">
                <img src="${img}" alt="${name}" class="product-img">
                <h2 class="product-title">${name}</h2>
                <p class="product-description">${shortDescription}</p>
                <div class="product-price-wrapper">
                <button class="product-add-btn js-add">Add to basket</button>
                    <p class="product-price">${price} грн.</p>
                </div>
            </li>
        `;
    })
    .join('');
}

function handleAdd(event) {
  if (!event.target.classList.contains('js-add')) {
    return;
  }

  const product = event.target.closest('.js-product');
  const productId = Number(product.dataset.id);
  const currentProduct = instruments.find(({ id }) => id === productId);
  const products = JSON.parse(localStorage.getItem(window.PRODUCT_LS)) || [];
  const index = products.findIndex(({ id }) => id === productId);

  if (index !== -1) {
    products[index].qty += 1;
  } else {
    currentProduct.qty = 1;
    products.push(currentProduct);
  }

  localStorage.setItem(window.PRODUCT_LS, JSON.stringify(products));
}
