// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import Header from './components/layout/Header';
import Player from './components/layout/Player';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PlayerProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1 p-4 pb-24">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route 
                    path="/" 
                    element={
                      <PrivateRoute>
                        <Home />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </main>
              <Player />
            </div>
          </Router>
        </PlayerProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;