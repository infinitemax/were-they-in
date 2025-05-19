import type { Route } from "./+types/home";
import { moviesApi } from "api/movieApi";
import { useEffect, useState } from "react";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {

  const [movie1Search, setMovie1Search] = useState<string>("")

  const handleMovie1Input = (e: any) => {
    setMovie1Search(e.target.value)
  }

  const submitMovie = (searchTerm: string) => {
    moviesApi.getMovies(searchTerm)
  }



  return (
    <>
      <h1 className="text-3xl">Where they in...?</h1>

      <div>
        <input className="bg-gray-300" onChange={
          handleMovie1Input
        }></input>
        <button className="bg-green-200" onClick={() => submitMovie(movie1Search)}>Movie 1
        </button>
      </div>

      <div>
        <input className="bg-gray-300"></input>
        <button className="bg-red-200">Movie 2

        </button>
      </div>
    </>
  );
}
