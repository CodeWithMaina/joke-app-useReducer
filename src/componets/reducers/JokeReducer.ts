import type { Joke } from "../../types/types";

type JokeAction =
  | { type: "ADD_JOKE"; newJoke: Joke }
  | { type: "INCREASE_JOKES_LIKES"; id: number }
  | { type: "DECREASE_JOKES_LIKES"; id: number }
  | { type: "DELETE_JOKE"; id: number }
  | {type: "EDIT_JOKE"; id:number;updatedJoke:string }

export const jokesReducer = (jokes: Joke[], action: JokeAction): Joke[] => {
  switch (action.type) {
    case "ADD_JOKE":
      return [...jokes, action.newJoke];

    case "INCREASE_JOKES_LIKES":
      return jokes.map((joke) => {
        if (joke.id == action.id) {
          return { ...joke, rating: joke.rating + 1 };
        } else {
          return joke;
        }
      });

    case "DECREASE_JOKES_LIKES":
      return jokes.map((joke) => {
        if (joke.id == action.id) {
          return { ...joke, rating: joke.rating - 1 };
        } else {
          return joke;
        }
      });

    case "DELETE_JOKE":
      return jokes.filter((joke) => joke.id !== action.id);

    case "EDIT_JOKE":
      return jokes.map(joke => joke.id === action.id ? {...joke, joke:action.updatedJoke} : joke)
    default:
      return jokes;
  }
};
