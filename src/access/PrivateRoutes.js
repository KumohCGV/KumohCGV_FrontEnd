import { Navigate, Redirect, useLocation } from "react-router-dom";

const PrivateRoutes = (
  {
    user,
    redirectPath = '/login',
    children,
  }) => {
    const { pathname } = useLocation();
    if (!user) {
      //return <Navigate to={redirectPath} replace />;
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: {
              from: pathname
            }
          }}
        />
      );
    }
  
    return children;
  };

export default PrivateRoutes;
