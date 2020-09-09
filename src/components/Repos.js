import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  // console.log(repos);// Vemos que funciona
  //
  //************ Calculate Most Used Language *******************/
  const languages = repos.reduce((total, item) => {
    // console.log(item);// Vemos que log cada itemd el Array
    const { language, stargazers_count } = item;
    // console.log(language); // Vemos los languages, hay algunos NULL a evitar
    if (!language) return total;
    // console.log(language); // Vemos que NO hay NULL
    if (!total[language]) {
      //si NO TIENE dicha propiedad, creamos un OBJECT->
      total[language] = { label: language, value: 1, stars: stargazers_count }; // Creamos un Objeto donde alojaremos el Language
    } else {
      //SI TIENE dicha propiedad: Sumamos al language
      total[language] = {
        // SUMA será
        ...total[language], // Todo lo anterior (spread)
        value: total[language].value + 1, // MAS el valor de lo pasado + 1
        stars: total[language].stars + stargazers_count,
      };
    }
    return total;
  }, {});
  // console.log(languages); // ----> Vemos que SUMA cada entrada y lo guarda en OBJECT
  // ---> Transformar el Object into Array para poder SORT and show only 5 most used languages
  const mostUsed = Object.values(languages) // Array
    .sort((a, b) => {
      return b.value - a.value; // SORT -> Ya que estan de mayor a menor, RESTAMOS b-a
    })
    .slice(0, 5); // SLICE -> Nos dará un index de 0 a 5. (5 most used languages)
  // console.log(languages);
  //
  // ************** Most Stars Per Language ********************
  const mostPopular = Object.values(languages) // Transform in ARRAY
    .sort((a, b) => {
      return b.stars - a.stars; // SORT
    })
    .map((item) => {
      return { ...item, value: item.stars }; // Change VALUE for STARS so my frunciton will work
    })
    .slice(0.5); // Show top 5
  //
  // **************  Stars and Forks ********************
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      // Creamos Primer Object: El count de Stars = {} Object and properties
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };
      return total;
    },
    {
      // Return an object, where the properties are Objects itself
      stars: {},
      forks: {},
    }
  );
  //  ---> Transform into Array
  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  // *** Dummy Data ***
  // const chartData = [
  //   {
  //     label: 'Html',
  //     value: '13',
  //   },
  //   {
  //     label: 'Css',
  //     value: '80',
  //   },
  //   {
  //     label: 'Javascript',
  //     value: '25',
  //   },
  // ];
  // PASAR---> DATA={LANGUAGES}
  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={mostUsed}></Pie3D>
        <Column3D data={stars}></Column3D>
        <Doughnut2D data={mostPopular}></Doughnut2D>
        <Bar3D data={forks}></Bar3D>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
