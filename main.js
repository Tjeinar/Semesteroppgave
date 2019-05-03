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
    document.getElementById("commune-data").append(child);
}   

function add_horizontal_row(name, commune_data){

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
        });
        }
    };
    xhr.open("GET", ud_data , true);
    xhr.send();
    }
fetch_data();

//Funksjon for å lage tabell ut av formatert JSON-data