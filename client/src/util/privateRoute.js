import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ auth }) => {
    return auth ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
