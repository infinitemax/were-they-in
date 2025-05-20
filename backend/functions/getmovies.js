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

export const getMovieFromSearchTerm = async (token, searchTerm) => {

    const moviesToSend = []

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (response.data.results.length > 0) {
            console.log(response.data)

            response.data.results.forEach((movieObject) => {

                const movie = {
                    id: movieObject.id,
                    title: movieObject.title,
                    posterPath: movieObject.poster_path,
                    releaseDate: movieObject.release_date,
                    rating: movieObject.vote_average
                }

                moviesToSend.push(movie)

            })

            return moviesToSend
        } else {
            return []
        }

    } catch (error) {
        console.log(error)
        return "it hasn't worked!"
    }



}

export const testApi = async () => {
    return "hello from the test api"
}