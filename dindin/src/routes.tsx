import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { Login } from './login/Login';
import { Register } from './register/Register';
import { Home } from './home/Home';

function PrivateRoute() {
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/login" />
}

export const RoutesApp = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/home" element={<Home />} />
                </Route>
            </Routes>
        </Router>
    );
};

