import React from 'react'
import type { searchResultType } from 'typesInterfaces/movieTypes'

const MovieSelectedCard = (selected: searchResultType) => {
    return (
        <div className='p-6 bg-green-200'>
            <h3>{selected.title}</h3>
        </div>
    )
}

export default MovieSelectedCard