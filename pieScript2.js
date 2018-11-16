var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(["#DC143C", "#008B8B", "#9ACD32", "#FFEFD5"]);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.values; });

var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

d3.json("data1.json", function(d) {
  d.value = +d.value;
  return d;
}, function(error, data) {
  if (error) throw error;

  var arc = g.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  arc.append("path")
      .attr("d", path)
      .attr("fill", function(d) { return color(d.data.genre); });

  arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("dy", "0.35em")
      .text(function(d) { return d.data.genre; });
});







// var width = 960,
//     height = 500,
//     radius = Math.min(width, height) / 2
//
// var svg = d3.select("body")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .attr("radius", radius)
//     .append("g")
//     .attr("transform", "translate(" + width / 1.8 + "," + ((height / 2) + 10) + ")")
//
// var color = d3.scaleOrdinal(d3.schemeCategory20)
//
// var pie = d3.pie()
//     .sort(null)
//     .value(function(d){ return d.keys })
//
// var path = d3.arc()
//     .outerRadius(radius - 10)
//     .innerRadius(0)
//
// var label = d3.arc()
//     .outerRadius(radius + 10)
//     .innerRadius(radius + 10)
//
// svg.append("text")
//   .attr("transform", "translate(20,30)")
//   .attr("font-size", "2em")
//   .text("Genres")

// svg.append("text")
//   .attr("transform", "translate(20,60)")
//   .attr("font-size", "1em")
//   .text("(where do US individual income tax dollars go)")

// d3.json("data1.json", function(d){
//   d.keys = +d.keys
//   return d
// }, function(error, data) {
//   if (error) throw error
//
// var arc = g.selectAll(".arc")
//   .data(pie(data))
//   .enter().append("g")
//     .attr("class", "arc")
//
// arc.append("path")
//   .attr("d", path)
//   .attr("fill", function(d) {
//     return color(d.data.genre)
//   })
//
//   g.selectAll("text").data(pie(data))
//     .enter().append("text")
//     .attr("class", "legend")
//     .attr("transform", function(d) { return "translate(20,110)" })
//     .attr("dy", "0.35em")
//     .text(function(d) { return (100*d.data.keys).toPrecision(2) })

// var legendText = legendWrapper.selectAll("text")
//   .data(data)
//
// legendText.enter().append("text")
//   .attr("y", function(d, i) { return i * legendDotSize + 12 })
//   .attr("x", 20)
//   .merge(legendText)
//   .text(function(d){
//     return d.genre
//   })
//
// legendText.exit().remove()
//
// var legendDot = legendWrapper.selectAll("rect")
//   .data(data)
//
// legendDot.enter().append("rect")
//   .attr("y", function(d, i) { return i * legendDotSize; })
//   .attr("rx", legendDotSize * 0.5)
//   .attr("ry", legendDotSize * 0.5)
//   .attr("width", legendDotSize * 0.5)
//   .attr("height", legendDotSize * 0.5)
//   .merge(legendDot)
//   .style("fill", function(d) { return color(d.category); })
//
// legendDot.exit().remove()

//})
