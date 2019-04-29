function befolkningKonstruktør(fil) {
  this.load = function() {
    var response = undefined;
    var htp = new XMLHttpRequest();
    htp.open("GET", fil, true);
    console.log(fil);
    htp.onreadystatechange = function() {
      if (htp.readyState == 4 && htp.status == 200){
        response = JSON.parse(htp.responseText);
        befolkningKonstruktør.prototype.data = new Object;
        for (i in response.elementer) {
          befolkningKonstruktør.prototype.data[i] = response.elementer[i];
        }
      }
    };

    htp.send();
  };
  this.getNames = function() {
    var liste = [];
    for (var f in this.data) {
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
      }
    }
  };
}

function sysselsatteKonstruktør(fil) {
  this.load = function() {
    var response = undefined;
    var htp = new XMLHttpRequest();
    htp.open("GET", fil, true);
    console.log(fil);
    htp.onreadystatechange = function() {
      if (htp.readyState == 4 && htp.status == 200){
        response = JSON.parse(htp.responseText);
        sysselsatteKonstruktør.prototype.data = new Object;
        for (i in response.elementer) {
          sysselsatteKonstruktør.prototype.data[i] = response.elementer[i];
        }
      };
    }
    htp.send();
  };
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
}

function utdanningKonstruktør(fil) {
  this.load = function() {
    var response = undefined;
    var htp = new XMLHttpRequest();
    htp.open("GET", fil, true);
    console.log(fil);
    htp.onreadystatechange = function() {
      if (htp.readyState == 4 && htp.status == 200){
        response = JSON.parse(htp.responseText);
        utdanningKonstruktør.prototype.data = new Object;
        for (i in response.elementer) {
          utdanningKonstruktør.prototype.data[i] = response.elementer[i];
        }
      };
    }
    htp.send();
  };
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
}

var befolkning = new befolkningKonstruktør("http://wildboy.uib.no/~tpe056/folk/104857.json");
var sysselsatte = new sysselsatteKonstruktør("http://wildboy.uib.no/~tpe056/folk/100145.json");
var utdanning = new utdanningKonstruktør("http://wildboy.uib.no/~tpe056/folk/85432.json");
