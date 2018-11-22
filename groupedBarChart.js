// Source: https://bl.ocks.org/syncopika/f1c9036b0deb058454f825238a95b6be

// I got a lot of help with the code and explaination of the code from:
// Jessie, Chelsea, Maikel and Wouter

// Data I need to show my data in the chart
// I tried to put it in a json file, but then the change function did not work
// I tried to fix this myself
// But I could not make it work and it was the night before the deadline
const languageCount = [{
    "genre": "Detective",
    "language": "dut",
    "percentage": 57.9
  },
  {
    "genre": "Detective",
    "language": "eng",
    "percentage": 35.8
  },
  {
    "genre": "Detective",
    "language": "fre",
    "percentage": 1.6
  },
  {
    "genre": "Detective",
    "language": "ger",
    "percentage": 3.2
  },
  {
    "genre": "Detective",
    "language": "spa",
    "percentage": 1.6
  },
  {
    "genre": "Humor",
    "language": "dut",
    "percentage": 50.4
  },
  {
    "genre": "Humor",
    "language": "eng",
    "percentage": 39.9
  },
  {
    "genre": "Humor",
    "language": "fre",
    "percentage": 3.5
  },
  {
    "genre": "Humor",
    "language": "ger",
    "percentage": 5.3
  },
  {
    "genre": "Humor",
    "language": "spa",
    "percentage": 0.9
  },
  {
    "genre": "Sciencefiction",
    "language": "dut",
    "percentage": 57.2
  },
  {
    "genre": "Sciencefiction",
    "language": "eng",
    "percentage": 41.5
  },
  {
    "genre": "Sciencefiction",
    "language": "fre",
    "percentage": 0.3
  },
  {
    "genre": "Sciencefiction",
    "language": "ger",
    "percentage": 0.1
  },
  {
    "genre": "Sciencefiction",
    "language": "spa",
    "percentage": 0.9
  },
  {
    "genre": "Stripverhaal",
    "language": "dut",
    "percentage": 99.0
  },
  {
    "genre": "Stripverhaal",
    "language": "eng",
    "percentage": 1.0
  },
  {
    "genre": "Avontureroman",
    "language": "dut",
    "percentage": 69.8
  },
  {
    "genre": "Avontureroman",
    "language": "eng",
    "percentage": 26.6
  },
  {
    "genre": "Avontureroman",
    "language": "fre",
    "percentage": 1.1
  },
  {
    "genre": "Avontureroman",
    "language": "ger",
    "percentage": 1.4
  },
  {
    "genre": "Avontureroman",
    "language": "spa",
    "percentage": 1.1
  },
  {
    "genre": "Romantisch Verhaal",
    "language": "dut",
    "percentage": 68.7
  },
  {
    "genre": "Romantisch Verhaal",
    "language": "eng",
    "percentage": 26.1
  },
  {
    "genre": "Romantisch Verhaal",
    "language": "fre",
    "percentage": 1.1
  },
  {
    "genre": "Romantisch Verhaal",
    "language": "ger",
    "percentage": 2.4
  },
  {
    "genre": "Romantisch Verhaal",
    "language": "spa",
    "percentage": 1.7
  }
]


var dutData = []
var engData = []
var gerData = []
var freData = []
var spaData = []

// Get data for the emtpy arrays above
for (var i = 0; i < languageCount.length; i++) {
  if (languageCount[i]["language"] === "dut") {
    dutData.push(languageCount[i])
  } else if (languageCount[i]["language"] === "eng") {
    engData.push(languageCount[i])
  } else if (languageCount[i]["language"] === "ger") {
    gerData.push(languageCount[i])
  } else if (languageCount[i]["language"] === "fre") {
    freData.push(languageCount[i])
  } else {
    spaData.push(languageCount[i])
  }
}

// Functions for toggling between data
// Value = value of radio buttons
function change(value) {

  if (value === "dut") {
    update(dutData)
  } else if (value === "eng") {
    update(engData)
  } else if (value === "ger") {
    update(gerData)
  } else if (value === "fre") {
    update(freData)
  } else if (value === "spa") {
    update(spaData)
  } else if (value === "all") {
    update(languageCount)
  }
}

