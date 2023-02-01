import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Footer from "./components/footer/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Searchmovie from "./pages/Searchmovie";
import Searchtvshow from "./pages/Searchtvshow";
import Detail from "./pages/Detail";
import Account from "./pages/Account";
import { AuthContextProvider } from "./context/Authcontext";
import { Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/searchmovie" element={<Searchmovie />} />
          <Route path="/searchtv" element={<Searchtvshow />} />
          <Route path="/:category/:id" element={<Detail/>}></Route>
          <Route path="/account" element={<Account />} />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </>
  );
}

export default App;
