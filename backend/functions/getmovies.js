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

    console.log(searchTerm)
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (response) {
            console.log(response.data)
        }

    } catch (error) {
        console.log(error)
    }

    return "it hasn't worked!"

}

export const testApi = async () => {
    return "hello from the test api"
}