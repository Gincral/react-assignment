import './App.scss';
import React from 'react';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      name: '',
      id: '',
      price: '00',
      loading: true
    }
  }

  componentDidMount = async () => {
    const url = "https://rest.coinapi.io"
    const headers = {
      "X-CoinAPI-Key": "1138FD9C-E23E-40D6-A36B-5324C9744D95"
    }
    const response = await axios.get(url + `/v1/assets`, { headers })
      .catch(function (error) {
        console.log(error);
        return error;
      });
    const data = response.data.slice(0, 10)
    this.setState({ coins: data })
    this.setState({ loading: false })
  }

  getData = (coin) => {
    this.setState({ name: coin.name })
    this.setState({ id: coin.asset_id })
    this.setState({ price: coin.price_usd })
  }

  render() {
    return (
      <div className="App">
        <div className="sidebar">
          {this.state.coins.map(coin => (
            <div className="side-btn" key={coin.asset_id} onClick={() => this.getData(coin)}>{coin.name}</div>
          ))}
        </div>
        <div className="content">
          {this.state.loading && (<>
            <div>Loading ...</div>
          </>)}
          {!this.state.loading && (<>
            <div>Name:<b>{'  ' + this.state.name}</b></div>
            <div>Asset ID:<b>{'  ' + this.state.id}</b></div>
            <div>Price:<b>{'  ' + this.state.price}</b> USD</div>
          </>)}
        </div>
      </div>
    );
  }
}

export default App;
