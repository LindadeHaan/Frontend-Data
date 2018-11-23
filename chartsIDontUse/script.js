function process(d) {
    const processed = {
        language: d.language,
        year: d.publicationYear,
        genre: d.genre
    }
	return processed
}

const margin = {top: 20, right: 20, bottom: 30, left: 40}
const width = 960 - margin.left - margin.right
const height = 500 - margin.top - margin.bottom

const x = d3.scaleBand().rangeRound([0, width]).padding(0.1)
const y = d3.scaleLinear().rangeRound([height, 0])

const color = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])

const colors = {
  "Detective": "#9F5164",
  "Humor":"#cb2e2e",
  "Sciencefiction":"#ED7D30",
  "Stripverhaal":"#FFDC6F",
  "Romantisch verhaal":"#F4E1AF",
  "Avonturenroman":"#EDEDEE"
}

const matchKeys = [
  "Genre",
  "Detective",
  "Humor",
  "Sciencefiction",
  "Stripverhaal",
  "Romantisch verhaal",
  "Avonturenroman"
]

const xAxis = d3.axisBottom(x)

const yAxis = d3.axisLeft(y)
      .tickFormat(d3.format(".2s"))

const svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

// const g = svg.append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  d3.json("data.json").then((data) => {
    const dataMap = data.map(process)
    console.log('DataMap:', dataMap)
    // console.log("data", data)
    const languageCount  = d3.nest()
      // .key(function(d) { return d.publicationYear})
      .key(function(d) { return d.genre })
      .key(function(d) { return d.language })
      .rollup(function(v) { return Number(v.length) })
      .object(data)
      console.log("languangeCount: ", languageCount)
      console.log(JSON.stringify(languageCount))

      // return data.map((d) => {
      //   d.language = +d.language
      //   return d
      // })

      color.domain(d3.keys(data[0]).filter(function(key) {return key !== "Genre" }))

      data.forEach(function(d) {
        let y0 = 0

        d.language = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]} })

        d.language = d.language.sort(function(a, b) {
          return matchKeys.indexOf(a.name) - matchKeys.indexOf(b.name)
        })


        const aa = d.language.forEach(function(dd) {
          dd.y0 = y0
          dd.y1 = y0 += +d[dd.name]
        })

        d.total = d.language[Number(d.language.length) - 1].y1
      })

      // color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Genre"; }));

      x.domain(data.map(function(d){return d.genre}))
      y.domain([0, d3.max(data, function(d){return d.total})])

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Aantal")

const state = svg.selectAll(".state")
        .data(languageCount)
      .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + x(d.genre) + ",0)" })

      state.selectAll("rect")
        .data(languageCount)
        .enter().append("rect")
          .attr("width", x.bandwidth())
          .attr("y", function(d) { return y(d.y1) })
          .attr("height", function(d) { return y(d.y0) - y(d.y1) })
          .style("fill", function(d) { console.log(d.name); return colors[d.name] })

    })




      //console.table(languageCount.sort(function(a, b) { return b.values - a.value }))
//Source map: http://blockbuilder.org/bricedev/b485239a37ca57722603
//Source changes d3: https://github.com/d3/d3/blob/master/CHANGES.md

//   const width = 1500
//   const height = 960
//   const radius = 30
//
//   const projection = d3.geoMercator()
//                 .rotate([-10, 0])
//                 .center([0, 53])
//                 // .parallels([29.5, 45.5])
//                 .scale([1100])
//                 .translate([width/2, height/2])
//
// //define path generator
// const path = d3.geoPath()
//         .projection(projection)
//
// //create svg
// const svg = d3.select('body')
//         .append('svg')
//         .attr('width', width)
//         .attr('height', height)
//
// //Load in GeoJSON data
// d3.json('europe.json').then(function(europe) {
//   console.log(europe)
//
//   //gind data and create one path per GeoJSON feature
//   svg.selectAll('.countries')
//       .data(topojson.feature(europe, europe.objects.countries).features)
//       .enter()
//       .append('path')
//       .attr('class', 'countries')
//       .style('fill', '#e2e2e2')
//       .style('stroke', '#9a9a9a')
//       .style('stroke-width', '0.3px')
//       .attr('d', path)
// })
//
// d3.select(self.frameElement).style("height", height + "px");



  // const path = d3.geo.path()
  //
  //
  //
  // const svg = d3.select('body')
  //     .append('svg')
  //     .attr('width', width)
  //     .attr('height', height)
  //
  // const url = "https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/us.json"
  // d3.json(url, function(error, topology) {
  //   if (error) throw error
  //
  //     console.log('topojson', topology)
  //     var geojson = topojson.feature(topology, topology.objects.countries)
  //     console.log('geojson', geojson)
  //
  //     svg.selectAll('path')
  //         .data(geojson.features)
  //         .enter().append('path')
  //           .attr('d', path)
  // })
