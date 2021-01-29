import React from 'react';
import MenuInferior from '../components/MenuInferior';
import Header from '../components/Header';

function Explore() {
  return (
    <div>
      Explore
      <Header title="Explorar" search={ false } />
      <MenuInferior />
    </div>
  );
}

export default Explore;
