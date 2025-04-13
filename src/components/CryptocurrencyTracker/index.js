import { Component } from "react";
import { ClipLoader } from "react-spinners";

import CryptocurrenciesList from "../CryptocurrenciesList";

const apiUrl = "https://apis.ccbp.in/crypto-currency-converter";

class CryptocurrencyTracker extends Component {
  state = {
    cryptocurrenciesData: [],
    isLoading: true,
  };

  componentDidMount() {
    this.getCryptocurrencies();
  }

  componentDidUpdate() {
    this.getCryptocurrencies();
  }

  getCryptocurrencies = async () => {
    const response = await fetch(apiUrl);
    const fetchedData = await response.json();

    this.setState({
      cryptocurrenciesData: fetchedData.map((eachCryptocurrency) => ({
        id: eachCryptocurrency.id,
        currencyLogoUrl: eachCryptocurrency.currency_logo,
        currencyName: eachCryptocurrency.currency_name,
        usdValue: eachCryptocurrency.usd_value,
        euroValue: eachCryptocurrency.euro_value,
      })),
      isLoading: false,
    });
  };

  renderCryptocurrenciesList = () => {
    const { cryptocurrenciesData } = this.state;

    return <CryptocurrenciesList cryptocurrenciesData={cryptocurrenciesData} />;
  };

  renderLoader = () => (
    <div className="loader-container">
      <ClipLoader color="#ffffff" size={100} />
    </div>
  );

  render() {
    const { isLoading } = this.state;

    return (
      <div className="app-container">
        {isLoading ? this.renderLoader() : this.renderCryptocurrenciesList()}
      </div>
    );
  }
}

export default CryptocurrencyTracker;
