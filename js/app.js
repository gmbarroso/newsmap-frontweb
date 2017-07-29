// definindo e iniciando o módulo do angular
var app = angular.module("newsmap", ["leaflet-directive"]);

// Controller do MAPA
app.controller('MixedGeoJSONEventsWithIDController', [ "$scope", "$http", function($scope, $http, $interval) {

  $scope.$on("leafletDirectiveGeoJson.myMap.mouseover", function(ev, leafletPayload) {
    countryMouseover(leafletPayload.leafletObject.feature, leafletPayload.leafletEvent);
  });

  $scope.$on("leafletDirectiveGeoJson.myMap.click", function(ev, leafletPayload) {
    countryClick(leafletPayload.leafletObject.feature, leafletPayload.leafletObject, leafletPayload.leafletEvent);
    // console.log(leafletPayload.leafletObject.feature);
    // console.log(leafletPayload.leafletEvent);
    openNavMapa();

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
  function countryClick(feature, country, event) {
    country = country.feature;
    // console.log(country);
    // console.log(country.properties.name);
    // if (country.id) {
    //   openNavMapa();
    // }
    $scope.clickedCountry = country;

    $scope.listaPaises = [
      { nome : 'Brazil',
      conteudo : [
        {id: 1, paper: 'Folha', pagina: 'folha'},
        {id: 1, paper: 'Globo', pagina: 'g1'},
        {id: 1, paper: 'Estadão', pagina: 'estadao'},
        {id: 1, paper: 'O Tempo', pagina: 'otempo'},
        {id: 1, paper: 'O Globo', pagina: 'oglobo'}
      ]
    },

      { nome : 'Argentina',
      conteudo : [
        {id: 1, paper: 'Clarín', pagina: 'clarin'},
        {id: 1, paper: 'La Nación', pagina: 'lanacion'},
        {id: 1, paper: 'Los Andes', pagina: 'losandes'},
        {id: 1, paper: 'La Voz', pagina: 'lavoz'},
      ]
    },

    { nome : 'Australia',
    conteudo : [
      {id: 1, paper: 'The Age', pagina: 'theage'},
      {id: 1, paper: 'Daily Telegraph', pagina: 'telegraph'},
      {id: 1, paper: 'Courier Mail', pagina: 'couriermail'},
      {id: 1, paper: 'The Sydney Morning Herald', pagina: 'sydneyherald'},
      {id: 1, paper: 'Herald Sun', pagina: 'heraldsun'},
    ]
  },

    { nome : 'Canada',
    conteudo : [
      {id: 1, paper: 'Toronto Star', pagina: 'torontostar'},
      {id: 1, paper: 'Vancouver Sun', pagina: 'vancouversun'},
      {id: 1, paper: 'Metro News Canada', pagina: 'metronews'},
      {id: 1, paper: 'National Post', pagina: 'nationalpost'},
      {id: 1, paper: 'Ottawa Citizen', pagina: 'ottawacitizen'},
    ]
  },

    { nome : 'Spain',
    conteudo : [
      {id: 1, paper: 'El País', pagina: 'elpais'},
      {id: 1, paper: 'El Mundo', pagina: 'elmundo'},
      {id: 1, paper: 'La Vanguardia', pagina: 'lavanguardia'},
      {id: 1, paper: 'ABC España', pagina: 'abcespana'},
      {id: 1, paper: 'El Correo', pagina: 'elcorreo'},
    ]
  },

    { nome : 'United States of America',
    conteudo : [
      {id: 1, paper: 'The New York Times', pagina: 'nyt'},
      {id: 1, paper: 'USA Today', pagina: 'usatoday'},
      {id: 1, paper: 'Washington Post', pagina: 'washpost'},
      {id: 1, paper: 'New York Daily News', pagina: 'nydailynews'},
      {id: 1, paper: 'The Wall Street Journal', pagina: 'twsj'},
    ]
  },

    { nome : 'France',
    conteudo : [
      {id: 1, paper: 'Le Monde', pagina: 'lemonde'},
      {id: 1, paper: 'Le Figaro', pagina: 'lefigaro'},
      {id: 1, paper: 'Le Parisien', pagina: 'leparisien'},
      {id: 1, paper: 'Ouest France', pagina: 'ouestfrance'},
      {id: 1, paper: "L'Express FR", pagina: 'lexpressfr'},
    ]
  },

    { nome : 'Italy',
    conteudo : [
      {id: 1, paper: 'La Stampa', pagina: 'lastampa'},
      {id: 1, paper: 'La Repubblica', pagina: 'larepubblica'},
      {id: 1, paper: 'Corriere Della Sera', pagina: 'cds'},
      {id: 1, paper: 'Il Sole 24 Ore', pagina: 'ilsole'},
      {id: 1, paper: 'Il Messaggero', pagina: 'ilmessaggero'},
    ]
  },

    { nome : 'Japan',
    conteudo : [
      {id: 1, paper: 'NHK Online', pagina: 'nhkonline'},
      {id: 1, paper: 'The Japan Times', pagina: 'thejapantimes'},
      {id: 1, paper: 'Asia Nikkei', pagina: 'asianikkei'},
      {id: 1, paper: 'Japan Today', pagina: 'japantoday'},
      {id: 1, paper: 'Asahi Shimbun', pagina: 'asahishimbun'},
    ]
  },

    { nome : 'Mexico',
    conteudo : [
      {id: 1, paper: 'La Jornada', pagina: 'lajornada'},
      {id: 1, paper: 'Reforma', pagina: 'reforma'},
      {id: 1, paper: 'El Universal', pagina: 'eluniversalmx'},
    ]
  },

    { nome : 'United Kingdom',
    conteudo : [
      {id: 1, paper: 'The Daily Mail UK', pagina: 'tdmuk'},
      {id: 1, paper: 'Metro UK', pagina: 'metrouk'},
      {id: 1, paper: 'BBC', pagina: 'bbc'},
      {id: 1, paper: 'The Guardian', pagina: 'theguardian'},
      {id: 1, paper: 'The Independent', pagina: 'theindependent'},
    ]
  },

  { nome : 'Venezuela',
  conteudo : [{id: 1, paper: 'La Patilla', pagina: 'lapatilla'},
  {id: 1, paper: 'El Universal', pagina: 'eluniversal'},]
}
]

for(var i = 0; i <= $scope.listaPaises.length-1; i++){
  if($scope.listaPaises[i].nome == $scope.clickedCountry.properties.name){
    $scope.jornaisPaisClicado = $scope.listaPaises[i].conteudo;
  }
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
  // $scope.clickedCountry = feature;
  // console.log($scope.selectedCountry.properties.name);
  // console.log($scope.selectedCountry);
}

// Get the countries data from a JSON
$http.get('https://raw.githubusercontent.com/tombatossals/angular-leaflet-directive/master/examples/json/all.json').then(function(response, status) {
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

  // $http.get("https://raw.githubusercontent.com/yaiba/flags.json/master/flags.json").then(function (response, status) {
  //   angular.extend($scope,{
  //     flags =
  //     }
  //   })
  // })

  //
  // if($scope.clickedContry){
  //   $scope.listaPaises = [
  //     { nome : 'Brazil',
  //     conteudo : [
  //       {id: 1, paper: 'Folha', pagina: 'folha'},
  //       {id: 1, paper: 'Globo', pagina: 'g1'},
  //       {id: 1, paper: 'Estadão', pagina: 'estadao'},
  //       {id: 1, paper: 'O Tempo', pagina: 'otempo'},
  //       {id: 1, paper: 'O Globo', pagina: 'oglobo'}
  //     ]}
  //   ]
  // }



  var paisSelect = function(){

  }

  var buscar = function(pagina) {
    for (var i = 0; i < listaPaises.length; i++) {
      if (listaPaises[i].nome == pagina) {
        return listaPaises[i];
      }
    }
    return null;
  }

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
