function process(d) {
    const processed = {
        language: d.language,
        publicationYear: d.publicationYear,
        genre: d.genre
    }
  return processed
}

// var svg = d3.select("svg"),
//     width = +svg.attr("width"),
//     height = +svg.attr("height"),
//     radius = Math.min(width, height) / 2,
//     g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
var margin = 10
var radius = 100
var color = d3.scaleOrdinal(d3.schemeCategory10);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.genre; });

var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

// var label = d3.arc()
//     .outerRadius(radius - 40)
//     .innerRadius(radius - 40);

    d3.json("data.json").then(function(data) {
      const dataMap = data.map(process)
      console.log('DataMap:', dataMap)
      // console.log("data", data)
      const languageCount  = d3.nest()
        .key(function(d) { return d.publicationYear})
        .key(function(d) { return d.language })
        .key(function(d) { return d.genre })
        .rollup(function(v) { return v.length })
        .object(data)
        console.log(languageCount)
        // console.log(JSON.stringify(languageCount))

    var svg = d3.select("body").selectAll("div")
      .data(data)
    .enter().append("div") // http://code.google.com/p/chromium/issues/detail?id=98951
      .style("display", "inline-block")
      .style("width", (radius + margin) * 2 + "px")
      .style("height", (radius + margin) * 2 + "px")
    .append("svg")
      .attr("width", (radius + margin) * 2)
      .attr("height", (radius + margin) * 2)
    .append("g")
      .attr("transform", "translate(" + (radius + margin) + "," + (radius + margin) + ")");

      svg.append("text")
          .attr("dy", ".35em")
          .attr("text-anchor", "middle")
          .text(function(d) { return d.key })

        var g = svg.selectAll("g")
          .data(function(d) { return pie(d.genre) })
          .enter().append("g")

        g.append("path")
            .attr("d", path)
            .attr("fill", function(d) { return color(d.data.genre); })
            .append("title")
            .text(function(d) { return d.data.genre + ": " + d.data.language})

            // Add a label to the larger arcs, translated to the arc centroid and rotated.
    g.filter(function(d) { return d.endAngle - d.startAngle > .2; }).append("text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")"; })
        .text(function(d) { return d.data.genre; });

  console.log(g)
        // Computes the label angle of an arc, converting from radians to degrees.
    function angle(d) {
      var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
      return a > 90 ? a - 180 : a;
    }

      //   arc.append("text")
      //       .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      //       .attr("dy", "0.35em")
      //       .text(function(d) { return d.data.genre; });
  })









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
