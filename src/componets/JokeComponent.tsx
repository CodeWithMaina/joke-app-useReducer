import type { JokeComponentProps } from "../types/types";
import "./JokeComponet.css"

export const JokeComponent:React.FC<JokeComponentProps> = ({joke, increaseRate, decreaseRate, deleteHandler,editHandler}) => {
  return <div className="joke">
    <div className="joke-text">{joke.joke}</div>
    <div className="rate">Rating: {joke.rating}</div>
    <div className="joke-buttons">
        <button className="btn btn-sm" onClick={()=> increaseRate(joke.id)}>UP</button>
        <button className="btn btn-sm" onClick={()=> decreaseRate(joke.id)}>DOWN</button>
        <button className="btn btn-sm" onClick={()=> deleteHandler(joke.id)}>DELETE</button>
        <button className="btn btn-sm" onClick={()=> editHandler(joke.id)}>EDIT</button>
    </div>
  </div>;
};
