

//'d19deecf-f61e-4f5b-a583-f79445eb041a'
var today = new Date();
var day = today.getDate() -7;
var month = today.getMonth();
var year = today.getFullYear();
console.log(year, month, day)
var yes = new Date(year, month, day).toISOString()
console.log(yes)
var tokenDiv = document.getElementById("tokenkey");
var apiToken = tokenDiv.innerText;
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
    let wkdata = []
    for(var i in datum){
        wkdata[i] = [];
        for(var j in datum[i]){
            wkdata[i].push(datum[i][j])
        }
        wkdata.push(datum[i].data)
    }
    console.log(wkdata)
    const svg = d3
    .select("body")
    .append("svg")
    .attr("height", 500)
    .attr("width", 500)
    .style("box-shadow", "1px 5px 10px black");
    svg
    .selectAll("rect")
    .data(wkdata)
    .enter()
    .attr("width", 3)
    .attr("height", 3)
    .attr("x", (d, i)=> i+3)
    .attr("y", 0)
    .style("fill", "blue")
})



