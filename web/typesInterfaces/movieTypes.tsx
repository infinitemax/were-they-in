export type searchResultType = {
    id: number,
    posterPath: string,
    releaseDate: string,
    title: string,
    rating: number
}

export interface searchResultProps {
    result: searchResultType,
    selectMovie: () => void
}