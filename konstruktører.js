function enableNavigationButtons() {
  //Noe drit her
}

function removeLoadingMessage() {
  //Enda mer drit her
}

function konstruktør(fil){
  this.data = undefined; //Her kommer datasettene når de er lastet ned
  this.getNames = function() {
    var liste = [];
    for (f in this.data) {
      liste.push(f); //lager en liste med alle navnene
    }
    return liste;
  };
  this.getIDs = function() {
    var liste = [];
    for (f in this.data) {
      liste.push(this.data[f].kommunenummer); //lager en liste med alle kommunenummrene
    }
    return liste;
  };
  this.getInfo = function(kn){
    for (g in this.data) { //Går gjennom alle kommunenummrene
      if (this.data[g].kommunenummer == kn){ //Når vi kommer til det rette kommunenummeret
        console.log(g) // logger vi navnet
        console.log(this.data[g]); // og informasjonen om datasettet.
      };
    }
  };
  this.load = function hentData(kategori) { //denne funksjonen sender forespørsel om å laste ned datasettet.
    var respons = undefined;
    var htp = new XMLHttpRequest();
    htp.open("GET", fil, true);
    htp.onreadystatechange = function() {
      if (htp.readyState == 4 && htp.status == 200){
        respons = JSON.parse(htp.responseText);
        if (kategori == "befolk") { //kategori avgjør hvilke objektet som skal få datasettet
          befolkning.data = respons.elementer; // datasetter blir så lagt til i data til objektet
          befolkning.onload(); // kaller på onload-funksjonen som man skulle.
        };
        if (kategori == "syssels") {
          sysselsatte.data = respons.elementer;
          sysselsatte.onload();
        };
        if (kategori == "utdan") {
          utdanning.data = respons.elementer;
          utdanning.onload();
        };
      };
    }
    htp.send();
  };
}

//Her oppretter vi objekter hvor hvert av datasettene og gir dem onload-egenskapen.
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
