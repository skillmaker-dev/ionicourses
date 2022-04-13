export interface Course {
    id: string,
    title: string,
    price: number,
    author: string,
    date: string,
    imageUrl: string,
    description: string
    prerequisites: string[]
}