

var today = new Date();
var day = today.getDate() -1;
var month = today.getMonth();
var year = today.getFullYear();
console.log(year, month, day)
var yes = new Date(year, month, day).toISOString()
console.log(yes)
var apiToken = 'd19deecf-f61e-4f5b-a583-f79445eb041a';
var apiEndpointPath = 'review_statistics?updated_after=' + yes;
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
    const datum = responseBody.data;
    datum.forEach((data) => {
    const svg = d3.select("body").append("svg").attr("height", 500).attr("width", 500).style("fill", "blue")
    svg
    .selectall("rect")
    .data(data.id)
    .enter()
    .attr("x", (d)=> d+1)
    })
});


