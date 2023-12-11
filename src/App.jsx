import Chat from "./components/Chat";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from "./helpers/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Login />}/>
        <Route path="/chat" element={<PrivateRoute element={<Chat />} />}/>
      </Routes>
    </Router>
  );
}

export default App;
