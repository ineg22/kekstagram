'use strict';

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
var picturesContainer = document.querySelector('.pictures');
var bigPictureElement = document.querySelector('.big-picture');

var comments =['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец' +
'из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках' +
'и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат' +
'на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают.' +
'Как можно было поймать такой неудачный момент?!'];
var descriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами' +
'и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var pictures = [];

for (var i = 0; i < 25; i++) {
  pictures.push(generatePicture());
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < pictures.length; i++) {
  fragment.appendChild(renderPicture(pictures[i]));
}
picturesContainer.appendChild(fragment);

// bigPictureElement.classList.remove('hidden');
bigPictureElement.querySelector('img').setAttribute('src', pictures[0].url);
bigPictureElement.querySelector('.likes-count').textContent = '' + pictures[0].likes;
bigPictureElement.querySelector('.comments-count').textContent = '' + pictures[0].comments.length;

function generatePicture() {
  var obj = {};
  obj.url = `photos/${pictures.length + 1}.jpg`;
  obj.likes = randomSelect(15, 200);
  obj.description = descriptions[randomSelect(0,descriptions.length - 1)];
  obj.comments = [];
  var commentsCount = randomSelect(1,2);
  for (var i = 0; i < commentsCount; i++) {
    obj.comments.push(comments[randomSelect(0,comments.length - 1)])
  }
  return obj;
}

function randomSelect(from, to) {
  return Math.floor(from + (Math.random() * (to - from + 1)));
}

function renderPicture(obj) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('img').setAttribute('src', obj.url);
  pictureElement.querySelector('.picture__stat--likes').textContent = '' + obj.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = '' + obj.comments.length;
  return pictureElement;
}
