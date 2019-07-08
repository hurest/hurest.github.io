// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

  .controller('mainCtrl', function ($scope) {

    var ready = false;

    $scope.capture = function (target) {

      var files = target.files;
      var img = files[0];

      var reader = new FileReader();

      reader.addEventListener('load', () => {

        var imgEl = document.getElementById('pictureImg');

        imgEl.src = reader.result;
        imgEl.onload = () => {
          $scope.alert();
        };
      });

      reader.readAsDataURL(img);

    }

    $scope.alert = function () {

      var ElImg = document.getElementById('pictureImg');
      var ElBlk = document.getElementById('colorBlock');
      var ElBdy = document.getElementById('body');

      setTimeout(function () {

        var colorThief = new ColorThief();
        var color = colorThief.getColor(ElImg);

        var rgb = ((color[0] > 15) ? color[0].toString(16) : "0" + color[0].toString(16))
          + ((color[1] > 15) ? color[1].toString(16) : "0" + color[1].toString(16))
          + ((color[2] > 15) ? color[2].toString(16) : "0" + color[2].toString(16));

        rgb = rgb.toUpperCase();

        var name, r, g, b;
        var min = 999999, minColor;
        var minR, minG, minB;
        var dark = false;


        for (var code in colorNames) {

          r = parseInt(code.substr(0, 2), 16);
          g = parseInt(code.substr(2, 2), 16);
          b = parseInt(code.substr(4, 2), 16);

          if (min > Math.abs(color[0] - r) + Math.abs(color[1] - g) + Math.abs(color[2] - b)) {
            min = Math.abs(color[0] - r) + Math.abs(color[1] - g) + Math.abs(color[2] - b);
            minColor = code;
            name = colorNames[code];
            minR = r;
            minG = g;
            minB = b;
          }

        }

        if( (minR + minG + minB) / 3 < 128 ) {
          dark = true;
        }


        if (dark)
          ElBdy.classList.add('darkness');
        else
          ElBdy.classList.remove('darkness');

        ElBdy.style.backgroundColor = "#" + minColor;
        ElBlk.innerHTML =  name;

        // ttsPlugin.speak(name);

        function startupWin(result) {

          ready = true;

          if (result == 2) {
            ttsPlugin.speak(name);
          }
        }

        function win(result) {
          console.log(result);
        }

        function fail(result) {
          console.log("Error = " + result);
        }

      }, 200);

    }
  })
