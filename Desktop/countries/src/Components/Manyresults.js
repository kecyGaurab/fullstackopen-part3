import React from 'react';

//component that displays the text when the matching results are more than 10
const Manyresults = ({filteredCountries}) => {
  const msg =
    filteredCountries.length > 10 ? (
      <div>Too many matches, specify another filter</div>
    ) : null;

  return <div>{msg}</div>;
};

export default Manyresults;
