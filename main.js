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

//Globale variabler for filene som skal lastes inn 
bf_data = "http://wildboy.uib.no/~tpe056/folk/104857.json";
ss_data = "http://wildboy.uib.no/~tpe056/folk/100145.json";
ud_data = "http://wildboy.uib.no/~tpe056/folk/85432.json";

function find_lastest_date(commune_data){
    date_list = [];
    for(var date in commune_data.Menn){
        date_list.push(date);
    }
    console.log(date_list);
}

function add_vertical_row(name, commune_data){
    var row = 
        `<td>${name}</td>
        <td>${commune_data.kommunenummer}</td>
        <td>${commune_data.Menn["2018"]}</td>
        <td>${commune_data.Kvinner["2018"]}</td>`;
        
    var child = document.createElement("tr");
    child.innerHTML = row;
    document.getElementById("overview-small-screen").append(child);
}   

function add_horizontal_row(name, commune_data){


    var row_1 = `${name}`;
    var child_1 = document.createElement("td");
    child_1.innerHTML = row_1;
    document.getElementById("overview-name").append(child_1);

    var row_2 = `${commune_data.kommunenummer}`;
    var child_2 = document.createElement("td");
    child_2.innerHTML = row_2;
    document.getElementById("overview-nr").append(child_2);

    var row_3 = `${commune_data.Menn["2018"]}`;
    var child_3 = document.createElement("td");
    child_3.innerHTML = row_3;
    document.getElementById("overview-m").append(child_3);

    var row_4 = `${commune_data.Kvinner["2018"]}`;
    var child_4 = document.createElement("td");
    child_4.innerHTML = row_4;
    document.getElementById("overview-w").append(child_4);
}

function enableNavigationButtons() {
    //Noe drit her
  }
  
  function removeLoadingMessage() {
    //Enda mer drit her
  }

//Konstruktør
  
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
          if (category.startswith("befolk")) {
            population.data = response.elementer;
            population.onload();
          }
          if (category.startswith("syssels")) {
            working_population.data = response.elementer;
            working_population.onload();
          }
          if (category.startswith("utdann")) {
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
  