//JS-dokument for funksjonalitet

/*
 Data som behandles i denne filen er hentet fra følgende adresser: 
************************************************************************
*   |-------------------------------------------------------------|    *
*   | Befolkning: http://wildboy.uib.no/~tpe056/folk/104857.json  |    *
*   | Sysselsatte: http://wildboy.uib.no/~tpe056/folk/100145.json |    *
*   | Utdanning: http://wildboy.uib.no/~tpe056/folk/85432.json    |    *
*   |-------------------------------------------------------------|    *
************************************************************************
*/

//-----------------------Hvis/skjul blokkelementer-----------------------//

// Sørger for at bare 1 av de fire blokk-elemente er synlig til enhver tid. Blir styrt gjennom nav-bar
function showHide(div) {
  var liste = ["introduction", "overview", "details", "comparison"];
  for (var i in liste) {
    if (liste[i] == div) {
      document.getElementById(liste[i]).style.display = "block";
    }
    else{
      document.getElementById(liste[i]).style.display = "none";
    }
  }
}

function enableNavigationButtons() {
  document.getElementById("introduksjonButton").disabled = false;
  document.getElementById("oversiktButton").disabled = false;
  document.getElementById("detaljerButton").disabled = false;
  document.getElementById("sammenligningButton").disabled = false;
}

function logLoadingMessage() {
  console.log("Datasettene er lastet ned");
}

//-----------------------Konstruktør-----------------------//

function konstruktør(fil){
  this.data = undefined; 
  //Her kommer datasettene når de er lastet neds
  this.getNames = function() {
    var liste = [];
    for (var f in this.data) {
      //lager en liste med alle navnene
      liste.push(f); 
    }
    return liste;
  };
  this.getIDs = function() {
    var liste = [];
    for (var f in this.data) {
      //lager en liste med alle kommunenummrene
      liste.push(this.data[f].kommunenummer); 
    }
    return liste;
  };
  this.getInfo = function(kn){
     //Går gjennom alle kommunenummrene
    for (var g in this.data) {
       //Når vi kommer til det rette kommunenummerets
      if (this.data[g].kommunenummer == kn){
        var q = new Object({});
        q.name = g;
        q.data = this.data[g];
        // og informasjonen om datasettet.
        return q; 
      }
    }
  };
  this.load = function(kategori) { 
    //denne funksjonen sender forespørsel om å laste ned datasettet.
    var respons = undefined;
    var htp = new XMLHttpRequest();
    htp.open("GET", fil, true);
    htp.onreadystatechange = function() {
      if (htp.readyState == 4 && htp.status == 200){
        respons = JSON.parse(htp.responseText);
        //kategori avgjør hvilke objektet som skal få datasettet
        if (kategori == "befolk") { 
          // datasetter blir så lagt til i data til objektet
          befolkning.data = respons.elementer; 
        }
        if (kategori == "syssels") {
          sysselsatte.data = respons.elementer;
        }
        if (kategori == "utdan") {
          utdanning.data = respons.elementer;
         //Kaller på onload metoden
          utdanning.onload();
        }
      }
    };
    htp.send();
  };
}

//Her oppretter vi objekter hvor hvert av datasettene og gir dem onload-egenskapen.
var befolkning = new konstruktør("http://wildboy.uib.no/~tpe056/folk/104857.json");
befolkning.load("befolk");

var sysselsatte = new konstruktør("http://wildboy.uib.no/~tpe056/folk/100145.json");
sysselsatte.load("syssels");

var utdanning = new konstruktør("http://wildboy.uib.no/~tpe056/folk/85432.json");
utdanning.onload = function() {
  logLoadingMessage();
  enableNavigationButtons();
};
utdanning.load("utdan");

//-----------------------Lage tabell-----------------------//

/*
id1 = iden til tabellen som raden skal bli lagt til
id2 = iden til raden som blir lagt til
data = det som skal stå i første celle i raden
*/
function lagEnRad(id1, id2, data) {
  var vv = document.createElement("TR");
  vv.setAttribute("id", id2);
  document.getElementById(id1).appendChild(vv);
  var m = document.createElement("TD");
  var n = document.createTextNode(data);
  m.appendChild(n);
  document.getElementById(id2).appendChild(m);
}

/*
id = iden til den raden som skal ha celler
data = er det som skal stå i cellen som blir lagt til
*/
function leggTilInfoIRaden(id, data) {
  var cc = document.createElement("TD");
  var dd = document.createTextNode(data);
  cc.appendChild(dd);
  document.getElementById(id).appendChild(cc);
}

