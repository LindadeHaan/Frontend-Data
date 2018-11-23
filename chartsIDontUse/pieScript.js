var margin = {top: 20, right: 20, bottom: 20, left: 28},
    width = 500 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom,
    radius = width/2

var color = d3.scaleOrdinal()
    .range(["#bbdefb", "90caf9", "64b5f6", "42a5f5", "2196f3", "1e88e5"])

// arc generator
var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0)

var labelArc = d3.arc()
    .outerRadius(radius - 50)
    .innerRadius(radius - 50)

// pie generator
var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.values.keys.value })

// define svg
var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 + ")")

// import the data
d3.json("/data1.json").then(function(data) {

  //parse data
  data.forEach(function(d) {
    d.values.keys.value = +d.values.keys.value // "23" -> 23
    d.values.keys.genre = d.values.keys.genre // "dectective" -> "detective"
  })
// append g elements arc
  var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc")

// append the path of the arc
  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.values.keys.genre) })

// append the text
  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"
    })
      .attr("dy", ".35em")
      .text(function(d) {return d.data.values.keys.genre} )

})
