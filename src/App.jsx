import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./Layout/MainLayout";

import Coins from "./Pages/Coins";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="coins" element={<Coins />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
