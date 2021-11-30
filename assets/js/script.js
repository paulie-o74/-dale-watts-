var redirect_uri = "http://0.0.0.0:8000/"

var client_id = "";
var client_secret = ""; 

const AUTHORIZE = "https://accounts.spotify.com/authorize"


function onPageLoad() {

}

function requestAuthorization(){
    client_id = document.getElementById("clientId").value;
    client_secret = document.getElementById("clientSecret").value;
    localStorage.setItem("client_id", client_id) ;
    localStorage.setItem("client_secret", client_secret); // In a real app you should not expose your client secret to the user

    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-library-read streaming user-top-read playlist-read-collaborative";
    window.location.href = url; // Show Spotify's authorization screen
}