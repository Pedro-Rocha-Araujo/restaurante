import { BrowserRouter } from "react-router-dom"
import RouterApp from "../routes"
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose="1000" />
      <RouterApp />
    </BrowserRouter>
  );
}

export default App;
