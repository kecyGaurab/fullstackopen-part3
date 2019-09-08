import React from 'react';

//component that lists 2 to 10 matching country names
const ShowTenCountries = ({country, filteredCountries, handleClick}) => {
  const tenCountries =
    filteredCountries.length > 1 && filteredCountries.length < 11
      ? filteredCountries.map(ten => (
          <div key={ten.name}>
            {ten.name}
            {ten.index}
            <button value={country.indexOf(ten)} onClick={handleClick}>
              show
            </button>
          </div>
        ))
      : null;
  return <div>{tenCountries}</div>;
};

export default ShowTenCountries;
