'use strict';
(function () {

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var picturesContainer = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  var pictures = [];
  for (var i = 0; i < 25; i++) {
    pictures.push(generatePicture());
  }

  for (i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(pictures[i]));
  }
  picturesContainer.appendChild(fragment);

  function generatePicture() {
    var obj = {};
    var photoId = pictures.length + 1;
    obj.id = photoId;
    obj.url = 'photos/' + photoId + '.jpg';
    obj.likes = window.utils.randomSelect(15, 200);
    obj.description = window.data.DESCRIPTIONS_ARRAY[window.utils.randomSelect(0, window.data.DESCRIPTIONS_ARRAY.length - 1)];
    obj.comments = [];
    var commentsCount = window.utils.randomSelect(1, 3);
    for (var i = 0; i < commentsCount; i++) {
      obj.comments.push(window.data.COMMENTS_ARRAY[window.utils.randomSelect(0, window.data.COMMENTS_ARRAY.length - 1)]);
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

  window.gallery = {
    pictures: pictures
  };

  document.querySelector('.img-filters').classList.remove('img-filters--inactive');

})();
