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




formFeadback.addEventListener('click', closeFormFeedback);
window.addEventListener('keydown', closeFormFeedback);

function closeFormFeedback(event) {

  let element = event.target;
  if (element.classList.contains('callback-btn__close') || event.keyCode === 27) {
    event.preventDefault();
    formFeadback.classList.remove('form__cb--opened');
    formFeadback.classList.add('form__cb--closed');

  }
}



// slider 

const sliderControls = document.querySelector('.slider__controls');
let slides = Array.from(document.querySelectorAll('.slider-item'));
let sliderButtons = Array.from(
  document.querySelectorAll('.slider__controls--button')
);

if (slides && sliderButtons && sliderControls) {
  sliderControls.addEventListener('click', changeSlide);
}

function findCurrentButton(element) {
  return element.classList.contains('slider__controls-button--current');
}

function findCurrentSlide(element) {
  return element.classList.contains('slider--visible');
}

function changeSlide(event) {
  let element = event.target;

  if (element.classList.contains('slider__controls--button')) {
    event.preventDefault();

    let indexNextButton = sliderButtons.indexOf(element);
    let indexCurrentButton = sliderButtons.indexOf(sliderButtons.find(findCurrentButton));

    sliderButtons[indexCurrentButton].classList.remove(
      'slider__controls-button--current'
    );
    sliderButtons[indexNextButton].classList.add(
      'slider__controls-button--current'
    );

    let indexCurrentSlide = slides.indexOf(slides.find(findCurrentSlide));

    slides[indexCurrentSlide].classList.remove('slider--visible');
    slides[indexCurrentSlide].classList.add('slider--hidden');
    slides[indexNextButton].classList.add('slider--visible');
    slides[indexNextButton].classList.remove('slider--hidden');
  }
}