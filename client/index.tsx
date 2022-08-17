import React from "react";
import { createRoot } from "react-dom/client";

import TopBar from "./Components/TopBar";

createRoot(document.getElementById(TopBar.id) as HTMLElement).render(
  <React.StrictMode>
    <TopBar />
  </React.StrictMode>
);