//Denne funksjonen sjekker om nummer er gyldig
function nummerSkjekk(nummer) {
 if (befolkning.getInfo(nummer) == undefined) {
    return false;
  }
  else {
   //Skjekker at nummeret er det samme i hvert datasett
    if (befolkning.getInfo(nummer).name == sysselsatte.getInfo(nummer).name && befolkning.getInfo(nummer).name == utdanning.getInfo(nummer).name) {
      return true;
    }
    else {
      return false;
    }
  }
}

//-----------------------Oversikt-----------------------//


function oversiktTabell() {
 //Tømmer diven for ny tabell
 document.getElementById("alleKommunene").innerHTML = "";
 //Lager en tabell
  var x = document.createElement("TABLE");
  x.setAttribute("id", "oversiktTable");
  document.getElementById("alleKommunene").appendChild(x);

  lagEnRad("oversiktTable", "byane", "Kommuner");
  lagEnRad("oversiktTable", "KN", "Kommunenr.");
  lagEnRad("oversiktTable", "sistBefolk", "Sist målte befolkning");

  for (var i in befolkning.data) {
    leggTilInfoIRaden("byane", i);
    leggTilInfoIRaden("KN", befolkning.data[i].kommunenummer);
    var lista = [];
    for (var u in befolkning.data[i].Menn) {
      lista.push(u);
    }
    var punkt = lista.length - 1;
    var menn = befolkning.data[i].Menn[lista[punkt]];
    var kvinner = befolkning.data[i].Kvinner[lista[punkt]];
    leggTilInfoIRaden("sistBefolk", menn + kvinner);
  }
}

function aktiverOversikt(target) {
 oversiktTabell();
 showHide(target);
}

//-----------------------Befolkning del-tabell-----------------------//

function befolkningTabell(iden) {
 //Henter informasjon om den kommunen
  var be = befolkning.getInfo(iden);
 //Legger til "Befolkning som overskirft over befolkningstabellen
  var overskr = document.createElement("H2");
  overskr.innerHTML = "Befolkning";
  document.getElementById("befolkning").appendChild(overskr); 

  //Oppretter en tabell
  var x = document.createElement("TABLE"); 
  //Gir den ID : MyTable
  x.setAttribute("id", "myTable"); 
  //Legger tabellen til befolkning-diven
  document.getElementById("befolkning").appendChild(x);
  lagEnRad("myTable", "år", "År");
  lagEnRad("myTable", "antall", "Antall");

  for (var i in be.data.Menn) {
    //Går gjennom hver årstall
    leggTilInfoIRaden("år", i);
  }

  for (var i in be.data.Menn) {
    //Går gjennom hvert år her også
    leggTilInfoIRaden("antall", be.data.Menn[i] + be.data.Kvinner[i]);
  }
}

//-----------------------Sysselsatte del-tabell-----------------------//

function sysselsatteTabell(iden) {
  var overskr = document.createElement("H2");
  overskr.innerHTML = "Sysselsatte";
  document.getElementById("sysselsatte").appendChild(overskr);

  //Henter informasjon om sysselsetting om den gitte byen
  var sy = sysselsatte.getInfo(iden); 

  //Oppretter en tabell
  var x = document.createElement("TABLE"); 
  x.setAttribute("id", "myTable2");
  document.getElementById("sysselsatte").appendChild(x);

  lagEnRad("myTable2", "årene", "År");

  lagEnRad("myTable2", "antallet", "Prosentandel");

  for (var i in sy.data["Begge kjønn"]) {
    //Går gjennom hvert år
    //Legger til året i den ene table rowen
    leggTilInfoIRaden("årene", i);
  }

  for (i in sy.data["Begge kjønn"]) {
    //Går gjennom hvert år
    //Legger til antall sysselsatte for hvert år i raden med id "antallet"
    leggTilInfoIRaden("antallet", sy.data["Begge kjønn"][i]);
  }
}

//-----------------------Utdanning del-tabell-----------------------//

