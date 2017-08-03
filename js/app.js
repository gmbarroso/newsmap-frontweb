// definindo e iniciando o módulo do angular
var app = angular.module("newsmap", ["leaflet-directive"]);

// Controller do MAPA
app.controller('MixedGeoJSONEventsWithIDController', [ "$scope", "$http", function($scope, $http, $interval) {

  //variável criada para alocar o usuário e utilizar no fim do código
  $scope.user = null;

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
      {id: 1, paper: 'Folha', pagina: 'Folha de São Paulo', pais: 'Brasil'},
      {id: 2, paper: 'Globo', pagina: 'G1', pais: 'Brasil'},
      {id: 3, paper: 'Estadão', pagina: 'Estadão', pais: 'Brasil'},
      {id: 4, paper: 'O Tempo', pagina: 'O Tempo', pais: 'Brasil'},
      {id: 5, paper: 'O Globo', pagina: 'O Globo', pais: 'Brasil'}
    ]
  },

  { nome : 'Argentina',
  conteudo : [
    {id: 1, paper: 'Clarín', pagina: 'clarin', pais: 'Argentina'},
    {id: 3, paper: 'Los Andes', pagina: 'los_andes', pais: 'Argentina'},
    {id: 4, paper: 'La Voz', pagina: 'la_voz', pais: 'Argentina'}
  ]
},

{ nome : 'Australia',
conteudo : [
  {id: 1, paper: 'The Age', pagina: 'the_age', pais: 'Australia'},
  {id: 4, paper: 'The Sydney Morning Herald', pagina: 'the_sydney_morning_herald', pais: 'Australia'}
]
},

{ nome : 'Canada',
conteudo : [
  {id: 1, paper: 'Toronto Star', pagina: 'toronto_star', pais: 'Canada'},
  {id: 2, paper: 'Vancouver Sun', pagina: 'vancouver_sun', pais: 'Canada'},
  {id: 3, paper: 'Metro News Canada', pagina: 'metro_news_canada', pais: 'Canada'},
  {id: 4, paper: 'National Post', pagina: 'national_post', pais: 'Canada'},
  {id: 5, paper: 'Ottawa Citizen', pagina: 'ottawa_citizen', pais: 'Canada'}
]
},

{ nome : 'Spain',
conteudo : [
  {id: 1, paper: 'El País', pagina: 'el_pais', pais: 'Espanha'},
  {id: 2, paper: 'El Mundo', pagina: 'el_mundo', pais: 'Espanha'},
  {id: 3, paper: 'La Vanguardia', pagina: 'la_vanguardia', pais: 'Espanha'},
  {id: 4, paper: 'ABC España', pagina: 'abc_espana', pais: 'Espanha'},
  {id: 5, paper: 'El Correo', pagina: 'el_correo', pais: 'Espanha'}
]
},

{ nome : 'United States of America',
conteudo : [
  {id: 2, paper: 'USA Today', pagina: 'usatoday', pais: 'eua'},
  {id: 3, paper: 'Washington Post', pagina: 'washpost', pais: 'eua'},
  {id: 4, paper: 'New York Daily News', pagina: 'nydaily', pais: 'eua'},
  {id: 5, paper: 'The Wall Street Journal', pagina: 'wallstreet', pais: 'eua'}
]
},

{ nome : 'France',
conteudo : [
  {id: 1, paper: 'Le Monde', pagina: 'lemonde', pais: 'franca'},
  {id: 2, paper: 'Le Figaro', pagina: 'figaro', pais: 'franca'},
  {id: 3, paper: 'Le Parisien', pagina: 'le_parisien', pais: 'franca'},
  {id: 4, paper: 'Ouest France', pagina: 'ouestfrance', pais: 'franca'},
  {id: 5, paper: "L'Express FR", pagina: 'lexpress', pais: 'franca'}
]
},

{ nome : 'Italy',
conteudo : [
  {id: 1, paper: 'La Stampa', pagina: 'la_stampa', pais: 'Italia'},
  {id: 2, paper: 'La Repubblica', pagina: 'larepubblica', pais: 'Italia'},
  {id: 3, paper: 'Corriere Della Sera', pagina: 'corriere_della_sera', pais: 'Italia'},
  {id: 4, paper: 'Il Sole 24 Ore', pagina: 'ilsole24ore', pais: 'Italia'},
  {id: 5, paper: 'Il Messaggero', pagina: 'il_messaggero', pais: 'Italia'}
]
},

{ nome : 'Japan',
conteudo : [
  {id: 1, paper: 'NHK Online', pagina: 'nhkonline'},
  {id: 2, paper: 'The Japan Times', pagina: 'thejapantimes'},
  {id: 3, paper: 'Asia Nikkei', pagina: 'asianikkei'},
  {id: 4, paper: 'Japan Today', pagina: 'japantoday'},
  {id: 5, paper: 'Asahi Shimbun', pagina: 'asahishimbun'}
]
},

{ nome : 'Mexico',
conteudo : [
  {id: 1, paper: 'La Jornada', pagina: 'la_jornada', pais: 'mexico'},
  {id: 2, paper: 'Reforma', pagina: 'reforma', pais: 'mexico'},
  {id: 3, paper: 'El Universal', pagina: 'el_universal', pais: 'mexico'}
]
},

{ nome : 'United Kingdom',
conteudo : [
  {id: 1, paper: 'The Daily Mail UK', pagina: 'thedailymailUK', pais: 'reinounido'},
  {id: 2, paper: 'Metro UK', pagina: 'metro_uk', pais: 'reinounido'},
  {id: 3, paper: 'BBC', pagina: 'bbc', pais: 'reinounido'},
  {id: 4, paper: 'The Guardian', pagina: 'the_guardian', pais: 'reinounido'}
]
},

{ nome : 'Venezuela',
conteudo : [{id: 1, paper: 'La Patilla', pagina: 'lapatilla'},
{id: 2, paper: 'El Universal', pagina: 'eluniversal'}
]
}
]

