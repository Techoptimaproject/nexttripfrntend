import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Profile from "./Components/Profile/Profile";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Explorecomponent from "./Components/Explore/Explorecomponent";
import Landingpage from "./Components/Landingpage/Landingpage";
import Create from "./Components/Createcomponent/Create";
import Urlpopup from "./Components/Createcomponent/Urlpopup";
import Addpins from "./Components/Createcomponent/Addpins";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>z
          <Route path="/" element={<Login />} />
          <Route path="Landingpage" element={<Landingpage />}>
            <Route path="home" element={<Home />} />
            <Route path="create" element={<Create />} />
            <Route path="explore" element={<Explorecomponent />} />
            <Route path="profile" element={<Profile />} />
            <Route path="Urlpopup" element={<Urlpopup />} />
            <Route path="pins" element={<Addpins/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
