export const makeImagePath = (id: string, format?:string) => {
    console.log('id ', id)
    return `https://image.tmdb.org/t/p/${format?format:"original"}${id}`;
}