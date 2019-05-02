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
  this.load = function hentData(category) {
    var response = undefined;
    var htp = new XMLHttpRequest();
    htp.open("GET", fil, true);
    htp.onreadystatechange = function() {
      if (htp.readyState == 4 && htp.status == 200){
        response = JSON.parse(htp.responseText);
        if (category == "befolk") {
          for (var population in response.elementer) {
            population.data = response.elementer;
          }
          population.onload();
        }
        if (category == "syssels") {
          for (var working in response.elementer) {
            working.data = response.elementer;
          }
          working.onload();
        }
        if (category == "utdan") {
          for (var education in response.elementer) {
            education.data = response.elementer;
          }
          education.onload();
        }
      }
    };
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
