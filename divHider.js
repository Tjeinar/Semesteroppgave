function divHider() {
    var divsToHide = document.getElementsByClassName("main"); //divsToHide is an array
    for(var i = 0; i < divsToHide.length; i++){
        divsToHide[i].style.visibility = "hidden"; // or
        divsToHide[i].style.display = "block"; // depending on what you're doing
    }
}
