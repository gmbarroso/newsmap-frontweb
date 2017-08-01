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

  // console.log(countries[selectedCountry.id]);

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
  });

  $scope.listaPaises = [
    { nome : 'Brazil',
    conteudo : [
      {id: 1, paper: 'Folha', pagina: 'folha', pais: 'brasil'},
      {id: 2, paper: 'Globo', pagina: 'g1', pais: 'brasil'},
      {id: 3, paper: 'Estadão', pagina: 'estadao', pais: 'brasil'},
      {id: 4, paper: 'O Tempo', pagina: 'otempo', pais: 'brasil'},
      {id: 5, paper: 'O Globo', pagina: 'oglobo', pais: 'brasil'}
    ]
  },

  { nome : 'Argentina',
  conteudo : [
    {id: 1, paper: 'Clarín', pagina: 'clarin'},
    {id: 2, paper: 'La Nación', pagina: 'lanacion'},
    {id: 3, paper: 'Los Andes', pagina: 'losandes'},
    {id: 4, paper: 'La Voz', pagina: 'lavoz'},
  ]
},

{ nome : 'Australia',
conteudo : [
  {id: 1, paper: 'The Age', pagina: 'theage'},
  {id: 2, paper: 'Daily Telegraph', pagina: 'telegraph'},
  {id: 3, paper: 'Courier Mail', pagina: 'couriermail'},
  {id: 4, paper: 'The Sydney Morning Herald', pagina: 'sydneyherald'},
  {id: 5, paper: 'Herald Sun', pagina: 'heraldsun'},
]
},

{ nome : 'Canada',
conteudo : [
  {id: 1, paper: 'Toronto Star', pagina: 'torontostar'},
  {id: 2, paper: 'Vancouver Sun', pagina: 'vancouversun'},
  {id: 3, paper: 'Metro News Canada', pagina: 'metronews'},
  {id: 4, paper: 'National Post', pagina: 'nationalpost'},
  {id: 5, paper: 'Ottawa Citizen', pagina: 'ottawacitizen'},
]
},

{ nome : 'Spain',
conteudo : [
  {id: 1, paper: 'El País', pagina: 'elpais', pais: 'espanha'},
  {id: 2, paper: 'El Mundo', pagina: 'elmundo', pais: 'espanha'},
  {id: 3, paper: 'La Vanguardia', pagina: 'lavanguardia', pais: 'espanha'},
  {id: 4, paper: 'ABC España', pagina: 'abcespana', pais: 'espanha'},
  {id: 5, paper: 'El Correo', pagina: 'elcorreo', pais: 'espanha'},
]
},

{ nome : 'United States of America',
conteudo : [
  {id: 1, paper: 'The New York Times', pagina: 'nyt', pais: 'eua'},
  {id: 2, paper: 'USA Today', pagina: 'usatoday', pais: 'eua'},
  {id: 3, paper: 'Washington Post', pagina: 'washpost', pais: 'eua'},
  {id: 4, paper: 'New York Daily News', pagina: 'nydailynews', pais: 'eua'},
  {id: 5, paper: 'The Wall Street Journal', pagina: 'twsj', pais: 'eua'},
]
},

{ nome : 'France',
conteudo : [
  {id: 1, paper: 'Le Monde', pagina: 'lemonde'},
  {id: 2, paper: 'Le Figaro', pagina: 'lefigaro'},
  {id: 3, paper: 'Le Parisien', pagina: 'leparisien'},
  {id: 4, paper: 'Ouest France', pagina: 'ouestfrance'},
  {id: 5, paper: "L'Express FR", pagina: 'lexpressfr'},
]
},

{ nome : 'Italy',
conteudo : [
  {id: 1, paper: 'La Stampa', pagina: 'lastampa'},
  {id: 2, paper: 'La Repubblica', pagina: 'larepubblica'},
  {id: 3, paper: 'Corriere Della Sera', pagina: 'cds'},
  {id: 4, paper: 'Il Sole 24 Ore', pagina: 'ilsole'},
  {id: 5, paper: 'Il Messaggero', pagina: 'ilmessaggero'},
]
},

{ nome : 'Japan',
conteudo : [
  {id: 1, paper: 'NHK Online', pagina: 'nhkonline'},
  {id: 2, paper: 'The Japan Times', pagina: 'thejapantimes'},
  {id: 3, paper: 'Asia Nikkei', pagina: 'asianikkei'},
  {id: 4, paper: 'Japan Today', pagina: 'japantoday'},
  {id: 5, paper: 'Asahi Shimbun', pagina: 'asahishimbun'},
]
},

{ nome : 'Mexico',
conteudo : [
  {id: 1, paper: 'La Jornada', pagina: 'lajornada'},
  {id: 2, paper: 'Reforma', pagina: 'reforma'},
  {id: 3, paper: 'El Universal', pagina: 'eluniversalmx'},
]
},

{ nome : 'United Kingdom',
conteudo : [
  {id: 1, paper: 'The Daily Mail UK', pagina: 'tdmuk'},
  {id: 2, paper: 'Metro UK', pagina: 'metrouk'},
  {id: 3, paper: 'BBC', pagina: 'bbc'},
  {id: 4, paper: 'The Guardian', pagina: 'theguardian'},
  {id: 5, paper: 'The Independent', pagina: 'theindependent'},
]
},

{ nome : 'Venezuela',
conteudo : [{id: 1, paper: 'La Patilla', pagina: 'lapatilla'},
{id: 2, paper: 'El Universal', pagina: 'eluniversal'},]
},

{ nome : 'India',
conteudo : []
}
]

