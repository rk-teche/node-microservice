import React, { useCallback, useState } from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

export const App = () => {
    const [count, setCount] = useState(0);
    const [intervalCount, setIntervalCount] = useState(0);

    // Define a function that increments the count
    const increment = () => {
        console.log("increment", count);
        setCount(count + 1);
    };

    // setInterval(() =>
    // {
    //     setIntervalCount(intervalCount + 1);
    // }, 1000);

    console.log("hello");

    // const memoizedIncrement = useCallback(increment, [count]);

    return (
        <div className="container" >
            <p>Count: {count} </p>
            <button onClick={increment} > Increment </button>
            <h1> Create Post </h1>
            < PostCreate />
            <PostList />

        </div>
    )
};