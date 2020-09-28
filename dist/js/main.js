ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты
    center: [59.93944115603922, 30.32302403991186],
    // Масштаб карты
    zoom: 16,
    // Выключаем все управление картой
    controls: []
  });

  var myGeoObjects = [];

  // Указываем координаты метки
  myGeoObjects = new ymaps.Placemark([59.93944115603922, 30.32302403991186], {
    balloonContentBody: 'WEB \'NERDS\'',
  }, {
    iconLayout: 'default#image',
    // Путь до нашей картинки
    iconImageHref: '/img/map-marker.png',
    // Размеры иконки
    iconImageSize: [231, 190],
    // Смещение верхнего угла относительно основания иконки
    iconImageOffset: [-51, -100]
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