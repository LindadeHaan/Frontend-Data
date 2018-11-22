// function process(d) {
//     const processed = {
//         language: d.language,
//         year: d.publicationYear,
//         genre: d.genre
//     }
// 	return processed
// }
//
// d3.json("data.json").then(data => {
//
//   const dataMap = data.map(process)
//   console.log('DataMap:', dataMap)
//   // console.log("data", data)
//   const languageCount = d3.nest()
//     // .key(function(d) { return d.publicationYear})
//     .key(function(d) { return d.genre })
//     .key(function(d) { return d.language })
//     .rollup(function(v) { return Number(v.length) })
//     .entries(data)
//     // .filter(genre => genre.key !== "Stripverhaal")
//
//     const objWithPercentage = languageCount.map(obj => {
//       let total = 0
//       obj.values.map(v => total += v.value)
//
//       return {
//           ...obj,
//           values: obj.values.map(ov => ({
//             ...ov,
//             percent: ov.value / total * 100
//           })),
//           total,
//       }
//     })
//     console.log("languageCount: ", objWithPercentage)
    // console.log(JSON.stringify(objWithPercentage));

    const languageCount = [
    {
    "genre": "Detective",
    "language": "dut",
    "percentage": 57.9
  },
  {
  "genre": "Detective",
  "language": "eng",
  "percentage": 35.8
},
{
"genre": "Detective",
"language": "fre",
"percentage": 1.6
},
{
"genre": "Detective",
"language": "ger",
"percentage": 3.2
},
{
"genre": "Detective",
"language": "spa",
"percentage": 1.6
},
{
"genre": "Humor",
"language": "dut",
"percentage": 50.4
},
{
"genre": "Humor",
"language": "eng",
"percentage": 39.9
},
{
"genre": "Humor",
"language": "fre",
"percentage": 3.5
},
{
"genre": "Humor",
"language": "ger",
"percentage": 5.3
},
{
"genre": "Humor",
"language": "spa",
"percentage": 0.9
},
{
"genre": "Sciencefiction",
"language": "dut",
"percentage": 57.2
},
{
"genre": "Sciencefiction",
"language": "eng",
"percentage": 41.5
},
{
"genre": "Sciencefiction",
"language": "fre",
"percentage": 0.3
},
{
"genre": "Sciencefiction",
"language": "ger",
"percentage": 0.1
},
{
"genre": "Sciencefiction",
"language": "spa",
"percentage": 0.9
},
{
"genre": "Stripverhaal",
"language": "dut",
"percentage": 99.0
},
{
"genre": "Stripverhaal",
"language": "eng",
"percentage": 1.0
},
{
"genre": "Avontureroman",
"language": "dut",
"percentage": 69.8
},
{
"genre": "Avontureroman",
"language": "eng",
"percentage": 26.6
},
{
"genre": "Avontureroman",
"language": "fre",
"percentage": 1.1
},
{
"genre": "Avontureroman",
"language": "ger",
"percentage": 1.4
},
{
"genre": "Avontureroman",
"language": "spa",
"percentage": 1.1
},
{
"genre": "Romantisch Verhaal",
"language": "dut",
"percentage": 68.7
},
{
"genre": "Romantisch Verhaal",
"language": "eng",
"percentage": 26.1
},
{
"genre": "Romantisch Verhaal",
"language": "fre",
"percentage": 1.1
},
{
"genre": "Romantisch Verhaal",
"language": "ger",
"percentage": 2.4
},
{
"genre": "Romantisch Verhaal",
"language": "spa",
"percentage": 1.7
},

]

var dutData = [];
var engData = [];
var gerData = [];
var freData = [];
var spaData = [];

for(var i = 0; i < languageCount.length; i++){
	if (languageCount[i] ["language"] === "dut"){
		dutData.push(languageCount[i]);
	}else if (languageCount[i] ["language"] === "eng"){
		engData.push(languageCount[i]);
	} else if (languageCount[i] ["language"] === "ger"){
    gerData.push(languageCount[i]);
  } else if (languageCount[i] ["language"] === "fre") {
    freData.push(languageCount[i]);
  } else {
    spaData.push(languageCount[i]);
  }
}

//functions for toggling between data
function change(value){

	if(value === 'dut'){
		update(dutData);
	}else if(value === 'eng'){
		update(engData);
	} else if(value === 'ger'){
		update(gerData);
	} else if(value === 'fre'){
		update(freData);
	} else if(value === 'spa'){
		update(spaData);
	} else if (value === 'all'){
		update(languageCount);
	}
}

function update(data){
	//set domain for the x axis
	xChart.domain(data.map(function(d){ return d.genre; }) );
	//set domain for y axis
	yChart.domain( [0, d3.max(data, function(d){ return +d.percentage; })] );
  //yChart.domain([0, d3.max(languageCount, function(d){ return d.percent })])
  //yChart.domain([0, 100])

	//get the width of each bar
	var barWidth = width / data.length;
  console.log('chart: ', barWidth)

	//select all bars on the graph, take them out, and exit the previous data set.
	//then you can add/enter the new data set
  var bars = chart.selectAll(".bar")
					.remove()
					.exit()
					.data(data)
	//now actually give each rectangle the corresponding data
	  .enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", function(d, i){ return i * barWidth + 1 })
		.attr("y", function(d){ return yChart(d.percentage) })
		.attr("height", function(d){ return height - yChart(d.percentage) })
		.attr("width", barWidth - 1)
		.attr("fill", function(d){
      if(d.language === "dut"){
				return "rgb(251,180,174)";
			} else if (d.language === "eng"){
				return "rgb(179,205,227)";
			} else if (d.language === "ger") {
        return "rgb(255,0,0)";
      } else if (d.language === "fre") {
        return "rgb(0,255,0)";
      } else {
        return "rgb(0,0,255)";
      }
		});

	//left axis
	chart.select('.axis')
		  .call(yAxis)
	//bottom axis
	chart.select('.xAxis')
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.selectAll("text")
			.style("text-anchor", "end")
			.attr("dx", "-.8em")
			.attr("dy", ".15em")
			.attr("transform", function(d){
				return "rotate(-65)";
			});

}//end update

//set up chart
var margin = {top: 20, right: 20, bottom: 95, left: 50};
var width = 800;
var height = 500;

var chart = d3.select(".chart")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xChart = d3.scaleBand()
				.range([0, width])
        .padding(1)

var x1Chart = d3.scaleBand()

var yChart = d3.scaleLinear()
				.range([height, 0]);

var xAxis = d3.axisBottom()
            .scale(xChart)
            .tickSize(10)

var yAxis = d3.axisLeft()
            .scale(yChart);

//set up axes
//left axis
	chart.append("g")
		  .attr("class", "y axis")
		  .call(yAxis)

	//bottom axis
	chart.append("g")
		.attr("class", "xAxis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.selectAll("text")
			.style("text-anchor", "end")
			.attr("dx", "-.8em")
			.attr("dy", ".15em")
			.attr("transform", function(d){
				return "rotate(-65)";
			});

//add labels
chart
	.append("text")
	.attr("transform", "translate(-35," +  (height+margin.bottom)/2 + ") rotate(-90)")
	.text("% boeken per taal");

chart
	.append("text")
	.attr("transform", "translate(" + (width/2) + "," + (height + margin.bottom - 5) + ")")
	.text("Genres");

//use bothData to begin with
update(languageCount);

//})
