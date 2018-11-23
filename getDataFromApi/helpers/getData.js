// Credits: Chelsea Doeleman & Maikel van Veen

const getTitleFromResult = (result) => {
    return result.titles
        && result.titles.title
        && result.titles.title
        && result.titles.title.$t
        || undefined
}

const getAuthorFromResult = (result) => {
    return result.authors
        && result.authors["main-author"]
        && result.authors["main-author"]
        && result.authors["main-author"].$t
        || undefined
}

const getPublicationYearFromResult = (result) => {
    return result.publication
        && result.publication.year
        && result.publication.year
        && result.publication.year.$t
        && Number(result.publication.year.$t)
        || undefined
}

const getPublisherFromResult = (result) => {
    return result.publication
        && result.publication.publishers
        && result.publication.publishers.publisher
        && result.publication.publishers.publisher.$t
        || undefined
}

const getPublishPlaceFromResult = (result) => {
    return result.publication
        && result.publication.publishers
        && result.publication.publishers.publisher
        && result.publication.publishers.publisher.place
        || undefined
}

const getCountFromResult = (result) => {
    return data.meta
        && data.meta.count
        || undefined
}

const getGenreFromResult = (result) => {
    return result.genres
        && result.genres.genre
        && result.genres.genre.$t
        || undefined
}

const getLanguageFromResult = (result) => {
    return result.languages
        && result.languages.language
        && result.languages.language.$t
        || undefined
}


// Credits: Chelsea & Maikel
// The way you want the data returned in you terminal.
const getTransformedResultFromResults = (results) => {
    return results
        ? results.map(result => {
            return {
                //title: getTitleFromResult(result),
                //author: getAuthorFromResult(result),
                publicationYear: getPublicationYearFromResult(result),
                publisher: getPublisherFromResult(result),
                place: getPublishPlaceFromResult(result),
                genre: getGenreFromResult(result),
                language: getLanguageFromResult(result)
                || undefined
            }
        })
        : []
}

module.exports = {
  getTransformedResultFromResults,
  getPublicationYearFromResult,
  getLanguageFromResult,
  getGenreFromResult,
  getPublisherFromResult
}
