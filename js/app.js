// definindo e iniciando o módulo do angular
var app = angular.module("newsmap", ["leaflet-directive"]);

// Controller do MAPA
app.controller('MixedGeoJSONEventsWithIDController', [ "$scope", "$http", function($scope, $http) {

  $scope.$on("leafletDirectiveGeoJson.myMap.mouseover", function(ev, leafletPayload) {
    countryMouseover(leafletPayload.leafletObject.feature, leafletPayload.leafletEvent);
  });

  $scope.$on("leafletDirectiveGeoJson.myMap.click", function(ev, leafletPayload) {
    countryClick(leafletPayload.leafletObject, leafletPayload.leafletEvent);
  });

  // var continentProperties= {
  //   "009": {
  //     name: 'Oceania',
  //     colors: [ '#CC0066', '#993366', '#990066', '#CC3399', '#CC6699' ]
  //   },
  //   "019": {
  //     name: 'America',
  //     colors: [ '#006699', '#336666', '#003366', '#3399CC', '#6699CC' ]
  //   },
  //   "150": {
  //     name: 'Europe',
  //     colors: [ '#FF0000', '#CC3333', '#990000', '#FF3333', '#FF6666' ]
  //   },
  //   "002": {
  //     name: 'Africa',
  //     colors: [ '#00CC00', '#339933', '#009900', '#33FF33', '#66FF66' ]
  //   },
  //   "142": {
  //     name: 'Asia',
  //     colors: [ '#FFCC00', '#CC9933', '#999900', '#FFCC33', '#FFCC66' ]
  //   },
  // };

  //Controlando posição inicial central, zoom inicial do MAPA e definindo parâmetros
  angular.extend($scope, {
      defaults: {
        tileLayer: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        maxZoom: 6,
        minZoom: 3,
        keyboard: true,
        zoomControlPosition: 'topright',
        maxBoundsViscosity: 1.0,
      },
      center: {
        lat: 40.8471,
        lng: 14.0625,
        zoom: 3,
      },
      // controlando o que aparece na legenda do MAPA
      // legend: {
      //   colors: [ '#CC0066', '#006699', '#FF0000', '#00CC00', 'black' ],
      //   labels: [ 'Oceania', 'America', 'Europe', 'Africa', 'Asia' ]
      // },
    });

    function openNavMapa() {
      document.getElementById("sidenavMapa").style.width = "100%";
      document.getElementById("pushMapa").style.marginLeft = "100%";
    }

    // função para abrir o side menu sooomente clicando no país
    function countryClick(country, event) {
      country = country.feature;
      // console.log(country);
      if (country.id) {
        openNavMapa();
      }
    }

    // Get a country paint color from the continents array of colors
    function getColor(country) {
      if (!country || !country["region-code"]) {
        //definindo cor dos continentes
        return "black";
      }

      var colors = continentProperties[country["region-code"]].colors;
      var index = country["alpha-3"].charCodeAt(0) % colors.length ;
      return colors[index];
    }

    //estilo dos limites entre países
    function style(feature) {
      return {
        fillColor: getColor($scope.countries[feature.id]),
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '3',
        fillOpacity: 0.7
      };
    }

    // mudança do estilo quando mouse
    function countryMouseover(feature, leafletEvent) {
      var layer = leafletEvent.target;
      layer.setStyle({
        weight: 2,
        color: 'black',
        fillColor: 'white'
      });
      layer.bringToFront();
      $scope.selectedCountry = feature;
      // console.log($scope.selectedCountry);
    }

    // Get the countries data from a JSON
    $http.get('https://raw.githubusercontent.com/tombatossals/angular-leaflet-directive/master/examples/json/all.json').then(function(response, status) {
      // console.log('testando');
      // Put the countries on an associative array
      $scope.countries = {};
      for (var i=0; i< response.length; i++) {
        var country = data[i];
        $scope.countries[country['alpha-3']] = country;
      }

      // Get the countries geojson data from a JSON
      $http.get("https://raw.githubusercontent.com/tombatossals/angular-leaflet-directive/master/examples/json/countries.geo.json").then(function(response, status) {
        angular.extend($scope, {
          geojson: {
            data: response.data,
            style: style,
            resetStyleOnMouseout: true
          },
          selectedCountry: {}
        });
      });
    });
  }]);

  // Controller do index/Home
  app.controller('homeCtrl', function($scope) {
    // $scope.index = [
    //   {id: 1, title: 'Home'},
    //   {id: 2,
    //     title: 'Login',
    //     submenu:[
    //       'xablau',
    //       'xpto'
    //     ]},
    //     {id: 3,
    //       title: 'Personalizar',
    //       submenu:[
    //         'bla bla bla',
    //         'ble ble ble'
    //       ]
    //     },
    //     {id: 4, title: 'Logout'}
    //   ];

    // $scope.ativarSubmenu = function(item){
    //   $scope.submenuAtivo = item.submenu;
    // }
  });
