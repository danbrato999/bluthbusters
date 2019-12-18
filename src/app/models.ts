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

export interface MovieRenting {
    id: string
    movieId: string
    rentedAt: Date
    rentUntil: Date
    returnedAt: Date
}

export interface DetailedMovieRenting {
    id: string
    movieId: string
    rentedAt: Date
    rentUntil: Date
    returnedAt: Date
    movie: MovieData
}