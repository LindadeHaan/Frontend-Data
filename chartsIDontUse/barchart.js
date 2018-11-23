// Credits: Jessie
// Thise way I change the structure of my data together with d3.nest
function process(d) {
    const processed = {
        language: d.language,
        year: d.publicationYear,
        genre: d.genre
    }
	return processed
}

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom

var x0 = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1)

var x1 = d3.scaleBand()

// Begin with height because d3 works from the top left corner;
var y = d3.scaleLinear()
    .rangeRound([height, 0])

var xAxis = d3.axisBottom()
    .scale(x0)
    .tickSize(10)

var yAxis = d3.axisLeft()
    .scale(y)

// colors of the bars
var color = d3.scaleOrdinal()
    .range(["#ffa556", "#c20019", "#3019ff", "#000000", "#f7f00c",])

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

d3.json("data.json").then(function(data) {

  const dataMap = data.map(process)
  console.log('DataMap:', dataMap)
  // console.log("data", data)
  const languageCount = d3.nest()
    // .key(function(d) { return d.publicationYear})
    .key(function(d) { return d.genre })
    .key(function(d) { return d.language })
    .rollup(function(v) { return Number(v.length) })
    .entries(data)

// Credits: Maikel
// I do not fully understand this code.
    const objWithPercentage = languageCount.map(obj => {
      let total = 0
      obj.values.map(v => total += v.value)

      return {
          ...obj,
          values: obj.values.map(ov => ({
            ...ov,
            percent: ov.value / total * 100
          })),
          total,
      }
    })
    console.log("languageCount: ", objWithPercentage)

  var genres = languageCount.map(function(d) { return d.key })
  var languages = languageCount[0].values.map(function(d) { return d.value })

  x0.domain(genres)
  //x1.domain([0, d3.max(languageCount, function(d) { return d.key } )])
  x1.domain(languages).range([0, x0.bandwidth()])
  //y.domain([0, d3.max(languageCount, function(d) { return d3.max(d.values, function(d) { return d.value }) })])
  y.domain([0, 100])

  // text for the axis and the legend
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

  svg.append("g")
      .attr("class", "y axis")
      .style("opacity","0")
      .call(yAxis)
  .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "start")
      .style("font-weight","bold")
      .style("visibility", "visible")
      .text("Percentage")

  svg.select(".y").transition().duration(500).delay(1300).style("opacity","1")

  var slice = svg.selectAll(".slice")
      .data(objWithPercentage)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform",function(d) { return "translate(" + x0(d.key) + ",0)" })

  //make the bars
  slice.selectAll("rect")
      .data(function(d) { return d.values })
  .enter().append("rect")
      .attr("width", x1.bandwidth() )
      .attr("x", function(d) { return x1(d.value) })
      .style("fill", function(d) { return color(d.key) })
      .attr("y", function(d) { return y(0) })
      .attr("height", function(d) { return height - y(0) })
      .on("mouseover", function(d) {
          d3.select(this).style("fill", d3.rgb(color(d.key)).darker(2))
      })
      .on("mouseout", function(d) {
          d3.select(this).style("fill", color(d.key))
      })

  //animation
  slice.selectAll("rect")
      .transition()
      .delay(function (d) {return Math.random()*1000})
      .duration(1000)
      .attr("y", function(d) { return y(d.percent) })
      .attr("height", function(d) { return height - y(d.percent) })

  // legenda
  var legend = svg.selectAll(".legend")
      .data(languageCount[0].values.map(function(d) { return d.key }).reverse())
  .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")" })
      .style("opacity","0")

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d) { return color(d) })

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d })

  legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i }).style("opacity","1")


})
