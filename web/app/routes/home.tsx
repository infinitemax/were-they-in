import type { Route } from "./+types/home";
import { moviesApi } from "api/movieApi";
import MovieSearchCard from "components/MovieSearchCard";
import MovieSelectedCard from "components/MovieSelectedCard";
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
    setMovie1HasBeenChosen(0)
    const response: searchResultType[] = await moviesApi.getMovies(searchTerm)

    if (response) {
      if (!whichSearch) {
        setMovie1Results(response)
      } else {

        setMovie2Results(response)
      }
    }
  }

  // select movie - use id to get credits

  const [selectedMovie1, setSelectedMovie1] = useState<searchResultType>()
  const [selectedMovie2, setSelectedMovie2] = useState<searchResultType>()
  const [movie1Cast, seMovie1Cast] = useState<any>()
  const [movie1HasBeenChosen, setMovie1HasBeenChosen] = useState<number>(0)
  const [movie2HasBeenChosen, setMovie2HasBeenChosen] = useState<number>(0)

  const selectMovie = async (selected: searchResultType, whichSearch: number) => {

    console.log("clicked from select movie function")

    console.log(selected)
    if (!whichSearch) {
      setSelectedMovie1(selected)
      setMovie1HasBeenChosen(1)
      if (movie1HasBeenChosen) {
        setMovie1Results([])
      }
    }

  }

  // clear the search array when movie is selected
  useEffect(() => {
    if (movie1HasBeenChosen) {
      setMovie1Results([])
    }
  }, [movie1HasBeenChosen, movie2HasBeenChosen])

  useEffect(() => {
    if (movie2HasBeenChosen) {
      setMovie2Results([])
    }
  }, [movie2HasBeenChosen])




  return (
    <>
      <h1 className="text-3xl">Were they in...?</h1>

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
              {/* Here I am! trying to get the selected  movie to appear, there's a problem with the type */}
              {movie1HasBeenChosen && selectedMovie1 != undefined ? <MovieSelectedCard selected={selectedMovie1} /> : null}
              {movie1Results.length > 0 ?
                movie1Results.map((movie: searchResultType) => {
                  return (
                    <MovieSearchCard key={movie.id} result={movie} selectMovie={() => selectMovie(movie, 0)} />
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
                    <MovieSearchCard key={movie.id} result={movie} selectMovie={() => selectMovie(movie, 1)} />
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
