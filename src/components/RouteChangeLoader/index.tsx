import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../Loader';

const RouteChangeLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // simulate network delay (adjust if needed)

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return loading ? <Loader /> : null;
};

export default RouteChangeLoader;
