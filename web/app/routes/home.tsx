import type { Route } from "./+types/home";
import { moviesApi } from "api/movieApi";
import MovieSearchCard from "components/MovieSearchCard";
import { useEffect, useState } from "react";
import type { searchResultType } from "typesInterfaces/movieTypes";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {

  const [movie1Search, setMovie1Search] = useState<string>("")
  const [movie2Search, setMovie2Search] = useState<string>("")
  const [movie1Results, setMovie1Results] = useState<searchResultType[]>([])
  const [movie2Results, setMovie2Results] = useState<searchResultType[]>([])

  const handleMovieInput = (e: any, whichSearch: number) => {

    if (!whichSearch) {
      setMovie1Search(e.target.value)
    } else {
      setMovie2Search(e.target.value)
    }
  }

  const submitMovie = async (searchTerm: string, whichSearch: number) => {
    const response: searchResultType[] = await moviesApi.getMovies(searchTerm)

    if (response) {
      if (!whichSearch) {
        setMovie1Results(response)
      } else {

        setMovie2Results(response)
      }
    }

  }

  useEffect(() => {
    console.log(movie1Results)
  }, [movie1Results])



  // const testMovie = {

  //   id: 466577,
  //   title: "Behind the Scenes of 'Y Tu Mamá También'",
  //   posterPath: "/1AXE5hVfoxL9S7gyVLuxklDtFLY.jpg",
  //   releaseDate: "2001-06-08"

  // }


  return (
    <>
      <h1 className="text-3xl">Where they in...?</h1>

      <div className="flex justify-center">
        <div className="flex gap-4">
          <div>
            <div>
              <input className="bg-gray-300" onChange={(e) =>
                handleMovieInput(e, 0)
              }></input>
              <button className="bg-green-200" onClick={() => submitMovie(movie1Search, 0)}>Movie 1
              </button>
            </div>
            <div>
              {movie1Results.length > 0 ?
                movie1Results.map((movie: searchResultType) => {
                  return (
                    <MovieSearchCard key={movie.id} result={movie} />
                  )
                })
                : null}
            </div>
          </div>

          <div>
            <div>
              <input className="bg-gray-300" onChange={(e) =>
                handleMovieInput(e, 1)
              }></input>
              <button className="bg-green-200" onClick={() => submitMovie(movie2Search, 1)}>Movie 2
              </button>
            </div>
            <div>
              {movie2Results.length > 0 ?
                movie2Results.map((movie: searchResultType) => {
                  return (
                    <MovieSearchCard key={movie.id} result={movie} />
                  )
                })
                : null}
            </div>
          </div>



          {/* <div>
            <input className="bg-gray-300"></input>
            <button className="bg-red-200" onClick={() => submitMovie(movie1Search, 1)}>Movie 2
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}
