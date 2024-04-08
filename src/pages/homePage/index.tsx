import React from 'react';

const Home = () => {
  return (
    <div className="container">
      <div className="content">
        <h1>Bienvenido a mi página</h1>
        <p>Gracias por visitarnos. Somos una empresa ficticia dedicada a brindar soluciones innovadoras en tecnología.</p>
        <p>En nuestro sitio web, encontrarás una amplia gama de productos y servicios diseñados para satisfacer tus necesidades.</p>
        <button className="cta-button">Explorar</button>
      </div>
      <div className="image-container">
        <img src="https://via.placeholder.com/500" alt="Imagen de inicio" />
      </div>
    </div>
  );
};

export default Home;
