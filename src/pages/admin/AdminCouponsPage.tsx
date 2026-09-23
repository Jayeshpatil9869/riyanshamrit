import React, { useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';

export const AdminCouponsPage: React.FC = () => {
  const { navigate } = useRouter();

  useEffect(() => {
    navigate('/admin');
  }, [navigate]);

  return null;
};
