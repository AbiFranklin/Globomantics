import React, { Component } from 'react';
import './main-page.css';
import Header from './header'
import FeaturedHouse from '../main-page/featured-house';

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
    })
  }

  determineFeaturedHouse = () => {
    if (this.allHouses) {
      const randomIndex = Math.floor(Math.random() * this.allHouses.length);
      const featuredHouse = this.allHouses[randomIndex];
      this.setState({ featuredHouse });
    }
  }
  
  render() { 
    return ( 
      this.state.loading ?
      <h1>Loading ...</h1> :
      <div className="container">
        <Header subtitle="Providing houses all over the world" />
        <FeaturedHouse house={this.state.featuredHouse} />
      </div>
     );
  }
}
 
export default App;
