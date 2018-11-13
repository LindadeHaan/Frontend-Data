require('dotenv').config()
//  const api = require('./oba-api.js')
// const chalk = require('chalk')
// const express = require('express')
// const app = express()
// const port = 4000
//  const obaApi = new api({
//   url: 'https://zoeken.oba.nl/api/v1/',
//   key: process.env.PUBLIC
// })
//  // Search for method, params and than optional where you wanna find something
// // returns first 20 items
// // obaApi.get(endpoint, params, filterKey)
// // possible endpoints: search (needs 'q' parameter) | details (needs a 'frabl' parameter) | availability (needs a 'frabl' parameter) | holdings/root | index/x (where x = facet type (like 'book' ))
// // possible parameters: q, librarian, refine, sort etc. check oba api documentation for all
// // possible filterKey: any higher order key in response object, like title returns only title objects instead of full data object
// obaApi.get('search', {
//   q: 'language:ger',
//   librarian: false,
//   refine: true,
//   facet: ['type(book)', 'pubYear(2010)', 'genre(avonturenroman)']
// }).then(response => {
//    // response ends up here
//   console.log(response)
//    // Make server with the response on the port
//   app.get('/', (req, res) => res.json(response))
//   app.listen(port, () => console.log(chalk.green(`Listening on port ${port}`)))
//
// })



//Packages I need
const chalk = require("chalk")
const express = require("express")
const fs = require("fs")
const app = express()
const port = 4000
// file with all the functions to filter the data in the api.
const getData = require("./helpers/getData.js")
const obaWrapper = require("node-oba-api-wrapper")

const obaApi = new obaWrapper({
	public: process.env.PUBLIC,
	secret: process.env.SECRET
})

// Search for method, params and than optional where you wanna find something
// obaApi.get(endpoint, params, filterKey)
// possible endpoints: search (needs "q" parameter) | details (needs a "frabl" parameter) | availability (needs a "frabl" parameter) | holdings/root | index/x (where x = facet type (like "book" ))
// possible parameters: q, librarian, refine, sort etc. check oba api documentation for all
// possible filterKey: any higher order key in response object, like title returns only title objects instead of full data object

// Credits: Wouter Lem
const search = async (q, facet) => {
  return await obaApi.get("search", {
    q,
    librarian: true,
    refine: true,
    facet,
    count: 10,
    // Credits: Maikel van Veen & Chelsea Doeleman
    filter: (result) => {
			const publicationYear = getData.getPublicationYearFromResult(result)
			const currentYear = new Date().getFullYear()
			const language = getData.getLanguageFromResult(result)

			return publicationYear >= currentYear -3
			&& getData.getGenreFromResult(result)
			&& (language === "dut"
			|| language === "eng"
			|| language === "ger"
			|| language === "fre"
			|| language === "spa"
			)
			//>= currentYear - 8
		}
  })
}

// Credits: Chelsea Doeleman & Maikel van Veen
(async () => {
  try {
    // Credits: Jessie Mason -> She showed me how I could filter on more than 1 facet.
    //q, facet and page
		const detective = await search ("genre:detective", ["type(book)"])
		const humor = await search ("genre:humor", ["type(book)"])
    const sciencefiction = await search ("genre:science-fiction", ["type(book)"])
    const stripverhaal = await search ("genre:stripverhaal", ["type(book)"])
    const avonturenroman = await search ("genre:avonturenroman", ["type(book)"])
		const romantischverhaal = await search ("genre:romantisch-verhaal", ["type(book)"])

		const results =  [...detective, ...humor, ...sciencefiction, ...stripverhaal, ...avonturenroman, ...romantischverhaal]

    if (results) {

			const transformedResults = getData.getTransformedResultFromResults(results)
      // const transformedDetectiveResults = getData.getTransformedResultFromResults(detective)
      // const transformedHumorResults = getData.getTransformedResultFromResults(humor)
      // const transformedScienceFictionResults = getData.getTransformedResultFromResults(sciencefiction)
			// const transformedStripResults = getData.getTransformedResultFromResults(stripverhaal)
      // const transformedAvontuurResults = getData.getTransformedResultFromResults(avonturenroman)
      // const transformedRomantischResults = getData.getTransformedResultFromResults(romantischverhaal)

      // console.log(transformedDetectiveResults)
      // console.log(transformedHumorResults)
      // console.log(transformedScienceFictionResults)
			// console.log(transformedStripResults)
			// console.log(transformedAvontuurResults)
			// console.log(transformedRomantischResults)

			console.log(transformedResults)

      // const dataWrapper = {
      //   "results": transformedDetectiveResults,
      //   "results": transformedHumorResults,
      //   "results": transformedScienceFictionResults,
			// 	"results": transformedStripResults,
			// 	"results": transformedAvontuurResults,
			// 	"results": transformedRomantischResults
      // }

      app.get("/", (req, res) => res.json(transformedResults))
      app.listen(port, () => console.log(chalk.green(`Listening on port ${port}`)))
			fs.writeFile('data.json', JSON.stringify(transformedResults), err => err && console.error(err))
    }
  } catch (error) {
    throw new Error(error)
  }
}) ()
