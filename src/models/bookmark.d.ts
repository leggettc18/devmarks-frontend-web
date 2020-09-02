export interface Bookmark {
    id: number,
    name: string,
    url: string,
    color: string
}

export interface BookmarkCreate {
    name: string,
    url: string,
    color?: string
}