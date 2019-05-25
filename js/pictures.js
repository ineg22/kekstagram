'use strict';

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
var picturesContainer = document.querySelector('.pictures');
var bigPictureElement = document.querySelector('.big-picture');
var socialCommentsContainer = document.querySelector('.social__comments');
var fragment = document.createDocumentFragment();

var ESC_KEYCODE = 27;
var COMMENTS_ARRAY = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец ' +
'из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках ' +
'и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат ' +
'на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. ' +
'Как можно было поймать такой неудачный момент?!'];
var DESCRIPTIONS_ARRAY = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами ' +
'и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var pictures = [];
for (var i = 0; i < 25; i++) {
  pictures.push(generatePicture());
}

for (i = 0; i < pictures.length; i++) {
  fragment.appendChild(renderPicture(pictures[i]));
}
picturesContainer.appendChild(fragment);

function renderBigPictureElement(obj) {
  bigPictureElement.querySelector('.big-picture__img').querySelector('img').setAttribute('src', obj.url);
  bigPictureElement.querySelector('.likes-count').textContent = '' + obj.likes;
  bigPictureElement.querySelector('.comments-count').textContent = '' + obj.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = obj.description;
  bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPictureElement.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

  while (socialCommentsContainer.firstChild) {
    socialCommentsContainer.removeChild(socialCommentsContainer.firstChild);
  }
  for (var i = 0; i < obj.comments.length; i++) {
    fragment.appendChild(renderComment(obj, i));
  }
  socialCommentsContainer.appendChild(fragment);
}

function renderComment(obj, i) {
  var liElement = document.createElement('li');
  var imgElement = document.createElement('img');
  var pElement = document.createElement('p');

  liElement.classList.add('social__comment--text');
  liElement.classList.add('social__comment');
  imgElement.classList.add('social__picture');
  imgElement.setAttribute('src', 'img/avatar-' + randomSelect(2, 6) + '.svg');
  imgElement.setAttribute('alt', 'Аватар комментатора фотографии');
  imgElement.setAttribute('width', '35');
  imgElement.setAttribute('height', '35');
  pElement.classList.add('social__text');
  pElement.textContent = obj.comments[i];

  liElement.appendChild(imgElement);
  liElement.appendChild(pElement);

  return liElement;
}

function randomSelect(min, max) {
  return Math.floor(min + (Math.random() * (max - min + 1)));
}

function generatePicture() {
  var obj = {};
  var photoId = pictures.length + 1;
  obj.id = photoId;
  obj.url = 'photos/' + photoId + '.jpg';
  obj.likes = randomSelect(15, 200);
  obj.description = DESCRIPTIONS_ARRAY[randomSelect(0, DESCRIPTIONS_ARRAY.length - 1)];
  obj.comments = [];
  var commentsCount = randomSelect(1, 3);
  for (var i = 0; i < commentsCount; i++) {
    obj.comments.push(COMMENTS_ARRAY[randomSelect(0, COMMENTS_ARRAY.length - 1)]);
  }
  return obj;
}

function renderPicture(obj) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').setAttribute('src', obj.url);
  pictureElement.querySelector('.picture__stat--likes').textContent = '' + obj.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = '' + obj.comments.length;
  pictureElement.querySelector('img').setAttribute('id', obj.id);
  return pictureElement;
}

// ---------------------------------------------  task_4
function bigPictureOpen(id) {
  renderBigPictureElement(pictures[id - 1]);
  document.addEventListener('keydown', onBigPictureEscPress);
  bigPictureElement.classList.remove('hidden');
}

function bigPictureClose() {
  bigPictureElement.classList.add('hidden');
  document.removeEventListener('keydown', onBigPictureEscPress);
}

function onBigPictureEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    bigPictureClose();
  }
}

picturesContainer.addEventListener('click', function (evt) {
  bigPictureOpen(evt.target.id);
});

bigPictureElement.querySelector('#picture-cancel').addEventListener('click', bigPictureClose);
