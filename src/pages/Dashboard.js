import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
const Dashboard = () => {
  // Hooks
  const { isLoading } = React.useContext(GithubContext);
  if (isLoading) {
    return (
      <main>
        <Navbar></Navbar>
        <Search></Search>
        <img src={loadingImage} alt='loading' className='loading-img'></img>
      </main>
    );
  }

  // Return
  return (
    <main>
      <Navbar></Navbar>
      <Search></Search>
      <Info></Info>
      <User></User>
      <Repos></Repos>
    </main>
  );
};

export default Dashboard;