function utdanningTabell(iden) {
  var overskr = document.createElement("H2");
  overskr.innerHTML = "Utdanning";
  document.getElementById("utdannede").appendChild(overskr);

  //Henter informasjon om utdanning fra gitte byen
  var ut = utdanning.getInfo(iden); 

  //Lager en tabell
  var x = document.createElement("TABLE"); 
  x.setAttribute("id", "myTable3");
  document.getElementById("utdannede").appendChild(x);

  //Den første cellen i raden blir Utdanning/År
  lagEnRad("myTable3", "åra", "Utdanninger/År"); 

  for (var u in ut.data["11"].Menn) {
    //Går gjennom hvert år
    leggTilInfoIRaden("åra", u);
  }

  //Lager en variabel med alle de mulige utdanningene
  var utdanninger = ["11", "01", "02a", "03a", "04a", "09a"]; 
  for (var i = 1; i < 7; i++) {
    //Lager en loop som gåes gjennom 6 ganger
    var id = "antallene" + i; //Oppretter forskjellige ider for hver loop, antallene1, antallene2 osv...

    lagEnRad("myTable3", id, utdanninger[i - 1]);
  }
  var i = 1;
  for (u in utdanninger) {
    var id = "antallene" + i;
    for (var f in ut.data["11"].Menn) {
      //tall1 = prosent menn som har tatt denne utdanningstypen
      var tall1 = ut.data[utdanninger[i - 1]].Menn[f]; 
      //tall2 = prosent kvinner som har tatt denne utdanningstypen
      var tall2 = ut.data[utdanninger[i - 1]].Kvinner[f];
      //g = gjennomsnittet av tall1 og tall2
      var g = (tall1 + tall2) / 2; 
      g = Math.round(g * 100) / 100; 
      //Gjør om tallet til 2 desimalers
      leggTilInfoIRaden(id, g);
    }
    i++;
  }
}


//id = hvilke liste liste-itemet skal bli lagt til i
//data = det som skal skal stå i liste-itemet
function lagListeItem(id, data) {
  var y = document.createElement("LI");
  var t = document.createTextNode(data);
  y.appendChild(t);
  document.getElementById(id).appendChild(y);
}

//Funksjon som lager en en punktvis liste

function punktvisInfo(nummer) {
//Definerer info fra hvert datasett
  var be = befolkning.getInfo(nummer),
  sy = sysselsatte.getInfo(nummer),
  ut = utdanning.getInfo(nummer);

 //Oppretter en usortert liste
  var punktListe = document.createElement("UL");
  punktListe.setAttribute("id", "minUL");
  document.getElementById("kortInfo").appendChild(punktListe);
//Lager et item med navnet
  lagListeItem("minUL", be.name);
//Lager en item med kommunenummer
  lagListeItem("minUL", "Kommunenummer: " + nummer);
//Plukker ut siste befolkning fra tabellen og laget et item med det
  var sisteBefolkning = document.getElementById("myTable").rows[1].cells[12].innerHTML;
  lagListeItem("minUL", "Siste måling av befolkning: " + sisteBefolkning);
//Plukker ut siste målte sysselsatte fra tabellen og lager et item med det
  var sisteSysselsatte = document.getElementById("myTable2").rows[1].cells[14].innerHTML;
  lagListeItem("minUL", "Siste måling av sysselsatte: " + sisteSysselsatte);
//Plukker ut siste året hvor det ble gjort en måling om utdanning
  var sisteÅr = document.getElementById("myTable3").rows[0].cells[39].innerHTML;
  //Beregninger for å finne ut mennesker med høyere utdanning
  var prosentKvinner1 = ut.data["03a"].Kvinner[sisteÅr];
  var prosentMenn2 = ut.data["03a"].Menn[sisteÅr];
  var prosentKvinner2 = ut.data["04a"].Kvinner[sisteÅr];
  var prosentMenn1 = ut.data["04a"].Menn[sisteÅr];
  var antallKvinner = be.data.Kvinner[sisteÅr];
  var antallMenn = be.data.Menn[sisteÅr];
  var utKvinner1 = Number(antallKvinner) / 100 * Number(prosentKvinner1);
  var utMenn1 = Number(antallMenn) / 100 * Number(prosentMenn1);
  var utKvinner2 = Number(antallKvinner) / 100 * Number(prosentKvinner2);
  var utMenn2 = Number(antallMenn) / 100 * Number(prosentMenn2);
  var høyereUt = utKvinner1 + utMenn1 + utKvinner2 + utMenn2;
  lagListeItem("minUL", "Sist målte personer med høyere utdanning: " + høyereUt);
}


//-----------------------Tabell-oppsett-----------------------//

function oppsett() {
  //Tømmer diven slik at den er klar for ny tabell
  document.getElementById("befolkning").innerHTML = ""; 
  //Tømmer diven..
  document.getElementById("sysselsatte").innerHTML = ""; 
   //Tømmer diven..
  document.getElementById("utdannede").innerHTML = "";
 //Tømmer div
 document.getElementById("kortInfo").innerHTML = "";
   //Nummer er den id'en som bruker vil få info om
  var nummer = document.getElementById("byenNummer").value;
  if (nummerSkjekk(nummer) == true) {
    //Gjør id'en til tekstverdi
    nummer = String(nummer); 
    //Henter tabell om befolkningen til den byen
    befolkningTabell(nummer); 
    //Henter tabell om sysselsetting til den byen
    sysselsatteTabell(nummer);
    //Henter tabell om utdanning til den byen 
    utdanningTabell(nummer); 
   //Lager en ul med info
   punktvisInfo(nummer);
  } else {
    var overskr = document.createElement("H2");
    overskr.innerHTML = "Det finnes ingen by med det kommunenummeret";
    document.getElementById("befolkning").appendChild(overskr);
  }
}

