import React, { useEffect, useState } from 'react';

const Content = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');

  const handleQrLogin = async refresh_token => {
    try {
      const res = await fetch('https://keyri.us.auth0.com/oauth/token', {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          client_id: 'K4RWxNFhsHU7xDTxVqGzW9x2JWlf5ily',
          client_secret: '7RlMb6UVQrThv6bhnhi-ZlYPKH5to8UPstuMmCrefBsSCgnMwe2O_iDUxLX5gEIg',
          refresh_token: refresh_token
        })
      });
      const data = await res.json();

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('id_token', data.id_token);

      // Decode the JWT to get the user's name
      const jwt = data.id_token.split('.')[1];
      const decodedJwt = JSON.parse(atob(jwt));
      setUserId(decodedJwt.sub);
      setAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
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
      {!authenticated && (
        <div>
          <p className="lead" data-testid="hero-lead">
            Log in by scanning the QR code below with the example Keyri-Auth0 app.
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
      {authenticated && (
        <div>
          <p className="lead" data-testid="hero-lead">
            Logged in! Your userId is {userId}
          </p>
        </div>
      )}
    </div>
  );
};

export default Content;
