import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactDOM from "react-dom/client";
import AppC from "./components/AppC";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <DndProvider backend={HTML5Backend}>
            <AppC />
        </DndProvider>
    </React.StrictMode>
);
