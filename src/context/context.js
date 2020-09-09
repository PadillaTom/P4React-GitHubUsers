import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';
// ********* AXIOS ----------> AYUDA con la DATA de los URLS.
// No tenemos que usar JSON. Ya convierte todo

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();
// Provider
const GithubProvider = ({ children }) => {
  // Set the state and return a useState(Data, Function to setState)
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  // **** API *****
  // Request Loading:
  const [requests, setRequests] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: '' });

  // -----------> Check Rate (API) ---> AXIOS: ayudará a ingersar a los  URL
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        // console.log(data); // Vemos que nos tira un Object cont oda la INFO tomada por AXIOS
        // Destructure dicha DATA para obtener los values deseados:
        let {
          rate: { remaining },
        } = data;
        // remaining = 0; // Para probar el ERROR
        setRequests(remaining);
        if (remaining === 0) {
          //Throw Error
          toggleError(true, 'No more Requests');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // -------> Display ERROR functions:
  function toggleError(show = false, msg = '') {
    setError({ show, msg });
  }
  useEffect(checkRequests, []); // Cargará una sola vez
  return (
    <GithubContext.Provider
      value={{ githubUser, repos, followers, requests, error }}
    >
      {children}
    </GithubContext.Provider>
  );
};
// GithubContext --> Pasamos el Context dentro del provider y los children.
// IMPORTANTE --> Value = {}
export { GithubContext, GithubProvider };
// Luego vamos a Index.js and Import GithubProvider
// then --> Wrap the APP between <GithubProvider> APP </GithubProvider>
