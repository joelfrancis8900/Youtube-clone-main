import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WatchPage from "./pages/WatchPage/WatchPage";
import Upload from "./pages/Upload";
import UploadedVideosList from "./pages/UploadedVideosList";
import './App.css'; // Optional: page-specific styles


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch" element={<WatchPage />} />
        <Route path="/Upload" element={<Upload />} />
        <Route path="/UploadedVideosHome" element={<UploadedVideosList />} />
      </Routes>
    </Router>
  );
};

export default App;