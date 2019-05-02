function enableNavigationButtons() {
  //Noe drit her
}

function removeLoadingMessage() {
  //Enda mer drit her
}

function konstruktør(fil){
  this.data = undefined;
  this.getNames = function() {
    var liste = [];
    for (var name in this.data){
      liste.push(name);
    }
    return liste;
  };
  this.getIDs = function() {
    var liste = [];
    for (var id in this.data) {
      liste.push(this.data[id].kommunenummer);
    }
    return liste;
  };
  this.getInfo = function(kn){
    for (var info in this.data) {
      if (this.data[info].kommunenummer == kn){
        console.log(info);
        console.log(this.data[id]);
      }
    }
  };
  //Funksjon som tar inn en URL som argument og sender en forespørsel til nettadressen, og returnerer rådata, eller eventuelt returnerer en feilmelding. 
  this.load = function fetch_data(category) {
    var response = undefined;
    //Definerer variabel for forespørsel-objektet
    var htp = new XMLHttpRequest();
    //Sjekker om objektet har fått endret tilstand
    htp.onreadystatechange = function() {
      //readystate(4) == DONE, dvs at forespørselen er ferdig
      //status(200) == OK, dvs at forespørselen returnerte med OK
      if (htp.readyState == 4 && htp.status == 200){
      //Lagrer responen til variabel "response"
        response = JSON.parse(htp.responseText);
      //Dersom parameteret gitt til funksjonen starter med befolking
        if (category.startswith("befolk")) {
          population.data = response.elementer;
          population.onload();
        }
        if (category.startswith("syssels")) {
          working.data = response.elementer;
          working.onload();
        }
        if (category.startswith("utdann")) {
          education.data = response.elementer;
          education.onload();
        }
      }
    };
    htp.open("GET", fil, true);
    htp.send();
  };
}

var population = new konstruktør("http://wildboy.uib.no/~tpe056/folk/104857.json");
population.onload = function() {
  enableNavigationButtons();
  removeLoadingMessage();
};
population.load("befolk");

var working = new konstruktør("http://wildboy.uib.no/~tpe056/folk/100145.json");
working.onload = function() {
  enableNavigationButtons();
  removeLoadingMessage();
};
working.load("syssels");

var education = new konstruktør("http://wildboy.uib.no/~tpe056/folk/85432.json");
education.onload = function() {
  enableNavigationButtons();
  removeLoadingMessage();
};
education.load("utdan");
