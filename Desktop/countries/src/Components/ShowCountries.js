import React from 'react';

//component that list the details of the country
const ShowCountries = ({filteredCountries, icon, wind, temp, wind_dir}) => {
  console.log('icon', icon);
  const countryCard =
    filteredCountries.length === 1 ? (
      <div key={filteredCountries[0].numericCode}>
        <h1>{filteredCountries[0].name}</h1>
        <div>
          <p>Capital: {filteredCountries[0].capital}</p>
          <p>population: {filteredCountries[0].population}</p>
        </div>
        <div>
          <h2>languages</h2>

          {filteredCountries[0].languages.map(lan => (
            <li key={lan.name}>{lan.name}</li>
          ))}
        </div>

        <img
          style={{width: 200, margin: 10}}
          alt="flag"
          src={filteredCountries[0].flag}
        />

        <h2>Weather in {filteredCountries[0].capital}</h2>
        <p>
          <b>Temperature: </b>
          {temp} °C{' '}
        </p>
        <img alt="weather condition" src={icon} />
        <span>
          <div></div>
          <p>
            <b>Wind:</b> {wind} {wind_dir} kph
          </p>
        </span>
      </div>
    ) : null;
  return <div>{countryCard}</div>;
};

export default ShowCountries;
