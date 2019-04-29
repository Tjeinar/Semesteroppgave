// JS-dokument for funksjonalitet

/*
 JSON-filer som skal lastes inn og behandles: 
************************************************************************
*   |-------------------------------------------------------------|    *
*   | Befolkning: http://wildboy.uib.no/~tpe056/folk/104857.json  |    *
*   | Sysselsatte: http://wildboy.uib.no/~tpe056/folk/100145.json |    *
*   | Utdanning: http://wildboy.uib.no/~tpe056/folk/85432.json    |    *
*   |-------------------------------------------------------------|    *
************************************************************************
*/

// Globale variabler for filene som skal lastes inn 
bf_data = "http://wildboy.uib.no/~tpe056/folk/104857.json";
ss_data = "http://wildboy.uib.no/~tpe056/folk/100145.json";
ud_data = "http://wildboy.uib.no/~tpe056/folk/85432.json";

// Funksjon som tar inn en URL som argument og sender en forespørsel til nettadressen, og returnerer rådata, eller eventuelt returnerer en feilmelding. 
    function fetch_data(){
        bf_data = "http://wildboy.uib.no/~tpe056/folk/104857.json";
        ss_data = "http://wildboy.uib.no/~tpe056/folk/100145.json";
        ud_data = "http://wildboy.uib.no/~tpe056/folk/85432.json";

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
            var data = xhr.responseText;
            console.log(data);
            }
        };
        xhr.open("GET", ss_data, true);
        xhr.send();
        }
        fetch_data();

    function create_table_from_JSON(){}