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
            resolve(responseBody.data) 
            
        })
        .catch((error) => {
            reject(error)
        })   
    })
    
}



module.exports = auth;