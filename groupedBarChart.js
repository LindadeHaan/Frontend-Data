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

// Source: https://bl.ocks.org/syncopika/f1c9036b0deb058454f825238a95b6be

d3.json("data1.json").then((languageCount) => {

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
				return "rgba(122, 1, 119, 0.6)";
			} else if (d.language === "eng"){
				return "rgba(197, 27, 138, 0.6)";
			} else if (d.language === "ger") {
        return "rgba(247, 104, 161, 0.6)";
      } else if (d.language === "fre") {
        return "rgba(251, 180, 185, 0.6)";
      } else {
        return "rgba(254, 235, 226, 0.6)";
      }
		})
    // source tooltip: https://bl.ocks.org/alandunning/274bf248fd0f362d64674920e85c1eb7
    .on("mousemove", function(d){
    tooltip
      .style("left", d3.event.pageX - 50 + "px")
      .style("top", d3.event.pageY - 120 + "px")
      .style("display", "inline-block")
      .style("font-size", "20px")
      .html((d.language) + "<br>" + (d.genre) + "<br>" + (d.percentage) + "%");
})
.on("mouseout", function(d){ tooltip.style("display", "none");});

	//left axis
	chart.select('.axis')
		  .call(yAxis)
	//bottom axis
	chart.select('.xAxis')
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.selectAll("text")
			.style("text-anchor", "end")
      .style("font-size", "20px")
			.attr("dx", "-.8em")
			.attr("dy", ".15em")
			.attr("transform", function(d){
				return "rotate(-65)";
			})

      // Animation
      chart.selectAll("rect")
          .data(data)
          .attr("y", 0)
          .attr("height", 0)
          .transition()
          .ease(d3.easeBounce)
          .delay(function (d) {return Math.random()*1000})
          .duration(1000)
          .attr("y", function(d) { return yChart(d.percentage) })
          .attr("height", function(d) { return height - yChart(d.percentage) })

}

//end update

//set up chart
var margin = {top: 20, right: 20, bottom: 95, left: 50};
var width = 1000;
var height = 600;

var tooltip = d3.select("body").append("div").attr("class", "toolTip");

var chart = d3.select(".chart")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xChart = d3.scaleBand()
				.range([0, width])

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
      .style("font-family", "Nexa Light, sans-serif")
      .style("font-size", "12px")

	//bottom axis
	chart.append("g")
		.attr("class", "xAxis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.selectAll("text")
      .style("font-size", "50px")
			.style("text-anchor", "end")
      .style("font-family", "Nexa Light, sans-serif")
			.attr("dx", "-.8em")
			.attr("dy", ".15em")
			.attr("transform", function(d){
				return "rotate(-65)";
			})

//add labels
chart
	.append("text")
	.attr("transform", "translate(-35," +  (height+margin.bottom)/2 + ") rotate(-90)")
  .style("fill", "#ffffff")
  .style("font-family", "Nexa Bold, sans-serif")
  .style("font-size", "18px")
	.text("% boeken")

chart
	.append("text")
	.attr("transform", "translate(" + (width/2) + "," + (height + margin.bottom + 100) + ")")
  .style("fill", "#ffffff")
  .style("font-family", "Nexa Bold, sans-serif")
  .style("font-size", "18px")
	.text("Genres")

d3.select("svg")
    // .style("width", 1000)
    .style("margin-left", "30px")
    .style("padding-left", "0")
    .style("height", "1000px")

//use languageCount to begin with
update(languageCount);
})
//})
