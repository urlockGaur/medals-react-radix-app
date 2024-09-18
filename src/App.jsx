import { useState, useEffect, useRef } from 'react'
import NewCountry from './components/NewCountry';
import Country from './components/Country';
import { Theme, Button, Flex, Heading, Badge, Container } from '@radix-ui/themes';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import '@radix-ui/themes/styles.css';
import './App.css'

function App() {
  const [appearance, setAppearance] = useState("dark");
  const [countries, setCountries] = useState([]);
  const medals = useRef([
    { id: 1, name: 'gold', color: '#FFD700', rank: 1 },
    { id: 2, name: 'silver', color: '#C0C0C0', rank: 2 },
    { id: 3, name: 'bronze', color: '#CD7F32', rank: 3 },
  ]);

  function toggleAppearance() {
    setAppearance(appearance === "light" ? "dark" : "light");
  }

  function handleAdd(name) {
    const id = countries.length === 0 ? 1 : Math.max(...countries.map(country => country.id)) + 1;
    setCountries([...countries].concat({ id: id, name: name, gold: 0, silver: 0, bronze: 0 }));
  }
  function handleDelete(countryId) {
    setCountries([...countries].filter(c => c.id !== countryId));
  }
  function handleIncrement(countryId, medalName) {
    const idx = countries.findIndex(c => c.id === countryId);
    const mutableCountries = [...countries];
    mutableCountries[idx][medalName] += 1;
    setCountries(mutableCountries);
  }
  function handleDecrement(countryId, medalName) {
    const idx = countries.findIndex(c => c.id === countryId);
    const mutableCountries = [...countries];
    mutableCountries[idx][medalName] -= 1;
    setCountries(mutableCountries);
  }
  function getAllMedalsTotal() {
    let sum = 0;
    medals.current.forEach(medal => { sum += countries.reduce((a, b) => a + b[medal.name], 0); });
    return sum;
  }

  // this is the functional equivalent to componentDidMount
  useEffect(() => {
    // initial data loaded here
    let fetchedCountries = [
      { id: 1, name: 'United States', gold: 2, silver: 2, bronze: 3 },
      { id: 2, name: 'China', gold: 3, silver: 1, bronze: 0 },
      { id: 3, name: 'Germany', gold: 0, silver: 2, bronze: 2 },
      { id: 4, name: 'France', gold: 2, silver: 2, bronze: 1 },
      { id: 5, name: 'Spain', gold: 1, silver: 1, bronze: 0 },
      { id: 6, name: 'United Kingdom', gold: 0, silver: 2, bronze: 3 },
      { id: 7, name: 'Brazil', gold: 3, silver: 0, bronze: 0 },
      { id: 8, name: 'Italy', gold: 2, silver: 2, bronze: 2 },
      { id: 9, name: 'Switzerland', gold: 1, silver: 1, bronze: 2 },
      { id: 10, name: 'Poland', gold: 0, silver: 2, bronze: 1 },
      { id: 11, name: 'Sweden', gold: 0, silver: 3, bronze: 1 },
      { id: 12, name: 'Ireland', gold: 2, silver: 1, bronze: 0 },
      { id: 13, name: 'Scotland', gold: 3, silver: 0, bronze: 2 },
    ]
    setCountries(fetchedCountries);
  }, []);

  return (
        <Theme appearance={appearance}>
      <Button onClick={toggleAppearance} style={{ position: "fixed", bottom: 20, right: 20, zIndex: 100 }} variant="ghost">
        {
          (appearance === "dark") ? <MoonIcon /> : <SunIcon />
        }
      </Button>
      <Flex p="2" pl="8" className="fixedHeader" justify="between">
        <Heading size="6">
          Olympic Medals
          <Badge variant="outline" ml="2">
            <Heading size="6">{getAllMedalsTotal()}</Heading>
          </Badge>
        </Heading>
        <NewCountry onAdd={handleAdd} />
      </Flex>
      <Container className="bg">
      </Container>
      <Flex wrap="wrap" justify="center">
        {
          countries.sort((a, b) => a.name.localeCompare(b.name)).map(country =>
            <Country
              key={country.id}
              country={country}
              medals={medals.current}
              onDelete={handleDelete}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
          )
        }
      </Flex>
    </Theme>
  )
}

export default App
