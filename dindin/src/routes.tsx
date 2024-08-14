import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './login/Login';
import { Register } from './register/Register';
import { Home } from './home/Home';

export const RoutesApp = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
};
