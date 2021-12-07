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
    } // We will be able to use this token to call a spotify endpoint to give us playlists 
})(); //These 2 parenthesis means the function fires immediately