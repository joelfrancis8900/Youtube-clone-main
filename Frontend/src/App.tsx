import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WatchPage from "./pages/WatchPage/WatchPage";
import './App.css'; // Optional: page-specific styles


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch" element={<WatchPage />} />
      </Routes>
    </Router>
  );
};

export default App;