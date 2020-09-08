import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();
// Provider
const GithubProvider = ({ children }) => {
  // Set the state and return a useState(Data, Function to setState)
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  return (
    <GithubContext.Provider value={{ githubUser, repos, followers }}>
      {children}
    </GithubContext.Provider>
  );
};
// GithubContext --> Pasamos el Context dentro del provider y los children.
// IMPORTANTE --> Value = {}
export { GithubContext, GithubProvider };
// Luego vamos a Index.js and Import GithubProvider
// then --> Wrap the APP between <GithubProvider> APP </GithubProvider>
