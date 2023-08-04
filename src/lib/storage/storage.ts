export const getFavorites = (): string[]|null => {
    let favoriteStringData: string|null = localStorage.getItem('__favorites')
    if(!favoriteStringData) return null
    return JSON.parse(favoriteStringData)
}
export const setFavorites = (favorites: string[]) => {
    localStorage.setItem("__favorites", JSON.stringify(favorites))
}
export const createFavorites = () => {
    if(!localStorage.getItem("__favorites")) localStorage.setItem("__favorites", "[]")
}
export const addToFavorites = (gradientTitle: string) => {
    if(!getFavorites()) createFavorites()
    let favorites: string[] = getFavorites()!
    if(doesFavoriteExist(favorites, gradientTitle)) return
    favorites.push(gradientTitle)
    setFavorites(favorites)
}
export const doesFavoriteExist = (favorites: string[], newFav: string): boolean => {
    if(favorites.includes(newFav)) return true
    return false
}