function update(data) {
  // Set domain for the x axis
  xChart.domain(data.map(function(d) {
    return d.genre
  }))
  // Set domain for y axis
  yChart.domain([0, d3.max(data, function(d) {
    return +d.percentage
  })])

  // Get the width of each bar
  var barWidth = width / data.length

  // Select all bars on the graph, take them out, and exit dataset from before
  // After that you can add the new data set with .enter()
  var bars = chart.selectAll(".bar")
    .remove()
    .exit()
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d, i) {
      return i * barWidth + 1
    })
    .attr("y", function(d) {
      return yChart(d.percentage)
    })
    .attr("height", function(d) {
      return height - yChart(d.percentage)
    })
    .attr("width", barWidth - 1)
    .attr("fill", function(d) {
      // Color for each language
      if (d.language === "dut") {
        return "rgba(122, 1, 119, 0.6)"
      } else if (d.language === "eng") {
        return "rgba(197, 27, 138, 0.6)"
      } else if (d.language === "fre") {
        return "rgba(247, 104, 161, 0.6)"
      } else if (d.language === "ger") {
        return "rgba(251, 180, 185, 0.6)"
      } else {
        return "rgba(254, 235, 226, 0.6)"
      }
    })
    // Source tooltip: https://bl.ocks.org/alandunning/274bf248fd0f362d64674920e85c1eb7
    .on("mousemove", function(d) {
      tooltip
        .style("left", d3.event.pageX - 50 + "px")
        .style("top", d3.event.pageY - 120 + "px")
        .style("display", "inline-block")
        .style("font-size", "20px")
        .html((d.language) + "<br>" + (d.genre) + "<br>" + (d.percentage) + "%")
    })
    .on("mouseout", function(d) {
      tooltip.style("display", "none")
    })

  // y axis
  chart.select(".axis")
    .call(yAxis)
  // x axis
  chart.select(".xAxis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .style("font-size", "24px")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", function(d) {
      return "rotate(-65)"
    })

  // Animation
  // Credits: Guus told me that the height has to be 0 before you can do the transition
  chart.selectAll("rect")
    .data(data)
    .attr("y", 0)
    .attr("height", 0)
    .transition()
    .ease(d3.easeBounce)
    .delay(function(d) {
      return Math.random() * 1000
    })
    .duration(1000)
    .attr("y", function(d) {
      return yChart(d.percentage)
    })
    .attr("height", function(d) {
      return height - yChart(d.percentage)
    })

}

// End update

var margin = { top: 50, right: 20, bottom: 95, left: 100 }
var width = 1000
var height = 600

var tooltip = d3.select("body").append("div").attr("class", "toolTip")

var chart = d3.select(".chart")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var xChart = d3.scaleBand()
  .range([0, width])

var yChart = d3.scaleLinear()
  .range([height, 0])

var xAxis = d3.axisBottom()
  .scale(xChart)
  .tickSize(10)

var yAxis = d3.axisLeft()
  .scale(yChart)

// Set up axes
// y axis
chart.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .style("font-family", "Nexa Light, sans-serif")
  .style("font-size", "24px")

// x axis
chart.append("g")
  .attr("class", "xAxis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .selectAll("text")
  .style("text-anchor", "end")
  .style("font-family", "Nexa Light, sans-serif")
  .attr("dx", "-.8em")
  .attr("dy", ".15em")
  .attr("transform", function(d) {
    return "rotate(-65)"
  })

// Labels y and x axis
chart
  .append("text")
  .attr("transform", "translate(-60," + (height + margin.bottom) / 2 + ") rotate(-90)")
  .style("fill", "#ffffff")
  .style("font-family", "Nexa Bold, sans-serif")
  .style("font-size", "20px")
  .text("% boeken")

chart
  .append("text")
  .attr("transform", "translate(" + (width / 2) + "," + (height + margin.bottom + 100) + ")")
  .style("fill", "#ffffff")
  .style("font-family", "Nexa Bold, sans-serif")
  .style("font-size", "20px")
  .text("Genres")

d3.select("svg")
  .style("margin-left", "30px")
  .style("padding-left", "0")
  .style("height", "1000px")

// Use languageCount to begin with
update(languageCount)
