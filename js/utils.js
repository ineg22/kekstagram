'use strict';
(function () {
  var imgUploadPreviewElement = document.querySelector('.img-upload__preview');
  var inputUploadFile = document.querySelector('.img-upload__input');

  window.utils = {
    randomSelect: function (min, max) {
      return Math.floor(min + (Math.random() * (max - min + 1)));
    },
    previewFile: function () {
      var preview = imgUploadPreviewElement.querySelector('img');
      var file = inputUploadFile.files[0];
      var reader = new FileReader();

      reader.onloadend = function () {
        preview.src = reader.result;
      };

      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = '';
      }
    }
  };

})();
