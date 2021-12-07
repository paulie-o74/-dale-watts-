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

//UI Module
const UIController = (function () {

    //Object to hold references to HTML selectors
    const DOMElements = {
        selectGenre: '#select_genre',
        selectPlaylist: '#select_playlist',
        buttonSubmit: 'btn_submit',
        divSongDetail: '#song-detail',
        hfToken: 'hidden_token',
        divSongList: '.song-list'
    }

    //Public Methods
    return {

        //Method to get input fields
        inputField() {
            return {
                genre: document.querySelector(DOMElement.selectGenres),
                playlist: document.querySelector(DOMElements.selectPlaylist),
                songs: document.querySelector(DOMElements.divSongList),
                submit: document.querySelector(DOMElements.buttonSubmt),
                songDetail: document.querySelector(DOMElements.divSongDetail),
            }
        },

        //need methods to create select list option. Then innerAdjacentHTML to enter HTML into specified place (beforeend means the last child element)
        createGenre(text, value) {
            const html = `<option value="${value}">${text}</option>`;
            document.querySelector(DOMElements.selectGenre).insertAdjacentHTML('beforeend', html);
        },

        createPlaylist(text, value) {
            const html = `<option value="${value}">${text}</option>`;
            document.querySelector(DOMElements.selectPlaylist).insertAdjacentHTML('beforeend', html);
        }, 

        //need method to create a track list group item
        createTrack(id, name) {
            const html = `<a href="#" class="list-group-item list-group-item-action list-group-item-light" id="${id}">${name}</a>`;
            document.querySelector(DOMElements.divSongList).insertAdjacentHTML('beforeend', html);
        },

        //need method to create the song detail
        createSongDetail(img, title, artist) {

            const detailDiv = document.querySelector(DOMElements.divSongDetail);
            //any time a user clicks a new song we need to clear out the song detail div
            detailDiv.innerHTML = '';

            const html = 
            `
            <div class= "row col-sm-12 px-0">
                <img src="${img}" alt="">
            </div>
            <div class= "row col-sm-12 px-0">
                <label for="Genre" class="form-label col-sm-12">${title}:</label>
            </div>
            <div class= "row col-sm-12 px-0">
            <label for="artist" class="form-label col-sm-12">${artist}:</label>
            </div>
            `;

            detailDiv.insertAdjacentHTML('beforeend', html)
        },

        resetTrackDetail() {
            this.inputField().songDetail.innerHTML = '';
        },

        resetTracks() {
            this.inputField().songs.innerHTML = '';
            this.resetTrackDetail();
        },

        resetPlaylist() {
            this.inputField().playlist.innerHTML = '';
            this.resetTracks
        }, 
    }
})

// Up until this point... UI has nothing to do with api (seperation of concerns)

