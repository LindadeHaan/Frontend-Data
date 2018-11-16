(async () => { // need async function to get data from everywhere
    const languageData = await d3.json('data.json')

    var languageCount  = d3.nest()
      .key(function(d) { return d.language })
      .key(function(d) { return d.publicationYear})
      .key(function(d) { return d.genre })
      .rollup(function(v) { return v.length })
      .entries(languageData)
      console.log(JSON.stringify(languageCount))
      console.table(languageCount.sort(function(a, b) { return b.values - a.value }))

  })()

//Source map: http://blockbuilder.org/bricedev/b485239a37ca57722603
//Source changes d3: https://github.com/d3/d3/blob/master/CHANGES.md

  const width = 1500
  const height = 960
  const radius = 30

  const projection = d3.geoMercator()
                .rotate([-10, 0])
                .center([0, 53])
                // .parallels([29.5, 45.5])
                .scale([1100])
                .translate([width/2, height/2])

//define path generator
const path = d3.geoPath()
        .projection(projection)

//create svg
const svg = d3.select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height)

//Load in GeoJSON data
d3.json('europe.json').then(function(europe) {
  console.log(europe)

  //gind data and create one path per GeoJSON feature
  svg.selectAll('.countries')
      .data(topojson.feature(europe, europe.objects.countries).features)
      .enter()
      .append('path')
      .attr('class', 'countries')
      .style('fill', '#e2e2e2')
      .style('stroke', '#9a9a9a')
      .style('stroke-width', '0.3px')
      .attr('d', path)
})

d3.select(self.frameElement).style("height", height + "px");



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
