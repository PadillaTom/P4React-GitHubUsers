import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  // console.log(repos);// Vemos que funciona
  const chartData = [
    {
      label: 'Html',
      value: '13',
    },
    {
      label: 'Css',
      value: '80',
    },
    {
      label: 'Javascript',
      value: '25',
    },
  ];

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={chartData}></Pie3D>
        {/* <ExampleChart data={chartData}></ExampleChart>; */}
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
