import { useRouter } from 'next/router';
import React from 'react';
import { LinksItems } from '../types/enums';

function NotFound(): JSX.Element {
  const router = useRouter();

  function handleClick(): void {
    router.push(LinksItems.Goods);
  }

  return (
    <>
      <h1 className="NotFound-title">404</h1>
      <p className="NotFound-message">OOPS! Requested page not found</p>
      <div className="NotFound-button__back">
        <button className="NotFound-button" onClick={handleClick}>
          Back to goods
        </button>
      </div>
    </>
  );
}

export default NotFound;
