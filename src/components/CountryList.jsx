import React, { useEffect, useState } from "react";
import Modal from "react-modal"; // Importa react-modal
import { fetchAllCountries, fetchCountryById } from "../api/countriesApi";
import CountryCard from "./CountryCard";

Modal.setAppElement("#root"); // Necesario para accesibilidad

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAllCountries()
      .then(setCountries)
      .catch(console.error);
  }, []);

  const handleCountrySelect = (id) => {
    fetchCountryById(id)
      .then((data) => {
        setSelectedCountry(data[0]); // Guarda la información del país seleccionado
        setIsModalOpen(true); // Abre el modal
      })
      .catch(console.error);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
  };

  return (
    <div>
      <h1>Country List</h1>
      <div className="country-list">
        {countries.map((country) => (
          <CountryCard
            key={country.cca3}
            country={country}
            onClick={handleCountrySelect}
          />
        ))}
      </div>

      {/* Modal para mostrar la información del país */}
      {selectedCountry && (
        <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Country Details"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.85)", // Fondo oscuro con transparencia
          },
          content: {
            maxWidth: "350px", // Ancho máximo del modal
            maxHeight: "90vh", // Altura máxima del modal (para pantallas pequeñas)
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#808080", // Fondo del modal
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)", // Sombra para destacar
            overflow: "auto", // Habilita scroll si el contenido es largo
          },
        }}
      >      
          <h2>{selectedCountry.name.official}</h2>
          <img
            src={selectedCountry.flags?.svg}
            alt={`${selectedCountry.name.official} flag`}
            style={{ width: "100%" }}
          />
          <p><strong>Region:</strong> {selectedCountry.region}</p>
          <p><strong>Subregion:</strong> {selectedCountry.subregion}</p>
          <p><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>
          <p><strong>Capital:</strong> {selectedCountry.capital?.join(", ")}</p>
          <p><strong>Languages:</strong> {Object.values(selectedCountry.languages || {}).join(", ")}</p>
          <p>
            <strong>Currencies:</strong>{" "}
            {Object.values(selectedCountry.currencies || {})
              .map((currency) => `${currency.name} (${currency.symbol})`)
              .join(", ")}
          </p>
          <button onClick={closeModal} style={{ marginTop: "20px" }}>
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default CountryList;
