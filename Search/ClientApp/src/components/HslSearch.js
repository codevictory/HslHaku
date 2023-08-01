import React, { useState } from 'react';
import { BiBus, BiTrain, BiSearchAlt } from 'react-icons/bi';
import SyncLoader from 'react-spinners/SyncLoader';

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

      <form onSubmit={handleSubmit} style={{ padding: '1rem' }}>
        <fieldset>
          <label>
            <h4>Hae linjan numerolla</h4>
            <input
              name='term'
              required
              onChange={handleChange}
              style={{ marginTop: '0.5rem', marginBottom: '1rem' }}
            />
            <button
              type='submit'
              style={{
                paddingLeft: 10,
                backgroundColor: 'transparent',
                border: 'none',
              }}
            >
              <BiSearchAlt fontSize={25} />
            </button>
          </label>
        </fieldset>
      </form>
      {loading ? (
        <SyncLoader loading={loading} style={{ marginLeft: '3rem' }} />
      ) : (
        <ul>
          {routes.map((route) => {
            return (
              <li key={route.shortName}>
                {route.mode === 'BUS' ? (
                  <BiBus style={{ color: 'green' }} />
                ) : (
                  <BiTrain style={{ color: 'blue' }} />
                )}{' '}
                ({route.shortName}) {route.longName}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
