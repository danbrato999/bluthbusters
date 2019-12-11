export const movies = {
    "tt0088763" : {
        "id": "tt0088763",
        "externalData": {
            "imdbId": "tt0088763",
            "title": "Back to the Future",
            "genre": "Adventure, Comedy, Sci-Fi",
            "year": "1985",
            "director": "Robert Zemeckis",
            "runtime": "116 min",
            "poster": "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
            "description": "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.",
        },
        "trailer": "https://www.youtube.com/embed/qvsgGtivCgs",
        "inventory": {
            "copies": 10,
            "available": 9
        }
    },
    "tt0110912": {
        "id": "tt0110912",
        "externalData": {
            "imdbId": "tt0110912",
            "title": "Pulp Fiction",
            "genre": "Crime, Drama",
            "year": "1994",
            "director": "Quentin Tarantino",
            "runtime": "154 min",
            "poster": "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
            "description": "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        },
        "trailer": "https://www.youtube.com/embed/s7EdQ4FqbhY",
        "inventory": {
            "copies": 5,
            "available": 5
        }
    },
}

export const users = [
    {
        "id": "user0001",
        "fullName": "Daniel Bravo",
        "email": "daniel@bravo.com"
    }
]

export const movieLendings = [
    {
        "id": "lending0001",
        "movieId": "tt0088763",
        "userId": "user0001",
        "borrowedAt": new Date(2019, 12, 4, 10),
        "borrowUntil": new Date(2019, 12, 5),
        "returnedAt": new Date(2019, 12, 5, 18)
    },
    {
        "id": "lending0002",
        "movieId": "tt0088763",
        "userId": "user0001",
        "borrowedAt": new Date(2019, 12, 7, 16),
        "borrowUntil": new Date(2019, 12, 12)
    }
]