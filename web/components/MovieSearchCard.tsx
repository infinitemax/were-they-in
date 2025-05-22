import React from 'react'
import type { searchResultProps } from 'typesInterfaces/movieTypes'


const MovieSearchCard: React.FC<searchResultProps> = ({ result, selectMovie }: searchResultProps) => {

    const cardClick = () => {
        alert(`id = ${result.id} rating = ${result.rating}`)
    }

    return (
        <div className=''>
            <button onClick={selectMovie}>
                <div className='flex flex-col gap-1 mt-4 mx-2 bg-slate-200 p-2 rounded-lg'>
                    <p>{result.title}</p>
                    <p>{result.releaseDate}</p>
                </div>
            </button>
        </div>
    )
}

export default MovieSearchCard