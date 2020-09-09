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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: '' });
  // Search User
  const searchGithubUser = async (user) => {
    // console.log(user); // Vemos que funciona
    // Toggle Error --> Remover el Error ya mostrado (ya pasamos defaults)
    toggleError();
    // Loading(true)
    setIsLoading(true);
    // Response
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    // console.log(response); // Vemos la DATA solicitada
    if (response) {
      setGithubUser(response.data);
      // Repos :  https://api.github.com/users/john-smilga/repos?per_page=100
      // Followers: https://api.github.com/users/john-smilga/followers
      const { login, followers_url } = response.data;
      //  await axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) =>
      //     setRepos(response.data)
      //   );
      //  await axios(`${followers_url}?per_page=100`).then((response) =>
      //     setFollowers(response.data)
      //   );
      // ----------> ALL SETTLED : <--------------------
      // Esperará a que todo esté en orden y SOLO despues lo mostrará:
      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`), // Esto
        axios(`${followers_url}?per_page=100`), // Esto
      ]).then((results) => {
        // Una vez todo cargado:
        const [repos, followers] = results; // Destructuramos la data
        const status = 'fulfilled'; // FULFILLED IMPORTANTISIMO: mostrará si cargó
        if (repos.status === status) {
          // Si es fulfilled
          setRepos(repos.value.data); // Display
        }
        if (followers.status === status) {
          setFollowers(followers.value.data); // Display
        }
      });
    } else {
      toggleError(true, 'No such User');
    }

    // Volver al inicio:
    checkRequests(); // Mostrar las Req
    setIsLoading(false); // Loading False
  };
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
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
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
