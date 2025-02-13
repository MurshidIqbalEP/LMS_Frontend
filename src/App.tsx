import AppRoute from "./routes/appRoute";
import { BrowserRouter } from "react-router-dom";
import { ReactLenis } from "@studio-freight/react-lenis";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from 'sonner';

function App() {
  return (
    <BrowserRouter>
      <ReactLenis root>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Toaster position="top-right" richColors closeButton />
          <AppRoute />
        </GoogleOAuthProvider>
      </ReactLenis>
    </BrowserRouter>
  );
}

export default App;
