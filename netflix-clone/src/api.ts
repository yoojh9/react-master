const API_KEY='5d5173aff571c3d3f64f94d1b99849e5';
const BASE_PATH="https://api.themoviedb.org/3"

export interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
}

export interface IGetMovieResult {
    dates: {
        maximum: string;
        minimum: string;
    },
    page: number;
    results: IMovie[]
    total_pages: number;
    total_result: number;
}

export const getMovies = () => {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`)
        .then(res => res.json());
}