//-----------------------Sammenligning-----------------------//

function sammenlignByer() {
  //Lager to variabeler som bruker getInfo() egenskapen til å hente info om hver kommune
  var sy1 = sysselsatte.getInfo(
    document.getElementById("sammenligneNummer1").value
  ); //Henter informasjon om sysselsetting om den gitte byen
  var sy2 = sysselsatte.getInfo(
    document.getElementById("sammenligneNummer2").value
  );
  //Oppretter en tabbell
  var x = document.createElement("TABLE");
  x.setAttribute("id", "slTable");
  document.getElementById("sammenlignelser").appendChild(x);
  //Her lager vi en rad for årstallene
  lagEnRad("slTable", "årane", "År");
  //Her lager vi er rad for hver av byen for hvert kjønn.
  lagEnRad("slTable", "antallSY1Menn", sy1.name + " Menn");
  lagEnRad("slTable", "antallSY2Menn", sy2.name + " Menn");
  lagEnRad("slTable", "antallSY1Kvinner", sy1.name + " Kvinner");
  lagEnRad("slTable", "antallSY2Kvinner", sy2.name + " Kvinner");
  //Legger til hver år i tabellen
  for (var i in sy1.data.Menn) {
    leggTilInfoIRaden("årane", i);
  }
  //Legger til antall sysselsatte for hvert år i hver rad
  for (i in sy1.data.Menn) {
    leggTilInfoIRaden("antallSY1Menn", sy1.data.Menn[i]);
    leggTilInfoIRaden("antallSY2Menn", sy2.data.Menn[i]);
    leggTilInfoIRaden("antallSY1Kvinner", sy1.data.Kvinner[i]);
    leggTilInfoIRaden("antallSY2Kvinner", sy2.data.Kvinner[i]);
  }
 //Her skjekker vi om sammenliknelsen foregår av like byer eller ikke
 if (sy1.name == sy2.name) {
    undefined
  }
 else {
  //Her går vi gjennom hvert år og sammenligner det med det forje året.
  // Siden vi skulle se på økningen har vi startet på 2006, siden det ikke er noen økning fra 2004 til 2005.
  //Dersom starter var i på 2.
  //lager vi en variabel som viser økning i prosentpoeng for hver rad
  for (var i = 2; i < 15; i++) {
    var menn1Utvikling =
      document.getElementById("slTable").rows[1].cells[i].innerText -
      document.getElementById("slTable").rows[1].cells[i - 1].innerText;
    var menn2Utvikling =
      document.getElementById("slTable").rows[2].cells[i].innerText -
      document.getElementById("slTable").rows[2].cells[i - 1].innerText;
    var kvinner1Utvikling =
      document.getElementById("slTable").rows[3].cells[i].innerText -
      document.getElementById("slTable").rows[3].cells[i - 1].innerSText;
    var kvinner2Utvikling =
      document.getElementById("slTable").rows[4].cells[i].innerText -
      document.getElementById("slTable").rows[4].cells[i - 1].innerText;
    //Her ser vi hvilke rad som har størst økning og legger på stil
    if (menn1Utvikling > menn2Utvikling) {
      document.getElementById("slTable").rows[1].cells[i].style.color = "green";
      document.getElementById("slTable").rows[1].cells[i].style.fontWeight = "bold";
    } else {
      document.getElementById("slTable").rows[2].cells[i].style.color = "green";
      document.getElementById("slTable").rows[2].cells[i].style.fontWeight = "bold";
    }
    if (kvinner1Utvikling > kvinner2Utvikling) {
      document.getElementById("slTable").rows[3].cells[i].style.color = "green";
      document.getElementById("slTable").rows[3].cells[i].style.fontWeight = "bold";
    } else {
      document.getElementById("slTable").rows[4].cells[i].style.color = "green";
      document.getElementById("slTable").rows[4].cells[i].style.fontWeight = "bold";
    }
  }
 };
}

function sammenlign() {
  document.getElementById("sammenlignelser").innerHTML = "";
  var nummerEn = nummerSkjekk(document.getElementById("sammenligneNummer1").value);
  var nummerTo = nummerSkjekk(document.getElementById("sammenligneNummer2").value);
  if (nummerEn && nummerTo == true){
    sammenlignByer();
  }
  else {
    var h = document.createElement("H2");
    var t = document.createTextNode("Feil! Skriv inn to gyldige kommunenummer..");
    h.appendChild(t);
    document.getElementById("sammenlignelser").appendChild(h);
  }
}
