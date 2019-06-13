'use strict';
(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var socialCommentsContainer = document.querySelector('.social__comments');
  var picturesElements = document.querySelectorAll('.picture__link');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < picturesElements.length; i++) {
    picturesElements[i].addEventListener('click', onPicturesElementsClick);
  }
  bigPictureElement.querySelector('#picture-cancel').addEventListener('click', bigPictureClose);

  function onPicturesElementsClick(evt) {
    if (evt.target.id && evt.target.tagName === 'IMG') {
      bigPictureOpen(evt.target.id);
    }
  }

  function bigPictureOpen(id) {
    renderBigPictureElement(window.gallery.pictures[id - 1]);
    document.addEventListener('keydown', onBigPictureEscPress);
    bigPictureElement.classList.remove('hidden');
  }

  function bigPictureClose() {
    bigPictureElement.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
  }

  function onBigPictureEscPress(evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      bigPictureClose();
    }
  }

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
    imgElement.setAttribute('src', 'img/avatar-' + window.utils.randomSelect(2, 6) + '.svg');
    imgElement.setAttribute('alt', 'Аватар комментатора фотографии');
    imgElement.setAttribute('width', '35');
    imgElement.setAttribute('height', '35');
    pElement.classList.add('social__text');
    pElement.textContent = obj.comments[i];

    liElement.appendChild(imgElement);
    liElement.appendChild(pElement);

    return liElement;
  }

})();
