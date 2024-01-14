import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const rootEle: Element = document.getElementById("root") as Element;
const root = createRoot(rootEle);

root.render(<App />);