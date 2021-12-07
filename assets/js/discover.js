// IIFE
const APIController = (function() {

    //2 variables
    const clientId = '';
    const clientSecret = '';

    // Private methods
    const _getToken = async () => {
        // spotify code
        const result = await fetch('https://accounts.spotify.com/api/token' , {
            method: 'POST' ,
            headers: {
                'content-Type' : 'application/x-www-form-urlencoded' , 
                'Authorizatiion' : 'Basic' + btoa(clientId + clientSecret)
            },
            body: 'grant_type-client_credentials'
        });

        const data = await result.json(); // Get data from body: and place in variable called result and convert that data to JSON
        return data.access_token; // store in a variable called data and pull the access_token property
    }
  // We will be able to use this token to call a spotify endpoint to give us playlists   
    
// Next... Create API methods to pull data for:
// Categories
// Category Playlists
// Playlist items (tracks)
// Tracks

const _getGenres = async (token) => {

    const result = await fetch(`https://api.spotify.com/v1/browse/categories`, 
    {
        method = 'GET',
        headers: { 'Authorization' : 'Bearer' + token}
    });

    const data = await result.json(); // same method as above
    return data.categories.items; // This returns an array of categories or genres which will be stored in the variable data 
}


const _getPlaylistByGenre = async (token, category_id) => {

    const limit = 10;
    const result = await fetch(`https://api.spotify.com/v1/browse/categories/${category_id}/playlists?limit=${limit}`, //template literals embedding expressions directly inside the string
    {
        method = 'GET',
        headers: { 'Authorization' : 'Bearer' + token}
    });

    const data = await result.json(); // same method as above
    return data.playlists.items; // This returns an array of playlists (10) from the selected Genre which will be stored in the variable data 
}

const _getTracks = async (token, tracksEndPoint) => {

    const limit = 10;
    const result = await fetch(`${tracksEndPoint}?limit=${limit}` ,
    {
        method = 'GET',
        headers: { 'Authorization' : 'Bearer' + token}
    });

    const data = await result.json(); // same method as above
    return data.items; // This returns an array of songs (10) from the selected playlist which will be stored in the variable data 
}

const _getTrack = async (token, trackEndPoint) => {

    const limit = 10;
    const result = await fetch(`${tracksEndPoint}` ,
    {
        method = 'GET',
        headers: { 'Authorization' : 'Bearer' + token}
    });

    const data = await result.json(); // same method as above
    return data; //This will be the object... the track 
}

//return methods we want to expose to outside scope, using closures because the publically declared methods have access to the privately implemented methods
return {
    getToken() {
        return _getToken();
    },
    getGenres(token) {
        return _getGenres(token);
    },
    getPlaylistByGenre(token, category_id) {
        return _getPlaylistByGenre(token, category_id);
    },
    _getTracks(token, tracksEndPoint) {
        return _getTracks(token, tracksEndPoint);
    },
    _getTrack(token, trackEndPoint) {
        return _getTrack(token, trackEndPoint);
    },
}

})(); //These 2 parenthesis means the function fires immediately

