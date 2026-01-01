import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WatchPage from "./pages/WatchPage/WatchPage";
import TestPage from "./pages/TestPage"
import Upload from "./pages/Upload";
import UploadVideosHome from "./pages/UploadVideosHome";
import './App.css'; // Optional: page-specific styles


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch" element={<WatchPage />} />
        <Route path="/TestPage" element={<TestPage />} />
        <Route path="/Upload" element={<Upload />} />
        <Route path="/UploadVideosHome" element={<UploadVideosHome />} />
      </Routes>
    </Router>
  );
};

export default App;