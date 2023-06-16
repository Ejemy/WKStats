const { response } = require("express");



//'d19deecf-f61e-4f5b-a583-f79445eb041a'
const auth = (token) => {
    return new Promise((resolve, reject) => {
        var apiToken = token;
        var apiEndpointPath = 'user';
        var requestHeaders =
        new Headers({
            Authorization: 'Bearer ' + apiToken,
        });
        var apiEndpoint =
        new Request('https://api.wanikani.com/v2/' + apiEndpointPath, {
            method: 'GET',
            headers: requestHeaders
        });
        fetch(apiEndpoint)
        .then(response => response.json())
        .then((responseBody) => {
            if(responseBody.error){
                throw new Error(responseBody.error);
            } 
            resolve(responseBody) 
            
        })
        .catch((error) => {
            reject(error)
        })   
    })
    
}



module.exports = auth;