import { BrowserRouter , Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./stylesheets/alignments.css"
import "./stylesheets/sizes.css"
import "./stylesheets/form-elements.css"
import "./stylesheets/theme.css"
import "./stylesheets/customs.css"
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div >
      {loading && (<div className="loader-parent">
      <div className="loader"></div>
      </div>)}
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
