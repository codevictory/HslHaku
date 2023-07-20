import React, { useState } from 'react';
import { BiBus, BiTrain } from 'react-icons/bi';

export const HslSearch = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState('');

  async function getRoutes() {
    setLoading(true);
    let ignore = false;
    const response = await fetch(`hslroutes/search/${term}`);
    const data = await response.json();
    if (!ignore) {
      setRoutes(data.routes);
    }
    setLoading(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    getRoutes();
  };

  const handleChange = async (event) => {
    setTerm(event.target.value);
  };

  return (
    <div>
      <h1>HSL aikatauluhaku</h1>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <h2>Hae linjan numerolla</h2>
            <input name='term' required onChange={handleChange} />
          </label>
        </fieldset>
        <button type='submit'>Hae</button>
      </form>
      {loading ? (
        <p>Lataa...</p>
      ) : (
        <ul>
          {routes.map((route) => {
            return (
              <li key={route.shortName}>
                ({route.shortName}) {route.longName}{' '}
                {route.mode == 'BUS' ? <BiBus /> : <BiTrain />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
