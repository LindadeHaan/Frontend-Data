function process(d) {
    const processed = {
        language: d.language,
        year: d.publicationYear,
        genre: d.genre
    }
	return processed
}

var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.05)
    .align(0.1);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

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
        // .filter(genre => genre.key !== "Stripverhaal")

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

  // var keys = languageCount.slice();
  // console.log(keys)

  data = languageCount.filter(s => ['Detective', 'Humor', 'Sciencefiction', "Stripverhaal", "Avontureroman", "Romantisch verhaal"].includes(s.key))
  console.log(data)

  data.sort(function(a, b) { return b.value - a.value; });
  x.domain(languageCount.map(function(d) { return d.key; }));
  // y.domain([0, d3.max(languageCount, function(d) { return d.values; })]).nice();
  y.domain([0, 100])
  // z.domain(keys);

  g.append("g")
    .selectAll("g")
    .data(d3.stack()(languageCount))
    .enter().append("g")
      .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(languageCount)
    .enter().append("rect")
      .attr("x", function(d) { return x(d.key); })
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr("width", x.bandwidth());

  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Percentage");

  var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(languageCount.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
});
