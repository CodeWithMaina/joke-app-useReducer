import React, { useReducer, useState } from "react";
import "./App.css";
import { jokesReducer } from "./componets/reducers/JokeReducer";
import { JokeComponent } from "./componets/JokeComponent";

function App() {
  const InitialJokes = [
    {
      id: 1,
      joke: "Why don't skeletons fight each other? They don't have the guts!",
      rating: 4,
    },
    {
      id: 2,
      joke: "Why did the scarecrow win an award? Because he was outstanding in his field!",
      rating: 5,
    },
    {
      id: 3,
      joke: "What do you call a fish with no eyes? Fsh!",
      rating: 3,
    },
    {
      id: 4,
      joke: "How do you organize a space party? You planet!",
      rating: 4,
    },
    {
      id: 5,
      joke: "Why did the bicycle fall over? Because it was two-tired!",
      rating: 3,
    },
  ];

  const [jokes, dispatch] = useReducer(jokesReducer, InitialJokes);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const increaseRate = (id: number) => {
    dispatch({ type: "INCREASE_JOKES_LIKES", id });
  };

  const decreaseRate = (id: number) => {
    dispatch({ type: "DECREASE_JOKES_LIKES", id });
  };

  const deleteHandler = (id: number) => {
    dispatch({ type: "DELETE_JOKE", id });
  };

  const editHandler = (id: number) => {
    const jokeToEdit = jokes.find(joke => joke.id === id);
    if (jokeToEdit) {
      setEditingId(id);
      setEditText(jokeToEdit.joke);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId && editText.trim()) {
      dispatch({
        type: "EDIT_JOKE",
        id: editingId,
        updatedJoke: editText.trim()
      });
      setEditingId(null);
      setEditText("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).elements[0] as HTMLInputElement;
    const newJokeText = input.value.trim();

    if (newJokeText) {
      dispatch({
        type: "ADD_JOKE",
        newJoke: {
          id: Date.now(),
          joke: newJokeText,
          rating: 0
        }
      });
      input.value = "";
    }
  };

  return (
    <>
      <h2>Jokes For You</h2>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter the joke"
            style={{ padding: "12px", marginRight: "10px" }}
          />
          <button type="submit">Add Joke</button>
        </form>
      </div>
      {editingId !== null && (
        <div className="container">
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              style={{ padding: "12px", marginRight: "10px" }}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditingId(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
      <div>
        {jokes
          .sort((a, b) => b.id - a.id)
          .map((joke) => (
            <JokeComponent
              key={joke.id}
              joke={joke}
              increaseRate={increaseRate}
              decreaseRate={decreaseRate}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
            />
          ))}
      </div>
    </>
  );
}

export default App;