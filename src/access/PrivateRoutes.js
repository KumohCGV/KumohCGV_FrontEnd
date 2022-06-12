import { Navigate, Link } from "react-router-dom";

const PrivateRoutes = (
  {
    user,
    redirectPath = '/login',
    children,
  }) => {
    if (!user) {
      return (
        <Navigate
          to={{
            pathname: redirectPath,
            state: {
              from: '/ticket'
            }
          }}
        />
      );
    }
  
    return children;
  };

export default PrivateRoutes;
