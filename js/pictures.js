'use strict';

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
var picturesContainer = document.querySelector('.pictures');
var bigPictureElement = document.querySelector('.big-picture');
var socialCommentsContainer = document.querySelector('.social__comments');
var inputUploadFile = picturesContainer.querySelector('.img-upload__input');
var imgUploadOverlayContainer = picturesContainer.querySelector('.img-upload__overlay');
var imgUploadPreviewElement = imgUploadOverlayContainer.querySelector('.img-upload__preview');
var imgUploadEffectsContainer = picturesContainer.querySelector('.img-upload__effects');
// var imgUploadTextContainer = picturesContainer.querySelector('.img-upload__text');
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

// ---------------------------------------------  task 4
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
  if (evt.target.id && evt.target.tagName === 'IMG') {
    bigPictureOpen(evt.target.id);
  }
});

bigPictureElement.querySelector('#picture-cancel').addEventListener('click', bigPictureClose);

function imgUploadOverlayOpen() {
  imgUploadOverlayContainer.classList.remove('hidden');
  document.addEventListener('keydown', onImgUploadOverlayEscPress);
}

function imgUploadOverlayClose() {
  imgUploadOverlayContainer.classList.add('hidden');
  document.removeEventListener('keydown', onImgUploadOverlayEscPress);
  inputUploadFile.value = '';
  imgUploadEffectsContainer.querySelector('.effects__list').querySelector('input').checked = true;
  setEffectLevel(20);
}

function onImgUploadOverlayEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    imgUploadOverlayClose();
  }
}

imgUploadOverlayContainer.querySelector('.img-upload__cancel').addEventListener('click', imgUploadOverlayClose);
inputUploadFile.addEventListener('change', imgUploadOverlayOpen);

function switchFilter() {
  setEffectLevel(20);
  // var removedCls = imgUploadOverlayContainer.querySelector('.img-upload__preview').classList[1];
  // imgUploadPreviewElement.classList.remove(removedCls);
  // var cls = evt.target.nextElementSibling.firstElementChild.classList[1];
  // imgUploadPreviewElement.classList.add(cls);
}

for (i = 0; i < 6; i++) {
  imgUploadEffectsContainer.querySelectorAll('.effects__item')[i].addEventListener('change', switchFilter);
}

function onScalePinMouseup(evt) {
  var level = Math.round(evt.offsetX / 4.55);
  setEffectLevel(level);
}

function setEffectLevel(level) {
  var pxlevel = 0.03 * level;
  var effects = imgUploadEffectsContainer.querySelectorAll('.effects__item');
  imgUploadOverlayContainer.querySelector('.scale__pin').style.left = (level + '%');
  imgUploadOverlayContainer.querySelector('.scale__level').style.width = (level + '%');
  imgUploadOverlayContainer.querySelector('.scale__value').value = level;

  for (i = 0; i < 6; i++) {
    if (effects[i].firstElementChild.checked) {
      var effect = effects[i].lastElementChild.firstElementChild.classList[1];
      switch (effect) {
        case 'effects__preview--none':
          imgUploadPreviewElement.style.filter = ('none');
          break;
        case 'effects__preview--chrome':
          imgUploadPreviewElement.style.filter = ('grayscale(' + level + '%)');
          break;
        case 'effects__preview--sepia':
          imgUploadPreviewElement.style.filter = ('sepia(' + level + '%)');
          break;
        case 'effects__preview--marvin':
          imgUploadPreviewElement.style.filter = ('invert(' + level + '%)');
          break;
        case 'effects__preview--phobos':
          imgUploadPreviewElement.style.filter = ('blur(' + pxlevel + 'px)');
          break;
        case 'effects__preview--heat':
          imgUploadPreviewElement.style.filter = ('brightness(' + pxlevel + ')');
          break;
      }
    }
  }
}

imgUploadOverlayContainer.querySelector('.scale__line').addEventListener('mouseup', onScalePinMouseup);

document.querySelector('.img-filters').classList.remove('img-filters--inactive');
