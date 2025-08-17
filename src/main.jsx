import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/app.scss";
import AppWrapper from './AppWrapper'
export const server = "https://authenticationbackendtodo.onrender.com/api/v1";

createRoot(document.getElementById("root")).render(
    <StrictMode>
      <AppWrapper />
    </StrictMode>
);
