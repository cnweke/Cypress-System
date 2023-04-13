function showButton(){
    if(document.getElementById('terms').checked == true){
        document.getElementById('submitButton').style.display = "block"
    }else {
        document.getElementById('submitButton').style.display = "none"
    }
}