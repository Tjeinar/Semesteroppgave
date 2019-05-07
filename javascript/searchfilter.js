// Funksjon for å filtrere søk basert på input 
function searchFunction() {
    var input = document.getElementById("searchTerm");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("myTable");
    var tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
      // Skjul rekke i starten
      tr[i].style.display = "none";
    
      td = tr[i].getElementsByTagName("td");
      for (var j = 0; j < td.length; j++) {
        cell = tr[i].getElementsByTagName("td")[j];
        if (cell) {
          if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            break;
          } 
        }
      }
    }
  }