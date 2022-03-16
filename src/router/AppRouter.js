import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/PageHome";
import Register from "../pages/PageRegister";
import Login from "../pages/PageLogin";
import Nav from "../components/Nav";
import "../scss/styles.scss";

export default function AppRouter() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
