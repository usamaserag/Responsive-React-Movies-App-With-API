import "./App.scss";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Details from "./pages/Details";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/:category/search/:keyword" element={<Catalog />} />
        <Route path="/:category/:id" element={<Details />} />
        <Route path="/:category" element={<Catalog />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;