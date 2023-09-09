import "./app.css";
import App from "./App.svelte";

import { defineCustomElements } from "@esri/calcite-components/dist/loader";

defineCustomElements(window);

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
