import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/gtm';

const RouteTracker = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    trackPageView({
      path: pathname,
      title: document.title,
    });
  }, [pathname]);

  return null;
};

export default RouteTracker;
