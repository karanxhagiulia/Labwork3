export enum SearchType {
    all = '',
    movie = 'movie', 
    serles = 'series',
    episode = 'episode',
} 

export interface SearchResult { 
    Title: string 
    Year: string 
    Poster: string 
    imdbID: string 
    Type: string
}


export interface SearchError { 
    Resonse: string 
    Error: string 
}



export interface DetailsResult { 
    Title: string 
    Year: string 
    Poster: string 
    imdbID: string 
    Type: string
    Genre: string
    imdbRating: string
    Director: string
    Website: string
    Awards: string
    Actors: string
    Plot: string
}



export const useApi = () => {
    let url = 'https://www.omdbapi.com/'
    let apiKey = 'cacb3c53'

    const searchData = async (title: string, type: SearchType): Promise< SearchResult[] | SearchError> => {
        const result = await fetch(
            `${url}?s=${encodeURI(title)}&type=${type}&apikey=${apiKey}`,
        )

        return result.json()
    }

    const getDetails = async (id: string): Promise<DetailsResult> => {
        const result = await fetch(`${url}?i=${id}&plot=full&apikey=${apiKey}`)
        return result.json()
    }

    return {
        searchData,
        getDetails,
    }

}

export default useApi