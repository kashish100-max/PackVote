import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Preferences from "./pages/Preferences";
import Dashboard from "./pages/Dashboard";
import Result from "./pages/Result";
import SmoothScroll from "./SmoothScroll";
import Success from "./pages/Success";
import JoinTrip from "./pages/joinTrip";

import ChatBot from "./components/ChatBot";


function App() {
  return (
    <Router>
      <SmoothScroll />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/result" element={<Result />} />
        <Route path="/success" element={<Success />} />
        <Route path="/joinTrip" element={<JoinTrip />} />
      </Routes>

      <ChatBot />
    </Router>
  );
}

export default App;