import axios from "axios"

export const getActors = async (token) => {

    let names = ""

    try {
        const response = await axios.get("https://api.themoviedb.org/3/movie/11/credits", {
            headers: {
                "Authorization": `Bearer ${token}`
            }

        })

        if (response) {
            response.data.cast.forEach(actor => {
                console.log(actor.name)
                names = names + actor.name + ", "
            });
        }


    } catch (error) {
        console.log(error)
    }

    return names

}


const makeApiCall = async (token, searchTerm, page) => {

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&page=${page}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })



        return response

    } catch (error) {
        console.log(error)
        return []
    }

}


export const getMovieFromSearchTerm = async (token, searchTerm, page) => {

    // initial api call
    const response = await makeApiCall(token, searchTerm, page)

    const totalPages = response.data.total_pages
    console.log(`total pages = ${totalPages}`)

    console.log(`inital response contains ${response.data.results.length} pages`)

    // initialise array to store raw TMDB data
    const accumulatedResults = []

    // add first response
    accumulatedResults.push(response.data.results)

    // if more than one page, do further api calls to get the rest of the search results
    if (totalPages > 1) {

        for (let i = 2; i <= totalPages; i++) {

            const nextResponse = await makeApiCall(token, searchTerm, i)
            console.log(`page ${i} contains ${nextResponse.data.results.length} movies`)
            accumulatedResults.push(nextResponse.data.results)
        }
    }

    const moviesToSend = []

    accumulatedResults.forEach((resultsArray) => {

        resultsArray.forEach((movieObject) => {
            const movie = {
                id: movieObject.id,
                title: movieObject.title,
                posterPath: movieObject.poster_path,
                releaseDate: movieObject.release_date,
                rating: movieObject.vote_average
            }


            moviesToSend.push(movie)
        })

    })



    accumulatedResults.forEach((movie) => {
        console.log(movie.name)
    })
    console.log(`moviesToSend.length = ${moviesToSend.length}`)


    return moviesToSend



}

export const testApi = async () => {
    return "hello from the test api"
}


// next - sort data by rating or something before sending back
