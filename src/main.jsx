import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store, { persistor } from "./store"; // المسار إلى ملف store.js
import { PersistGate } from "redux-persist/integration/react"
import App from "./App";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
