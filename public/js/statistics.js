

//'d19deecf-f61e-4f5b-a583-f79445eb041a'
var today = new Date();
var day = today.getDate() -7;
var month = today.getMonth();
var year = today.getFullYear();
var yes = new Date(year, month, day).toISOString()
console.log(yes)
var tokenDiv = document.getElementById("tokenkey");
var apiToken = tokenDiv.innerText;
var apiEndpointPath1 = "assignments";
var requestHeaders =
new Headers({
    Authorization: 'Bearer ' + apiToken,
});
var apiEndpoint1 =
new Request('https://api.wanikani.com/v2/' + apiEndpointPath1, {
    method: 'GET',
    headers: requestHeaders
});
var apiEndpointPath2 = "review_statistics";
var requestHeaders =
new Headers({
    Authorization: 'Bearer ' + apiToken,
});
var apiEndpoint2 =
new Request('https://api.wanikani.com/v2/' + apiEndpointPath2, {
    method: 'GET',
    headers: requestHeaders
});
const assignments = fetch(apiEndpoint1)
.then(response => response.json());
const subjects = fetch(apiEndpoint2)
.then(response => response.json());


Promise.all([assignments, subjects])
.then(([data1, data2]) => {
    combinedData = [];
    for(var i in data1.data){
        combinedData[i] = {}
        for(var j in data2.data){
            if(data1.data[i].data.subject_id == data2.data[j].data.subject_id){
                combinedData[i].subject_id = data1.data[i].data.subject_id;
                combinedData[i].burned_at = data1.data[i].data.burned_at;
                combinedData[i].subject_type = data1.data[i].data.subject_type;
                combinedData[i].percentage_correct = data2.data[j].data.percentage_correct;
            }
        }
    }
    
  
    
    
    console.log(combinedData)

    const w = 80;
    const h = 40;
    const padding = 1;
    const colors = [
        "#e60049",
        "#0bb4ff",
        "#50e991",
        "#e6d800",
        "#9b19f5",
        "#ffa300",
        "#dc0ab4"
      ];

    const svg = d3
    .select("body")
    .append("svg")
    .attr("height", h + padding + "vh")
    .attr("width", w + padding + "vw")
    .style("box-shadow", "1px 5px 10px black");
    
    
    //var root = d3.hierarchy(wkdata).sum((d) => d.data);
    //d3.treemap().size([w, h]).padding(2)(root);
    const yMax = d3.max(combinedData, d => d.percentage_correct)
    const yMin = d3.min(combinedData, d => d.percentage_correct)
    const xScale = d3
    .scaleLinear()
    .domain([0, combinedData.length])
    .range([padding + "vw", w - padding + "vw"]);
    const yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([h - padding, padding])
    
    svg
    .selectAll("rect")
    .data(combinedData)
    .enter()
    .append("rect")
    .attr("width", 3)
    .attr("height", (d,i)=> h - yScale(d.percentage_correct) - padding + "vh")
    .attr("x", (d, i)=> xScale(i))
    .attr("y", d => yScale(d.percentage_correct) +  "vh")
    .style("fill", function(d){
        if(d.burned_at == null){
            return "red"
        } else {
            return "blue"
        }
    })
})




