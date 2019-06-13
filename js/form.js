'use strict';
(function () {

  var picturesContainer = document.querySelector('.pictures');
  var inputUploadFile = picturesContainer.querySelector('.img-upload__input');
  var imgUploadOverlayContainer = picturesContainer.querySelector('.img-upload__overlay');
  var imgUploadPreviewElement = imgUploadOverlayContainer.querySelector('.img-upload__preview');
  var imgUploadEffectsContainer = picturesContainer.querySelector('.img-upload__effects');

  function imgUploadOverlayOpen() {
    imgUploadOverlayContainer.classList.remove('hidden');
    setEffectLevel(20);
    window.utils.previewFile();
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
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      imgUploadOverlayClose();
    }
  }

  imgUploadOverlayContainer.querySelector('.img-upload__cancel').addEventListener('click', imgUploadOverlayClose);
  inputUploadFile.addEventListener('change', imgUploadOverlayOpen);

  // ----------------------work with filters / task_5
  var scaleContainer = imgUploadOverlayContainer.querySelector('.img-upload__scale');
  var scaleLine = scaleContainer.querySelector('.scale__line');
  var scalePin = scaleContainer.querySelector('.scale__pin');
  var effectLevel = 20;

  function onSwitchFilter() {
    effectLevel = 20;
    setEffectLevel(effectLevel);
  }

  for (var i = 0; i < 6; i++) {
    imgUploadEffectsContainer.querySelectorAll('.effects__item')[i].addEventListener('change', onSwitchFilter);
  }

  function setEffectLevel(level) {
    var pxlevel = 0.03 * level;
    var effects = imgUploadEffectsContainer.querySelectorAll('.effects__item');
    scalePin.style.left = (level + '%');
    scaleContainer.querySelector('.scale__level').style.width = (level + '%');
    scaleContainer.querySelector('.scale__value').value = level;

    if (effects[0].firstElementChild.checked) {
      scaleContainer.classList.add('hidden');
    } else {
      scaleContainer.classList.remove('hidden');
    }

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

  function onScaleMousedown(downEvt) {
    downEvt.preventDefault();
    var x = downEvt.clientX;
    var shiftLevel = 0;
    var zeroPoint = (document.querySelector('body').clientWidth - scaleLine.clientWidth) / 2;
    var maxPoint = zeroPoint + scaleLine.clientWidth;

    if (downEvt.target !== scalePin) {
      effectLevel = Math.round((x - zeroPoint) / 4.53) + 2;
      setEffectLevel(effectLevel);
    }

    function onScaleMove(moveEvt) {
      moveEvt.preventDefault();
      shiftLevel = Math.round((x - moveEvt.clientX) / 4.53);

      if (moveEvt.clientX < zeroPoint) {
        setEffectLevel(0);
      } else if (moveEvt.clientX > maxPoint) {
        setEffectLevel(100);
      } else {
        setEffectLevel(effectLevel - shiftLevel);
      }
    }

    function onScaleMouseup(upEvt) {
      upEvt.preventDefault();
      effectLevel = effectLevel - shiftLevel;
      if (effectLevel < 0) {
        effectLevel = 0;
      } else if (effectLevel > 100) {
        effectLevel = 100;
      }

      document.removeEventListener('mousemove', onScaleMove);
      document.removeEventListener('mouseup', onScaleMouseup);
    }

    document.addEventListener('mousemove', onScaleMove);
    document.addEventListener('mouseup', onScaleMouseup);
  }

  scaleLine.addEventListener('mousedown', onScaleMousedown);

  // ----------------------------------- task 4 + tags
  var hashTagsElement = imgUploadOverlayContainer.querySelector('.text__hashtags');
  var imgUploadDescriptionElement = imgUploadOverlayContainer.querySelector('.text__description');

  hashTagsElement.addEventListener('focus', function () {
    document.removeEventListener('keydown', onImgUploadOverlayEscPress);
  });
  imgUploadDescriptionElement.addEventListener('focus', function () {
    document.removeEventListener('keydown', onImgUploadOverlayEscPress);
  });
  hashTagsElement.addEventListener('blur', function () {
    document.addEventListener('keydown', onImgUploadOverlayEscPress);
  });
  imgUploadDescriptionElement.addEventListener('blur', function () {
    document.addEventListener('keydown', onImgUploadOverlayEscPress);
  });

  function isInvalid(str) {
    if (str === '') {
      return false;
    }
    str = str.toLowerCase();
    var tags = str.split(' ');

    for (i = 0; i < tags.length; i++) {
      if (tags[i] === '') {
        return ('too much spaces between tags');
      }

      if (tags[i].split('#').length > 2) {
        return ('must be a space between tags');
      }

      if (tags[i].charAt(0) !== '#') {
        return (tags[i].charAt(0) + ' does not start with #');
      }

      if (tags[i].length === 1) {
        return ('must be at least 1 char after #');
      }

      for (var j = i + 1; j < tags.length; j++) {
        if (tags[i] === tags[j]) {
          return (tags[i] + ' tag is repeated');
        }
      }

      if (tags[i].length > 20) {
        return ('max length of tag must be less than 20 char');
      }
    }

    if (tags.length > 5) {
      return ('you cant use more than 5 tags');
    }

    return false;
  }
  function onSubmitClick() {
    var text = hashTagsElement.value;
    var invalidState = isInvalid(text);

    if (invalidState) {
      hashTagsElement.style = 'border-color: red; border-width: 3px;';
      hashTagsElement.setCustomValidity(invalidState);
    // evt.preventDefault();
    // console.log(hashTagsElement.validity);
    } else {
      hashTagsElement.style = 'border-color: initial; border-width: 2px;';
      hashTagsElement.setCustomValidity('');
    // console.log(hashTagsElement.validity);
    // picturesContainer.querySelector('.img-upload__form').submit();
    }
  }

  picturesContainer.querySelector('.img-upload__submit').addEventListener('click', onSubmitClick);

})();
