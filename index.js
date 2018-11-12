require("dotenv").config()

//Packages I need
const chalk = require("chalk")
const express = require("express")
const app = express()
const port = 3000
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
const search = async (q, facet, page, count) => {
  return await obaApi.get("search", {
    q,
    librarian: true,
    refine: true,
    facet,
    page,
    count: 10,
    // Credits: Maikel van Veen & Chelsea Doeleman
    filter: (result) => {
			const publicationYear = getData.getPublicationYearFromResult(result)
			const currentYear = new Date().getFullYear()

			return publicationYear >= currentYear - 8
		}
  })
}

// Credits: Chelsea Doeleman & Maikel van Veen
(async () => {
  try {
    // Credits: Jessie Mason -> She showed me how I could filter on more than 1 facet.
    //q, facet and page
    const disneyResults = await search ("disney", ["type(movie)"], 1)
    const dreamworksResults = await search ("dreamworks", ["type(movie)"], 1)
    const pixarResults = await search ("pixar", ["type(movie)"], 1)
    if (disneyResults, dreamworksResults, pixarResults) {
      const transformedDisneyResults = getData.getTransformedResultFromResults(disneyResults)
      const transformedDreamworksResults = getData.getTransformedResultFromResults(dreamworksResults)
      const transformedPixarResults = getData.getTransformedResultFromResults(pixarResults)

      console.log(transformedDisneyResults)
      console.log(transformedDreamworksResults)
      console.log(transformedPixarResults)

      const dataWrapper = {
        "results": transformedDisneyResults,
        "results": transformedDreamworksResults,
        "results": transformedPixarResults
      }

      app.get("/", (req, res) => res.json(dataWrapper))
      app.listen(port, () => console.log(chalk.green(`Listening on port ${port}`)))
    }
  } catch (error) {
    throw new Error(error)
  }
}) ()
