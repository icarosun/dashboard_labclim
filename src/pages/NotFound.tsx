import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="">
      <div className="">
        <h1 className="">404</h1>
        <p className="">Page not found!</p>
        <a href="/" className="">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
