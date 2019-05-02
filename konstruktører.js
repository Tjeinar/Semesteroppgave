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
    for (f in this.data) {
      liste.push(f);
    }
    return liste;
  };
  this.getIDs = function() {
    var liste = [];
    for (f in this.data) {
      liste.push(this.data[f].kommunenummer);
    }
    return liste;
  };
  this.getInfo = function(kn){
    for (g in this.data) {
      if (this.data[g].kommunenummer == kn){
        console.log(g)
        console.log(this.data[g]);
      };
    }
  };
  this.load = function hentData(kategori) {
    var respons = undefined;
    var htp = new XMLHttpRequest();
    htp.open("GET", fil, true);
    htp.onreadystatechange = function(callback) {
      if (htp.readyState == 4 && htp.status == 200){
        respons = JSON.parse(htp.responseText);
        if (kategori == "befolk") {
          for (i in respons.elementer) {
            befolkning.data = respons.elementer;
          }
          befolkning.onload();
        };
        if (kategori == "syssels") {
          for (i in respons.elementer) {
            sysselsatte.data = respons.elementer;
          }
          sysselsatte.onload();
        };
        if (kategori == "utdan") {
          for (i in respons.elementer) {
            utdanning.data = respons.elementer;
          }
          utdanning.onload();
        };
      };
    }
    htp.send();
  };
}

var befolkning = new konstruktør("http://wildboy.uib.no/~tpe056/folk/104857.json");
befolkning.onload = function() {
  enableNavigationButtons();
  removeLoadingMessage();
};
befolkning.load("befolk");

var sysselsatte = new konstruktør("http://wildboy.uib.no/~tpe056/folk/100145.json");
sysselsatte.onload = function() {
  enableNavigationButtons();
  removeLoadingMessage();
};
sysselsatte.load("syssels");

var utdanning = new konstruktør("http://wildboy.uib.no/~tpe056/folk/85432.json");
utdanning.onload = function() {
  enableNavigationButtons();
  removeLoadingMessage();
};
utdanning.load("utdan");
