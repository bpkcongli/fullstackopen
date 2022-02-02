import React, {useState} from 'react';
import WeatherCountry from './WeatherCountry';

const CountryDetail = ({country}) => {
  const {name, capital, population, languages, flagUrl} = country;
  
  return <div>
    <h2>{name}</h2>
    capital {capital}<br />
    population {population}<br />
    <h3>Spoken languages</h3>
    <ul>
      {
        languages.map((language, i) => <li key={i}>{language}</li>)
      }
    </ul>
    <img alt={`${name} flag`} src={flagUrl} width="20%" height="20%" />
    <WeatherCountry name={capital} />
  </div>
};

const CountryName = ({country}) => {
  const [isShown, setIsShown] = useState(false);
  const isShownHandler = () => setIsShown(!isShown);

  return (
    <div>
      {country.name}
      <button type="button" onClick={isShownHandler}>
        {isShown ? 'hide' : 'show'}
      </button>
      {
        isShown ?
          <CountryDetail country={country} /> :
          <div></div>
      }
    </div>
  );
};

const SearchResult = ({countries}) => {
  let jsx;

  if (countries.length === 1) {
    jsx = <CountryDetail country={countries[0]} />
  } else if (countries.length <= 10) {
    jsx = <div>
      {
        countries.map((country, i) => <CountryName key={i} country={country} />)
      }
    </div>
  } else {
    jsx = <div>Too many matches, specify another filter</div>
  }

  return jsx;
};

export default SearchResult;
