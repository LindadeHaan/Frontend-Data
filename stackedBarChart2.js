function process(d) {
    const processed = {
        language: d.language,
        year: d.publicationYear,
        genre: d.genre
    }
	return processed
}

const svg = d3.select("svg")
const margin = {top: 20, right: 60, bottom: 30, left: 40}
const width = +svg.attr("width") - margin.left - margin.right
const height = +svg.attr("height") - margin.top - margin.bottom
const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")

const x = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1)
    .align(0.2)

var y = d3.scaleLinear()
    .range([height, 0])

var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

var stack = d3.stack()
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetExpand)

d3.json("data.json").then(function(data) {
  const dataMap = data.map(process)
  console.log("DataMap:", dataMap)
  // console.log("data", data)
  const languageCount  = d3.nest()
    // .key(function(d) { return d.publicationYear})
    .key(function(d) { return d.genre })
    .key(function(d) { return d.language })
    .rollup(function(v) { return v.length })
    .entries(data)
    .filter(genre => genre.key !== "Stripverhaal")
    console.log(languageCount)

    data.forEach(function(d){d.total=d.dut+d.eng+d.fre+d.ger+d.spa})
    data.sort(function(d) { return d.value })

     x.domain(languageCount.map(function(d) { return d.key; }))
     z.domain(["dut", "eng", "fre", "ger", "spa"]);

  const serie = g.selectAll(".serie")
    .data(stack.keys(["dut", "eng", "fre", "ger", "spa"])(languageCount))
    .enter().append("g")
     .attr("class", "serie")
     // .attr("fill", "lightgreen")
     .attr("fill", function(d) { return z(d.language) })

     serie.selectAll("rect")
    .data(languageCount)
    .enter().append("rect")
      .attr("x", x.bandwidth())
      //function(d) { return d.key })
      // function(d) { console.log("keys: ", d.key)
      //   return x(d.key); })
      .attr("y", function(d) {
        return d.values[0].value &&
              d.values[1].value &&
              d.values[2].value &&
              d.values[3].value &&
              d.values[4].value
      })
      // function(d) {
      //   // console.log(d.values[0].value, d.values[1].value)
      //   return d.values[0].value,
      //         d.values[1].value
      //   })
      .attr("height", function(d) {
        return d.values[0].value &&
              d.values[1].value &&
              d.values[2].value &&
              d.values[3].value &&
              d.values[4].value
       })
      .attr("width", x.bandwidth());

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"))


  // const legend = serie.append("g")
  //     .attr("class", "legend")
  //     .attr("transform", function(d) {
  //      var d = d[d.length - 1]; return "translate(" + (x(d.key) + x.bandwidth()) + "," + (d.value) + ")"; });
  })