function openNavMapa() {
  document.getElementById("sidenavMapa").style.width = "800px";
  document.getElementById("pushMapa").style.marginLeft = "800px";
}

function countryClick(feature, country, event) {
  country = country.feature;

  if($scope.clickedCountry){
    $scope.noticias = [];
    $scope.jornaisPaisClicado = [];
    $scope.clickedCountry = country;
  }

  $scope.clickedCountry = country;

  for(var i = 0; i <= $scope.listaPaises.length-1; i++){
    if($scope.listaPaises[i].nome == $scope.clickedCountry.properties.name){
      $scope.jornaisPaisClicado = $scope.listaPaises[i].conteudo;
    }
  }

  $scope.submit = function(item) {
    $http({
      method: 'GET',
      url: 'http://174.138.76.133:3000/'+item.pais+'/'+item.pagina
    }).then(function successCallback(response) {
      // console.log(item);
      console.log(response);
      $scope.noticias = response.data;
      console.log($scope.noticias);
    });
  }

  //Recuperando data e dias da semana
  $scope.dias = [
    {dia: 0, nome: 'Domingo'},
    {dia: 1, nome: 'Segunda-feira'},
    {dia: 2, nome: 'Terça-feira'},
    {dia: 3, nome: 'Quarta-feira'},
    {dia: 4, nome: 'Quinta-feira'},
    {dia: 5, nome: 'Sexta-feira'},
    {dia: 6, nome: 'Sábado-feira'}
  ]

  $scope.hoje = new Date().getUTCDay(); // 0(Sunday) to 6(Saturday).
  $scope.dia = new Date().getUTCDate();
  $scope.mes = new Date().getUTCMonth();
  $scope.ano = new Date().getUTCFullYear();

  for(var i = 0; i <= $scope.dias.length-1; i++){
    if($scope.dias[i].dia == $scope.hoje){
      $scope.diaSemana = $scope.dias[i].nome;
    }
  }

  //$scope.jornalClicado = function() {

  // $interval(function(){
  //   $scope.listaJornais = [];
  //   $scope.listaJornais[0] = {nomeJornal : "g1", jornal : $scope.g1};
  //   $scope.listaJornais[1] = {nomeJornal : "folha", jornal : $scope.folha};
  //   $scope.listaJornais[2] = {nomeJornal : "estadao", jornal : $scope.estadao};
  //   $scope.listaJornais[3] = {nomeJornal : "otempo", jornal : $scope.otempo};
  //   $scope.listaJornais[4] = {nomeJornal : "oglobo", jornal : $scope.oglobo};
  //
  //   console.log(jornalClicado());
  //
  //   var buscar = function(nomePais) {
  //     for (var i = 0; i < $scope.listaJornais.length; i++) {
  //       if ($scope.listaJornais[i].nomeJornal == nomePais) {
  //         return $scope.listaJornais[i].jornal;
  //       }
  //     }
  //     return null;
  //   }
  //
  //   $scope.selecionado = buscar($scope.jornalSelecionado);
  //
  // }, 1000, 1);
  //}

  // $scope.abrirNoticia = function(noticia) {
  //   //botar variável que vai receber o noticia.link
  //   // $scope.linkNoticia = $scope.noticia.link;
  //   document.getElementById("lerNoticia").innerHTML='<iframe src="http://www.google.com/custom?q=&btnG=Search" style="width: 100%; height: 1000px; padding: 0px;"></iframe>';
  // }
  // C:/Users/Guilherme/Desktop/Bootcamp/Projetos/netflix/index.html
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


  // var paisSelect = function(){
  //
  // }
  //
  // var buscar = function(pagina) {
  //   for (var i = 0; i < listaPaises.length; i++) {
  //     if (listaPaises[i].nome == pagina) {
  //       return listaPaises[i];
  //     }
  //   }
  //   return null;
  // }

});
}]);

.controller('LoginController', function($scope, $state, $http) {
  $scope.data = {};

  $scope.logar = function() {

    $http.post('http://localhost:3000/login', $scope.data).then(function(resposta){
      if(!resposta.data){
        alert('Login invalido');
        return;
      }
      Sessao.inicializar(resposta.data);
      $state.go('app.home');
    })
  };
  $scope.irCadastro = function() {
    $state.go("cadastro");

  }
})

.controller('CadastroController', function($scope, $state, $http) {
  $scope.dados = {};

  $scope.cadastrar = function(){
    console.log($scope.dados);
    $http.post('http://localhost:3000/usuario', $scope.dados).then(function(resposta){
      console.log($scope.dados);
      Sessao.inicializar(resposta.dados);
      console.log($scope.dados);
      console.log("Cadastro ok!")
    })
  }
  $scope.cancelar = function() {
    $state.go("app.home");

  }
})
