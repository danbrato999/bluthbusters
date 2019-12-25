export interface MovieData {
    imdbId: string
    title: string
    genre: string
    year: number
    director: string
    runtime: string
    poster: string
    description: string
}

export interface Inventory {
    copies: number
    available: number
}

export interface MovieFormApi {
    externalData: MovieData,
    trailer: string,
    copies: number
}

export interface Movie {
    id: string
    externalData: MovieData,
    trailer: string
    inventory: Inventory
}

export interface PaginatedList<T> {
    totalCount: number
    data: Array<T>
}

export interface MovieRentForm {
    rentUntil: Date
}

export interface MovieRenting {
    id: string
    movieId: string
    rentedAt: Date
    rentUntil: Date
    returnedAt: Date
}

export interface DetailedMovieRenting extends MovieRenting {
    movie: MovieData
}

export interface MovieDataSearch {
    type: string
    value: string
}

export interface IdObject {
    id: string
}