import Login from "./Login";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chats from "./Chats";

const App = () => {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" Component={ Login } />
            <Route path="/chats" Component={ Chats } />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
