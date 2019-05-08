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

function befolkningTabell(iden) {
  var overskr = document.createElement("H2");
  overskr.innerHTML = "Befolkning";
  document.getElementById("befolkede").appendChild(overskr);

  var be = befolkning.getInfo(iden); //Henter informasjon om den kommunen

  var x = document.createElement("TABLE"); //Oppretter en tabell
  x.setAttribute("id", "myTable"); //Gir den ID : MyTable
  document.getElementById("befolkede").appendChild(x); //Legger tabellen til befolkede-diven

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

function sysselsatteTabell(iden) {
  var overskr = document.createElement("H2");
  overskr.innerHTML = "Sysselsatte";
  document.getElementById("sysselsetting").appendChild(overskr);

  var sy = sysselsatte.getInfo(iden); //Henter informasjon om sysselsetting om den gitte byen

  var x = document.createElement("TABLE"); //Oppretter en tabbell
  x.setAttribute("id", "myTable2");
  document.getElementById("sysselsetting").appendChild(x);

  lagEnRad("myTable2", "årene", "År");

  lagEnRad("myTable2", "antallet", "Antall");

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

function utdanningTabell(iden) {
  var overskr = document.createElement("H2");
  overskr.innerHTML = "Utdanning";
  document.getElementById("utdannede").appendChild(overskr);

  var ut = utdanning.getInfo(iden); //Henter informasjon om utdanning fra gitte byen

  var x = document.createElement("TABLE"); //Lager en tabell
  x.setAttribute("id", "myTable3");
  document.getElementById("utdannede").appendChild(x);

  lagEnRad("myTable3", "åra", "Utdanninger/År"); //Den første cellen i raden blir Utdanning/År

  for (var u in ut.data["11"].Menn) {
    //Går gjennom hvert år
    leggTilInfoIRaden("åra", u);
  }

  var utdanninger = ["11", "01", "02a", "03a", "04a", "09a"]; //Lager en variabel med alle de mulige utdanningene
  for (var i = 1; i < 7; i++) {
    //Lager en loop som gåes gjennom 6 ganger
    var id = "antallene" + i; //Oppretter forskjellige ider for hver loop, antallene1, antallene2 osv...

    lagEnRad("myTable3", id, utdanninger[i - 1]);
  }
  var i = 1;
  for (u in utdanninger) {
    var id = "antallene" + i;
    for (var f in ut.data["11"].Menn) {
      var tall1 = ut.data[utdanninger[i - 1]].Menn[f]; //tall1 = prosent menn som har tatt denne utdanningstypen
      var tall2 = ut.data[utdanninger[i - 1]].Kvinner[f]; //tall2 = prosent kvinner som har tatt denne utdanningstypen
      var g = (tall1 + tall2) / 2; //g = gjennomsnittet av tall1 og tall2
      g = Math.round(g * 100) / 100; //Gjør om tallet til 2 desimaler
      leggTilInfoIRaden(id, g);
    }
    i++;
  }
}

function nuSkjerDet() {
  document.getElementById("befolkede").innerHTML = ""; //Tømmer diven slik at den er klar for ny tabell
  document.getElementById("sysselsetting").innerHTML = ""; //Tømmer diven slik at den er klar for ny tabell
  document.getElementById("utdannede").innerHTML = ""; //Tømmer diven slik at den er klar for ny tabell
  var nummer = document.getElementById("byenNummer").value; //Nummer er den id'en som bruker vil få info om
  if (Number(nummer) in befolkning.getIDs()) {
    nummer = String(nummer); //Gjør id'en til tekstverdi
    befolkningTabell(nummer); //Henter tabell om befolkningen til den byen
    sysselsatteTabell(nummer); //Henter tabell om sysselsetting til den byen
    utdanningTabell(nummer); //Henter tabell om utdanning til den byen
  } else {
    var overskr = document.createElement("H2");
    overskr.innerHTML = "Det finnes ingen by med det kommunenummeret";
    document.getElementById("befolkede").appendChild(overskr);
  }
}

function sammenliknByer() {
  document.getElementById("sammenliknelser").innerHTML = "";
  //Lager to variabeler som bruker getInfo() egenskapen til å hente info om hver kommune
  var sy1 = sysselsatte.getInfo(
    document.getElementById("sammenlikneNummer1").value
  ); //Henter informasjon om sysselsetting om den gitte byen
  var sy2 = sysselsatte.getInfo(
    document.getElementById("sammenlikneNummer2").value
  );
  //Oppretter en tabbell
  var x = document.createElement("TABLE");
  x.setAttribute("id", "slTable");
  document.getElementById("sammenliknelser").appendChild(x);
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
  //Her går vi gjennom hvert år og sammenlikner det med det forje året.
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
      document.getElementById("slTable").rows[3].cells[i - 1].innerText;
    var kvinner2Utvikling =
      document.getElementById("slTable").rows[4].cells[i].innerText -
      document.getElementById("slTable").rows[4].cells[i - 1].innerText;
    //Her ser vi hvilke rad som har størst økning og fargelegger det tallet som har størst økning
    if (menn1Utvikling > menn2Utvikling) {
      document.getElementById("slTable").rows[1].cells[i].style.color = "red";
    } else {
      document.getElementById("slTable").rows[2].cells[i].style.color = "red";
    }
    if (kvinner1Utvikling > kvinner2Utvikling) {
      document.getElementById("slTable").rows[3].cells[i].style.color = "red";
    } else {
      document.getElementById("slTable").rows[4].cells[i].style.color = "red";
    }
  }
}
