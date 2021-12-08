// IIFE
const APIController = (function() {

    //2 variables
    const clientId = '420e58a078824941ac00393899f9d484';
    const clientSecret = '5c52722f64f74309834d6c82f311cc45';

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
        method = 'GET' ,
        headers: { 'Authorization' : 'Bearer ' + token}
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
})();

// Up until this point... UI has nothing to do with api (seperation of concerns)

// Next need to make a module (app) that will use both the above to pull the data from spotify and populate the UI fields 

const APPController = (function(UICtrl, APICtrl) {

    // Get input field object ref
    const DOMInputs = UICtrl.inputField();

    // Get genres on page load... using async allows us to use await so that we don't look for the token until we have retrieved it
    const loadGenres = async () => {
        //Get the token
        const token = await APICtrl.getToken();
        //store the token on the page
        UICtrl.storeToken(token);
        //Get the genres
        const genres = await APICtrl.getGenres(token);
        // Populate our genres select element (loop through each Genre using for each) then populate teh select field
        genres.forEach(element => UICtrl.createGenre(element.name, element.id));

    }

    //Create genre change event listener
    DOMInputs.genre.addEventListener('change', async () => {

        //when user changes genres, we need to reset the subsequent fields
        UICtrl.resetPlaylist();
        //Get the token, add method to store the token on the page so we don't need to keep hitting the API for the token
        const token = UICtrl.getStoredToken().token;
        //Get the genre select field
        const genreSelect = UICtrl.inputField().genre;
        //Get the selected genreId
        const genreId = genreSelect.options[genreSelect.selectedIndex].value;
        //Get the playlist data from Spotify based on the genre
        const playlist = await 
        // Load the playlist
        playlist.forEach(p => UICtrl.createPlaylist);
    });

    //Create submit button click event listener
    DOMInputs.submit.addEventListener('click', async (e) => {
        //prevent page reset
        e.preventDefault();
        UICtrl.resetTracks();
        //Get the token
        const token = UICtrl.getStoredToken().token;
        //Get the playlist field
        const playlistSelect = UICtrl.inputField().playlist;
        //Get the selected playlist
        const tracksEndPoint = playlistSelect.options[playlistSelect.selectedIndex].value;
        // Get the tracks from the api
        const tracks = await APICtrl._getTracks(token, tracksEndPoint);
        // Populate select list 
        tracks.forEach(t => UICtrl.createTrack(t.track.href, t.track.name));
    });

    //create song selection event listener... This is using event delegation, add the event listener to the parent div and when you click on 
    // any of the chicl elements then we also can recognise that it's been clicked
    // we use the e.target to determine which div we actually clicked on
    DOMInputs.tracks.addEventListener('click', async (e) => {
        //prevent page reset
        e.preventDefault();
        UICtrl.resetTrackDetail();
        //Get the token
        const token = UICtrl.getStoredToken().token;
        // Get the track endpoint
        const trackEndPoint = e.target.id;
        //Get the track object
        const track - await APICtrl.getTrack(token, trackEndPoint);
        //Load the track details
        UICtrl.createTrackDetail(track.album.images[2].url, track.name, track.artists[0].name);
    });

    return {
        init() {
            console.log('App is starting');
            loadGenres();
        }
    }

})(UIController, APIController);

//Need to call method to load the genres on page load 
APPController.init();