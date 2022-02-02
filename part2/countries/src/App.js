import React, {useState, useEffect} from 'react';
import countriesService from './services/countries';
import SearchBox from './components/SearchBox';
import SearchResult from './components/SearchResult';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [countriesResult, setCountriesResult] = useState([]);

  useEffect(() => {
    countriesService.getAllCountries()
      .then((countries) => {
        setCountries(countries);
      });
  }, []);

  const mappingToModel = ({
    name,
    capital = [],
    population,
    languages,
    flags,
  }) => (
    {
      name: name.common,
      capital: capital.join(', '),
      population,
      languages: languages ? Object.values(languages) : [],
      flagUrl: flags.png
    }
  );

  const queryHandler = (e) => {
    const {value} = e.target;
    setQuery(value);

    if (countries.length === 0 || value === '') return;
    setCountriesResult(
      countries
        .filter((country) => country.name.common.toLowerCase().includes(value))
        .map(mappingToModel)
    );
  };

  return (
    <div>
      <SearchBox query={query} queryHandler={queryHandler} />
      <SearchResult countries={countriesResult} />
    </div>
  );
};

export default App;
