function enableNavigationButtons() {
  //Noe drit her
}

function removeLoadingMessage() {
  //Enda mer drit her
}

function constructor(file){
  this.data = undefined;
  this.getNames = function() {
    var list = [];
    for (var name in this.data){
      list.push(name);
    }
    return list;
  };
  this.getIDs = function() {
    var list = [];
    for (var id in this.data) {
      list.push(this.data[id].kommunenummer);
    }
    return list;
  };
  this.getInfo = function(kommunenummer){
    for (var info in this.data) {
      if (this.data[info].kommunenummer == kommunenummer){
        console.log(info);
        console.log(this.data[id]);
      }
    }
  };
  //Funksjon som tar inn en URL som argument og sender en forespørsel til nettadressen, og returnerer rådata, eller eventuelt returnerer en feilmelding. 
  this.load = function fetch_data(category) {
    var response = undefined;
    //Definerer variabel for forespørsel-objektet
    var xhr = new XMLHttpRequest();
    //Sjekker om objektet har fått endret tilstand
    xhr.onreadystatechange = function() {
      //readystate(4) == DONE, dvs at forespørselen er ferdig
      //status(200) == OK, dvs at forespørselen returnerte med OK
      if (xhr.readyState == 4 && xhr.status == 200){
      //Lagrer responen til variabel "response"
        response = JSON.parse(xhr.responseText);
      //Dersom parameteret gitt til funksjonen starter med befolking
        if (category == "befolk") {
          population.data = response.elementer;
          population.onload();
        }
        if (category == "syssels") {
          working_population.data = response.elementer;
          working_population.onload();
        }
        if (category.startswith == "utdann") {
          education.data = response.elementer;
          education.onload();
        }
      }
    };
    xhr.open("GET", file, true);
    xhr.send();
  };
}

var population = new constructor("http://wildboy.uib.no/~tpe056/folk/104857.json");
population.onload = function() {
  enableNavigationButtons();
  removeLoadingMessage();
};
population.load("befolk");

var working_population = new constructor("http://wildboy.uib.no/~tpe056/folk/100145.json");
working_population.onload = function() {
  enableNavigationButtons();
  removeLoadingMessage();
};
working_population.load("syssels");

var education = new constructor("http://wildboy.uib.no/~tpe056/folk/85432.json");
education.onload = function() {
  enableNavigationButtons();
  removeLoadingMessage();
};
education.load("utdan");



function displayDiv(id) {
  var diven = document.getElementsByClassName(id);
    for(var i = 0; i < diven.length; i++){
        diven[i].style.display = "initial";
    }
}

function hideDiv(id1, id2, id3) {
  var div1 = document.getElementsByClassName(id1);
  var div2 = document.getElementsByClassName(id2);
  var div3 = document.getElementsByClassName(id3);
  for(var i = 0; i < div1.length; i++){
      div1[i].style.display = "none";
  }
  for(var i = 0; i < div2.length; i++){
      div2[i].style.display = "none";
  }
  for(var i = 0; i < div3.length; i++){
      div3[i].style.display = "none";
  }
}
