

//'d19deecf-f61e-4f5b-a583-f79445eb041a'
var today = new Date();
var day = today.getDate() -7;
var month = today.getMonth();
var year = today.getFullYear();
var yes = new Date(year, month, day).toISOString()
console.log(yes)
var tokenDiv = document.getElementById("tokenkey");
var apiToken = tokenDiv.innerText;
var apiEndpointPath1 = "assignments?subject_type=kanji?started=true";
var requestHeaders =
new Headers({
    Authorization: 'Bearer ' + apiToken,
});
var apiEndpoint1 =
new Request('https://api.wanikani.com/v2/' + apiEndpointPath1, {
    method: 'GET',
    headers: requestHeaders
});
var apiEndpointPath2 = "review_statistics?subject_types=kanji";
var apiEndpoint2 =
new Request('https://api.wanikani.com/v2/' + apiEndpointPath2, {
    method: 'GET',
    headers: requestHeaders
});
var apiEndpointPath3 = "subjects?types=kanji";

var apiEndpoint3 =
new Request('https://api.wanikani.com/v2/' + apiEndpointPath3, {
    method: 'GET',
    headers: requestHeaders
});


const assignments = fetch(apiEndpoint1)
.then(response => response.json());
const review_statistics = fetch(apiEndpoint2)
.then(response => response.json());
const subjects = fetch(apiEndpoint3)
.then(response => response.json());


Promise.all([assignments, review_statistics, subjects])
.then(([assignData, reviewData, subjectData]) => {
    console.log("data1", assignData)
    console.log("data2", reviewData)
    console.log("data3", subjectData)
    var combinedData = [];


    for(var i in assignData.data){
        var tempObj = {};
        tempObj.id = assignData.data[i].data.subject_id;
        var tempsubject = subjectData.data.find(val=>
            val.id == tempObj.id
        )
        var tempreview = reviewData.data.find(val =>
            val.data.subject_id == tempObj.id 
        )
        if(tempsubject){
            tempObj.kanji = tempsubject.data.characters
            tempObj.level = tempsubject.data.level
        } else{
            continue;
        }
        if(tempreview){
            tempObj.percentage_correct = tempreview.data.percentage_correct;
        }
        if(assignData.data[i].data.burned_at){
            tempObj.burned = "BURNED"
        } else {
            tempObj.burned = "Not burned yet."
        }
        combinedData.push(tempObj);

    }
    combinedData.sort((a,b) => {
        return a.level - b.level
    })
    
    

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
    .style("box-shadow", "1px 5px 10px black")
    .attr("class", "canvas")
    
    const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip");


    const yMax = d3.max(combinedData, d => d.percentage_correct)
    const yMin = d3.min(combinedData, d => d.percentage_correct)
    const xScale = d3
    .scaleLinear()
    .domain([0, combinedData.length])
    .range([padding + "vw", w - padding + "vw"]);
    const yScale = d3
    .scaleLinear()
    .domain([0, yMax])
    .range([h - padding, padding])
    
    svg
    .selectAll("rect")
    .data(combinedData)
    .enter()
    .append("rect")
    .attr("width", 5)
    .attr("height", (d,i)=> h - yScale(d.percentage_correct) - padding + "vh")
    .attr("x", (d, i)=> xScale(i))
    .attr("y", d => yScale(d.percentage_correct) +  "vh")
    .style("fill", function(d){
        if(d.burned == "Not burned yet."){
            return "blue";
        } else {
            return "red"
        }
    })
    .attr("class", "bar")

    .on("mouseover", (d, i) => {
        tooltip
          .attr("percentage", d.percentage_correct)
          .html("Percentage correct = " + d.percentage_correct + "</br>Kanji = " + d.kanji + "</br>Level = " + d.level)
          .transition()
          .duration(200)
          .style("opacity", 1);
        
      })
      .on("mouseout", () => {
        tooltip.transition().duration(200).style("opacity", 0);
      });
})




