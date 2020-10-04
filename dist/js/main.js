// ==========map

ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты
    center: [59.938635, 30.323118],
    // Масштаб карты
    zoom: 17,
    // Выключаем все управление картой
    controls: []
  });

  var myGeoObjects = [];

  // Указываем координаты метки
  myGeoObjects = new ymaps.Placemark([59.938635, 30.323118], {
    balloonContentBody: 'WEB \'NERDS\ Б. Конюшенная, д. 19/8  \'',
  }, {
    iconLayout: 'default#image',
    // Путь до нашей картинки
    iconImageHref: 'img/map-marker.png',
    // Размеры иконки
    iconImageSize: [231, 190],
    // Смещение верхнего угла относительно основания иконки
    iconImageOffset: [-60, -180]
  });

  var clusterer = new ymaps.Clusterer({
    clusterDisableClickZoom: false,
    clusterOpenBalloonOnClick: false,
  });

  clusterer.add(myGeoObjects);
  myMap.geoObjects.add(clusterer);
  // Отключим zoom
  myMap.behaviors.disable('scrollZoom');

}



// ========= feadback form


const formFeadback = document.querySelector('.callback__form');
const contactsBtn = document.querySelector('.contacts__btn');

contactsBtn.addEventListener('click', (event) => {
  event.preventDefault();
  formFeadback.classList.add('form__cb--opened');
  formFeadback.classList.remove('form__cb--closed');
});


formFeadback.addEventListener('click', (event) => {
  let element = event.target;
  if (element.classList.contains('callback-btn__close')) {
    event.preventDefault();
    formFeadback.classList.remove('form__cb--opened');
    formFeadback.classList.add('form__cb--closed');

  }
});