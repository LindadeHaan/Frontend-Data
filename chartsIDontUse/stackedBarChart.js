function process(d) {
    const processed = {
        language: d.language,
        year: d.publicationYear,
        genre: d.genre
    }
	return processed
}

var height = 500
var width = 500
var barWidth = 35
var barOffset = 5


d3.json("data.json").then(function(data) {
  const dataMap = data.map(process)
  console.log('DataMap:', dataMap)
  // console.log("data", data)
  const languageCount  = d3.nest()
    // .key(function(d) { return d.publicationYear})
    .key(function(d) { return d.genre })
    // .key(function(d) { return d.language })
    .rollup(function(v) { return v.length })
    .entries(data)
    console.log(languageCount)

    const chart = d3.select('#chart')
        .append("svg")
        .attr("transform", "translate(0,"+height+")")
        .attr("width", width)
        .attr("height", height)
        .style("background", "#f4f4f4")
        .selectAll("rect")
          .data(languageCount)
          .enter().append("rect")
            .style("fill", "lightgreen")
            .attr("width", barWidth)
            .attr("height", function(d) {
              console.log('year: ',d)
              console.log('amount: ',d.value)
              // const values = d[0].find(obj => obj.key == "2015").values[0].value
              // console.log("values: ", values)
              return d.value
            })
            .attr("x", function(d, i) { return i * (barWidth + barOffset) })
            .attr("y", function(d) { return height - d.value })





  })
