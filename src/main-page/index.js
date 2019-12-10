import React, { Component } from 'react';
import './main-page.css';
import Header from './header'
import FeaturedHouse from './featured-house';
import HouseFilter from './house-filter';
import House from '../house';
import SearchResults from '../search-results'

class App extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    this.fetchHouses();
  }

  fetchHouses = () => {
    fetch('/houses.json')
    .then(res => res.json())
    .then(allHouses => {
      this.allHouses = allHouses;
      this.determineFeaturedHouse();
      this.setState({ loading: false });
      this.determineUniqueCountries();
    })
  }

  determineFeaturedHouse = () => {
    if (this.allHouses) {
      const randomIndex = Math.floor(Math.random() * this.allHouses.length);
      const featuredHouse = this.allHouses[randomIndex];
      this.setState({ featuredHouse });
    }
  }

  determineUniqueCountries = () => {
    const countries = this.allHouses ?
    Array.from (new Set(this.allHouses.map(h => h.country)))
    : [];
    countries.unshift(null);
    this.setState({ countries })
  }

  filterhouse = (country) => {
    this.setState({ activeHouse: null })
    const filteredHouses = this.allHouses.filter((h) => h.country === country);
    this.setState({ filteredHouses });
    this.setState({ country });
  }

  setActiveHouse = (house) => {
    this.setState({ activeHouse: house })
  }
  
  render() { 
    let activeComponent = null;
    if (this.state.country) {
      activeComponent = <SearchResults country={this.state.country}
         filteredHouses={this.state.filteredHouses} setActiveHouse={this.setActiveHouse} />;
    }
    if (this.state.activeHouse) {
      activeComponent = <House house={this.state.activeHouse} />
    }
    if (!activeComponent) {
      activeComponent = <FeaturedHouse house={this.state.featuredHouse} />
    }
    return ( 
      this.state.loading ?
      <h1>Loading ...</h1> :
      <div className="container">
        <Header subtitle="Providing houses all over the world" />
        <HouseFilter countries={this.state.countries} filterHouses={this.filterhouse} />
        {activeComponent}
      </div>
     );
  }
}
 
export default App;
