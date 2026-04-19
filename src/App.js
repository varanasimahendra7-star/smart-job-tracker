import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ApplicationProvider } from "./context/ApplicationContext";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import AddApplication from "./pages/AddApplication";
import "./App.css";

function App() {
  return (
    <ApplicationProvider>
      <BrowserRouter>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/applications">Applications</Link>
          <Link to="/add">Add Job</Link>
        </nav>

        <div className="page">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/add" element={<AddApplication />} />
            <Route path="/edit/:id" element={<AddApplication />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ApplicationProvider>
  );
}

export default App;