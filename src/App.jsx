import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./Layout/MainLayout";
import { Suspense, lazy } from "react";
import Loading from "./Components/Loading";

// Lazy load the components
const Coins = lazy(() => import("./Pages/Coins"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="coins" element={<Coins />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
