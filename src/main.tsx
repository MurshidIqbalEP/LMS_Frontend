
import { createRoot } from 'react-dom/client'
import "antd/dist/reset.css"; 
import './index.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import App from './App.tsx'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store,{ persistor } from "./redux/store.ts";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
)
