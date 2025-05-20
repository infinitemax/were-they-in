import axios from "axios";

const url = "http://localhost:3000/who"

export const moviesApi = {


    async getMovies(searchTerm: string) {

        const response = await axios({
            method: "get",
            url: `${url}/search/${searchTerm}`,
        })

        if (response.data.length > 0) {
            return response.data
        }

        return []
    },

    async doSomethingElse() {

    }

}