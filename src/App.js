import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Coin from './Coin';



function App() {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=myr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data)
        console.log(res.data)
      })
      .catch(error => alert(error))

  }, [])

  const handleSearch = e => {
    setSearch(e.target.value)

  }

  const filterCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLocaleLowerCase()))

  const finalCoins = filterCoins.map(coin => {
    return <Coin key={coin.id}
      name={coin.name}
      image={coin.image}
      symbol={coin.symbol}
      price={coin.current_price}
      volume={coin.total_volume}
      priceChange={coin.market_cap_change_percentage_24h}
      marketCap={coin.market_cap} />
  })


  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form >
          <input type="text" placeholder='Search' className="coin-input" value={search} onChange={handleSearch}></input>
        </form>

      </div>
      <div className='coin-scroll'>
        {finalCoins}
      </div>

    </div>
  );
}

export default App;
