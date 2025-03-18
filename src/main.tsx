import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QuestionsProvider } from "./context/questionsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QuestionsProvider>
      <App />
    </QuestionsProvider>
  </StrictMode>
);
