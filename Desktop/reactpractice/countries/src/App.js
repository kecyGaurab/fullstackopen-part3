import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import SearchCountries from './Components/SearchCountries';
import ShowCountries from './Components/ShowCountries';
import ShowTenCountries from './Components/ShowTenCountries';
import Manyresults from './Components/Manyresults';

const App = () => {
  const [country, setCountry] = useState([]);
  const [searchTerm, setSearch] = useState('');
  const [filteredCountries, setfilteredCountries] = useState([]);
  const [icon, setIcon] = useState('');
  const [temp, setTemp] = useState('');
  const [wind, setWind] = useState('');
  const [wind_dir, setWind_dir] = useState('');

  const filterCountries = () => {
    const searchCountries = country.filter(c => {
      if (searchTerm.length === 0) {
        return '';
      }
      return c.name.toLowerCase().startsWith(searchTerm.toLowerCase());
    });
    return setfilteredCountries(searchCountries);
  };

  console.log('filteredCountries', filteredCountries);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountry(response.data);
    });
  }, []);

  useEffect(() => {
    const getWeather = () => {
      if (filteredCountries.length === 1) {
        let countryCapital = filteredCountries[0].capital;
        axios
          .get(
            `https://api.apixu.com/v1/current.json?key=39c19e120a834f79a5d182145193108&q=${countryCapital}`
          )
          .then(res => {
            setTemp(res.data.current.feelslike_c);
            setWind(res.data.current.wind_kph);
            setWind_dir(res.data.current.wind_dir);
            setIcon(res.data.current.condition.icon);
          });
      }
    };
    getWeather();
  }, [filteredCountries]);

  //event handle that sets search value that is input
  const handleOnSearch = e => {
    setSearch(e.target.value);
    filterCountries();
  };

  //click event handler that takes in the value
  //of the parent of button element and sets the search state to that name
  const handleClick = e => {
    const cont = country[e.currentTarget.value].name;
    setSearch(cont);
    filterCountries();
  };

  //function that generates an array of countries that matches the user search input

  return (
    <div className="App">
      <SearchCountries country={country} handleOnSearch={handleOnSearch} />
      <Manyresults filteredCountries={filteredCountries} />
      <ShowCountries
        filteredCountries={filteredCountries}
        country={country}
        icon={icon}
        wind={wind}
        temp={temp}
        wind_dir={wind_dir}
      />

      <ShowTenCountries
        filteredCountries={filteredCountries}
        handleClick={handleClick}
        country={country}
      />
    </div>
  );
};

export default App;
