import axios from "axios"

export const getMovies = async (token) => {

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