function openNavMapa() {
  document.getElementById("sidenavMapa").style.width = "700px";
  document.getElementById("pushMapa").style.marginLeft = "700px";
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
      url: 'http://174.138.76.133:3000/paises/'+item.pais+'/jornais/'+item.pagina+'/noticias'
    }).then(function successCallback(response) {
      // console.log(item);
      // console.log(response);
      $scope.noticias = response.data;
      // console.log($scope.noticias);
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

  //Refresh page no botão Home
  function refreshPage(){
    window.location.reload();
  }

  if ($scope.clickedCountry.id) {

    var bandeira = $scope.clickedCountry.id;
    var vetorFinal = [];
    for(i = 0; i < bandeira.length - 1; i++){
      vetorFinal.push(bandeira[i]);
    }
    $scope.agoraFoi = "";
    $scope.agoraFoi += vetorFinal[0];
    $scope.agoraFoi += vetorFinal[1];
    // console.log($scope.agoraVai.toLowerCase());
    bandeira.toLowerCase();
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
  // feature = $scope.listaPaises;
  return {
    fillColor: getColor($scope.countries[feature.id]),
    weight: 2,
    opacity: 1,
    color: 'grey',
    dashArray: '3',
    fillOpacity: 0.7
  };
  // if ($scope.listaPaises.nome) {
  //   return {
  //     fillColor: getColor
  //   }
  // }
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
  // console.log($scope.selectedCountry.id);
////////////////
  if ($scope.selectedCountry.id) {

    var bandeira = $scope.selectedCountry.id;
    var vetorFinal = [];
    for(i = 0; i < bandeira.length - 1; i++){
      vetorFinal.push(bandeira[i]);
    }
    $scope.agoraVai = "";
    $scope.agoraVai += vetorFinal[0];
    $scope.agoraVai += vetorFinal[1];
    // console.log($scope.agoraVai.toLowerCase());
    bandeira.toLowerCase();
  }
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


  $scope.logar = function() {
    // console.log($scope.lgn);
    $http.post('http://174.138.76.133:3000/login', $scope.lgn).then(function(resposta){
      $scope.user = resposta;
      // console.log(resposta);
    })
  };

  $scope.cadastrar = function(){
    // console.log($scope.cad);
    $http.post('http://174.138.76.133:3000/usuario', $scope.cad).then(function(resposta){
      // console.log(resposta);
    })
  };

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
