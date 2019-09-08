import React from 'react';

const SearchCountries = ({handleOnSearch, searchTerm}) => {
  return (
    <div>
      Find countries <input placeholder='Search countries...'value={searchTerm} onChange={handleOnSearch} />
    </div>
  );
};

export default SearchCountries;
