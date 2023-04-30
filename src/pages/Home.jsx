import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card';

function App() {
  const [starships, setStarships] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [starshipsFiltered, setStarshipsFiltered] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      const urls = [
        'https://swapi.dev/api/starships/?page=1',
        'https://swapi.dev/api/starships/?page=2',
        'https://swapi.dev/api/starships/?page=3',
        'https://swapi.dev/api/starships/?page=4'
      ];

      const promises = urls.map(url => axios.get(url));
      const responses = await Promise.all(promises);

      const results = responses.flatMap(response => response.data.results);

      setStarships(results);
      setStarshipsFiltered(results);
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = starships.filter(starship =>
      starship.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setStarshipsFiltered(filtered);
  };

  
  
  return (
    <div>
        <div className="hero min-h-screen">
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <img
              className="w-70 h-40 items-center"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1041px-Star_Wars_Logo.svg.png"
              alt=""
            />
            <p className="my-5 text-black ">Name / Model :</p>
            <div className="form-control">
              <div className="input-group flex justify-center text-black">
                <input
                  type="text"
                  placeholder="Name / Model"
                  className="input input-bordered"
                  value={searchTerm}
                  onChange={event => setSearchTerm(event.target.value)}
                />
                <button
                  onClick={handleSearch}
                  className="btn btn-success"
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {starships && starshipsFiltered.length === 0 && (
        <div className="alert alert-warning shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Dikkat! Aradığınız uzay gemisi sistemimizde yok.</span>
          </div>
        </div>
      )}
      <div
        id="ships-section"
        className="container grid grid-cols-2 md:grid-cols-3 gap-4 mt-16 gap-y-8"
      >
        {starships &&
          starshipsFiltered.map((item, index) => (
            <div key={index} className="flex justify-center items-center h-96">
              <Card
                item={item}
                model={item.model}
                hyperdrive_rating={item.hyperdrive_rating}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
