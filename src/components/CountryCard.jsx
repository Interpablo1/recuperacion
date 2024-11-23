import React from "react";
import "../styles/CountryList.css"; // Estilos para las tarjetas

const CountryCard = ({ country, onClick }) => {
  return (
    <div className="country-card" onClick={() => onClick(country.cca3)}>
      <img
        src={country.flags?.svg}
        alt={`${country.name.common} flag`}
        className="country-flag"
      />
      <h3>{country.name.common}</h3>
    </div>
  );
};

export default CountryCard;
