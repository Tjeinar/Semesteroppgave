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
//TODO: Fikse rad for befolkningsdata 
ss_data = "http://wildboy.uib.no/~tpe056/folk/100145.json";
ud_data = "http://wildboy.uib.no/~tpe056/folk/85432.json";

//TODO: prøve å lage en funksjon som kan finne tidligste dato i et datasett
function find_lastest_date(commune_data){
    date_list = [];
    for(var date in commune_data.Menn){
        date_list.push(date);

    }
    console.log(date_list);
}


function add_vertical_row(name, commune_data){
    //TODO: Lage en sjekk på hvilket datasett som skal lages tabell av
    var row = 
        `<td>${name}</td>
        <td>${commune_data.kommunenummer}</td>
        <td>${commune_data.Menn["2018"]}</td>
        <td>${commune_data.Kvinner["2018"]}</td>`;
        
    var child = document.createElement("tr");
    child.innerHTML = row;
    //TODO: Fikse sånn at begge tabellene blir lastet inn (details-small-screen)
    document.getElementById("overview-small-screen").append(child);
}   

function add_horizontal_row(name, commune_data){

    //TODO: Lage en sjekk på hvilket datasett som skal lages tabell av

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

//Funksjon som tar inn en URL som argument og sender en forespørsel til nettadressen, og returnerer rådata, eller eventuelt returnerer en feilmelding. 
function fetch_data(data){
    bf_data = "http://wildboy.uib.no/~tpe056/folk/104857.json";
    //Definerer variabel for request-objektet
    var xhr = new XMLHttpRequest();
    //Sjekker om objektet har fått endret "state"
    xhr.onreadystatechange = function(){
        //readystate(4) == DONE, dvs at forespørselen er ferdig
        //status(200) == OK, dvs at forespørselen returnerte med OK 
        if(this.readyState == 4 && this.status == 200){
        //Lagrer responsen til variabel "data"
        var data = xhr.responseText;
        var parsed_data = JSON.parse(data);
        var communes = parsed_data.elementer;

        Object.keys(communes).forEach(function(commune, index){
            var commune_name = Object.keys(communes)[index];
            var commune_object = communes[commune];
            add_vertical_row(commune_name, commune_object);
            add_horizontal_row(commune_name, commune_object);
        });
        }
    };
    xhr.open("GET", bf_data , true);
    xhr.send();
    }
fetch_data();

//Funksjon for å lage tabell ut av formatert JSON-data