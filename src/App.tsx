import AppRoute from "./routes/appRoute";
import { BrowserRouter } from "react-router-dom";
import { ReactLenis } from "@studio-freight/react-lenis";

function App() {
  return (
    <BrowserRouter>
    <ReactLenis root>
      <AppRoute />
      </ReactLenis>
    </BrowserRouter>
  );
}

export default App;
