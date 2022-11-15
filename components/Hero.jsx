import React, { useEffect } from 'react';

import { useUser } from '@auth0/nextjs-auth0';

const Hero = () => {
  const { user } = useUser();

  const handleQrLogin = async refresh_token => {
    const res = await fetch('https://keyri.us.auth0.com/oauth/token', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-control-allow-origin': '*',
        'access-control-allow-headers': 'origin, x-requested-with, content-Type, accept, authorization, methods',
        'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: 'K4RWxNFhsHU7xDTxVqGzW9x2JWlf5ily',
        client_secret: '7RlMb6UVQrThv6bhnhi-ZlYPKH5to8UPstuMmCrefBsSCgnMwe2O_iDUxLX5gEIg',
        refresh_token: refresh_token
      })
    });
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    window.addEventListener('message', async evt => {
      if (evt.data.keyri && evt.data.data && document.location.origin == evt.origin) {
        const { data } = evt;
        if (!data.error) {
          console.log(data);
          let refresh_token = JSON.parse(data.data).refreshToken;
          await handleQrLogin(refresh_token);
        } else if (data.error) {
          console.log(`Keyri error: ${data.message}`);
        }
      }
    });
  }, []);

  return (
    <div className="hero my-5 text-center" data-testid="hero">
      <h1 className="mb-4" data-testid="hero-title">
        Auth0 + Keyri Sample Project
      </h1>
      {!user && (
        <div>
          <p className="lead" data-testid="hero-lead">
            First, register with the button in the navbar, then log in with the QR code.
          </p>
          <iframe
            src="./KeyriQR.html"
            id="qr - frame"
            frameBorder={0}
            height={300}
            width={300}
            scrolling="no"
            style={{ borderWidth: 0 }}></iframe>
        </div>
      )}
      {user && (
        <div>
          <p className="lead" data-testid="hero-lead">
            Logged in! You can now access the profile page.
          </p>
        </div>
      )}
    </div>
  );
};

export default Hero;
