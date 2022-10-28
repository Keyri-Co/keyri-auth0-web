import React from 'react';

const Hero = () => (
  <div className="hero my-5 text-center" data-testid="hero">
    <h1 className="mb-4" data-testid="hero-title">
      Auth0 + Keyri Sample Project
    </h1>

    <p className="lead" data-testid="hero-lead">
      First, register with the button in the navbar, then log in with the QR code.
    </p>
    <iframe
      src="./KeyriQR.html"
      id="qr - frame"
      frameborder={0}
      height={300}
      width={300}
      scrolling="no"
      style={{ borderWidth: 5 }}></iframe>
  </div>
);

export default Hero;
