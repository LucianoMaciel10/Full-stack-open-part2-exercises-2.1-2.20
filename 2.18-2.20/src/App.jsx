import axios from "axios"
import { useEffect, useState } from "react"
import Country from "./Components/Country"
import CountryItem from "./Components/CountryItem"

function App() {
  const [search, setSearch] = useState('')
  const [countrys, setCountrys] = useState([])
  const [countrysNames, setCountrysNames] = useState([])
  const [countrysFiltered, setCountryFiltered] = useState([])

  const handleChangeSearch = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    if (!search) {
      setCountryFiltered([])
      return
    }

    const coutriesFilteredArray = countrysNames.filter(countrie => countrie.toLowerCase().includes(search.toLowerCase()))
    setCountryFiltered(coutriesFilteredArray)
  }, [search])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => {
        setCountrys(res.data)
        setCountrysNames(res.data.map(c => c.name.common))
      })
  }, [])

  return (
    <>
      <label>
        find countries <input disabled={countrysNames.length === 0} type="text" value={search} onChange={handleChangeSearch} />
      </label>
      {
        countrysFiltered.length === 0
          ? !search 
            ? <p>Nothing sought yet</p>
            : <p>No coincidence</p>
          : countrysFiltered.length > 0 && countrysFiltered.length <= 10
            ? countrysFiltered.length === 1
              ? <Country data={countrys.find(country => country.name.common === countrysFiltered[0])} />
              : countrysFiltered.map(country => <CountryItem key={country} data={countrys.find(c => c.name.common === country)} />)
            : <p>Too many matches, specify another filter</p>
      } 
    </>
  )
}

export default App
