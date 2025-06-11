export interface Joke {
    id: number;
    joke: string;
    rating: number
}
export interface JokeComponentProps {
    joke: Joke;
    increaseRate: (id:number) => void;
    decreaseRate: (id:number) => void;
    deleteHandler: (id:number) => void;
    editHandler: (id:number) => void;
}
