import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <h1>Tervetuloa!</h1>
      <p>Tällä sivulla voit hakea tietoa Helsingin seudun reiteistä.</p>
      <Link to='/haku'>HSL reittihaku</Link>
    </div>
  );
};
