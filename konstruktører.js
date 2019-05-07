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


function befolkningTabell(iden) {
  var be = befolkning.getInfo(iden); //Henter informasjon fra onstruktøren

  var x = document.createElement("TABLE"); //Oppretter en tabell
  x.setAttribute("id", "myTable"); //Gir den ID : MyTable
  document.getElementById("befolkede").appendChild(x); //Legger tabellen til befolkede-diven

  var y = document.createElement("TR"); //Lager en tabel row for år
  y.setAttribute("id", "år"); //Gir den ID: år
  document.getElementById("myTable").appendChild(y); //Legger tabel-rowen til i tabellen

  var u = document.createElement("TR"); //Lager enda en table row for antall innbyggere
  u.setAttribute("id", "antall");
  document.getElementById("myTable").appendChild(u);

  for (i in be.data.Menn){ //Går gjennom hver årstall
    var aa = document.createElement("TD"); //Lager en tabel data
    var bb = document.createTextNode(i); //Oppretter en variabel som har verdien til det året vi er på
    aa.appendChild(bb); //Legger det året til i tabel data
    document.getElementById("år").appendChild(aa); //Legger tabel data til i tabel rowen
  }

  for (i in be.data.Menn){ //Går gjennom hvert år her også
    var cc = document.createElement("TD");
    var dd = document.createTextNode(be.data.Menn[i] + be.data.Kvinner[i]); //Men lager en variabel hvor vi legger sammen antall menn og kvinner som bodde der på dette året
    cc.appendChild(dd);
    document.getElementById("antall").appendChild(cc); //Legger det taøøet til i den andre table rowen.
  }
}

function sysselsatteTabell(iden) {
  var sy = sysselsatte.getInfo(iden); //Henter informasjon om sysselsetting om den gitte byen

  var x = document.createElement("TABLE"); //Oppretter en tabbell
  x.setAttribute("id", "myTable2");
  document.getElementById("sysselsetting").appendChild(x);

  var y = document.createElement("TR"); //Oppretter en table row for år
  y.setAttribute("id", "årene");
  document.getElementById("myTable2").appendChild(y);

  var u = document.createElement("TR"); //Oppretter table row for antall sysselsatte
  u.setAttribute("id", "antallet");
  document.getElementById("myTable2").appendChild(u);

  for (i in sy.data["Begge kjønn"]){ //Går gjennom hvert år
    var aa = document.createElement("TD");
    var bb = document.createTextNode(i);
    aa.appendChild(bb);
    document.getElementById("årene").appendChild(aa); //Legger til året i den ene table rowen
  }

  for (i in sy.data["Begge kjønn"]){ //Går gjennom hvert år
    var cc = document.createElement("TD");
    var dd = document.createTextNode(sy.data["Begge kjønn"][i]);
    cc.appendChild(dd);
    document.getElementById("antallet").appendChild(cc); //Legger til antall sysselsatte i den andre table rowen
  }
}

function utdanningTabell(iden) {
  var ut = utdanning.getInfo(iden); //Henter informasjon om utdanning fra gitte byen

  var x = document.createElement("TABLE"); //Lager en tabell
  x.setAttribute("id", "myTable3");
  document.getElementById("utdannede").appendChild(x);

  var y = document.createElement("TR"); //Legger til en rad for år
  y.setAttribute("id", "åra");
  document.getElementById("myTable3").appendChild(y);
  var m = document.createElement("TD");
  var n = document.createTextNode("Utdanninger/År"); //Den første cellen i raden blir Utdanning/År
  m.appendChild(n);
  document.getElementById("åra").appendChild(m);

  for (u in ut.data["11"].Menn){ //Går gjennom hvert år
    var cc = document.createElement("TD");
    var dd = document.createTextNode(u);
    cc.appendChild(dd);
    document.getElementById("åra").appendChild(cc); //Legger det året til i den første raden
  }

  var utdanninger = ["11", "01", "02a", "03a", "04a", "09a"]; //Lager en variabel med alle de mulige utdanningene
  for (var i = 1; i < 7; i++) { //Lager en loop som gåes gjennom 6 ganger
    var id = "antallene" + i; //Oppretter forskjellige ider for hver loop, antallene1, antallene2 osv...
    var y = document.createElement("TR"); //Lager en rad
    y.setAttribute("id", id); //Denne raden får forskjellig id for hver gang i loopen
    document.getElementById("myTable3").appendChild(y); //Legger den raden til i tabellen
    var k = document.createElement("TD"); //Lager en table data
    var l = document.createTextNode(utdanninger[i - 1]); ///Lager en tekstnode med en utdanningstype
    k.appendChild(l);
    document.getElementById(id).appendChild(k); ///Legger utdanningstypen til i raden

    for (u in ut.data[utdanninger[i-1]].Menn) { //Her går vi gjennom hvert år for den utdanningstypen
      var tall1 = ut.data[utdanninger[i-1]].Menn[u]; //tall1 = prosent menn som har tatt denne utdanningstypen
      var tall2 = ut.data[utdanninger[i-1]].Menn[u]; //tall2 = prosent kvinner som har tatt denne utdanningstypen
      var g = (tall1 + tall2) / 2; //g = gjennomsnittet av tall1 og tall2
      var z = document.createElement("TD");
      var t = document.createTextNode(g);
      z.appendChild(t);
      document.getElementById(id).appendChild(z); //Legger gjennomsnittet til i raden
    }
  }
}


function nuSkjerDet(){
  document.getElementById("befolkede").innerHTML = ""; //Tømmer diven slik at den er klar for ny tabell
  document.getElementById("sysselsetting").innerHTML = ""; //Tømmer diven slik at den er klar for ny tabell
  document.getElementById("utdannede").innerHTML = ""; //Tømmer diven slik at den er klar for ny tabell
  var nummer = document.getElementById("IDen_til_søkefelten_hvor_kommunenummeret_står").value; //Nummer er den id'en som bruker vil få info om
  nummer = String(nummer); //Forsikrer meg om at id'en går som tekstverdi
  befolkningTabell(nummer); //Henter tabell om befolkningen til den byen
  sysselsatteTabell(nummer); //Henter tabell om sysselsetting til den byen
  utdanningTabell(nummer);//Henter tabell om utdanning til den byen
}

