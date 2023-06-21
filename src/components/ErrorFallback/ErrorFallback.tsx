import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorFallback({ error }: { error: Error }) {
  const navigate = useNavigate();
  const resetBoundary = () => {
    navigate('/');
  };
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <p>This path do not exist: {error.message}</p>
      <p>Please press this button below and reload the page</p>
      <button onClick={resetBoundary}>Press</button>
    </div>
  );
}
export default ErrorFallback;
