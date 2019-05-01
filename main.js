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

function add_row(navn, kommune_data){
    var row = 
        `<td>${navn}</td>
        <td>${kommune_data.kommunenummer}</td>
        <td>${kommune_data.Menn["2018"]}</td>
        <td>${kommune_data.Kvinner["2018"]}</td>`;
        
    var child = document.createElement("tr");
    child.innerHTML = row;
    document.getElementById("kommuner-data").append(child);
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
        var kommuner = parsed_data.elementer;

        Object.keys(kommuner).forEach(function(kommune, index){
            var kommune_navn = Object.keys(kommuner)[index];
            var kommune_object = kommuner[kommune];
            add_row(kommune_navn, kommune_object);
            //console.log('Kommune', kommune_navn);
        });
        }
    };
    xhr.open("GET", bf_data , true);
    xhr.send();
    }
fetch_data();

//Funksjon for å lage tabell ut av formatert JSON-data


function change_table(){

}