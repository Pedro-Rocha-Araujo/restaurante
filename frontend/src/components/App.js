import { BrowserRouter } from "react-router-dom"
import RouterApp from "../routes"
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <BrowserRouter>
      <main>
        <ToastContainer 
          autoClose="1000" 
          theme="dark"
        />
        <RouterApp />
      </main>
    </BrowserRouter>
  );
}

export default App;
