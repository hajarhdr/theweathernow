import suncloud from "./suncloud.svg";
import react from "react";
import Clock from "./Clock";
import "./App.css";
class App extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      geo: "",
      weather: "",
      inputValue: "",
      ErrorText: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const geojsResponse = await fetch("https://get.geojs.io/v1/ip/geo.json");
    const geo = await geojsResponse.json();

    const openweathermapResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${geo.latitude}&lon=${geo.longitude}&appid=c581d95c31d0beaed8402c1fbde66546&units=metric`
    );
    const weather = await openweathermapResponse.json();
    if (weather.weather) {
      this.setState({
        geo: geo,
        weather: weather,
        ErrorText: ""
      });
    }
    else {
      this.setState({
        ErrorText : "Invalid location, please try again"
      })
    }

    setTimeout(
      () =>
        this.setState({
          loading: false,
        }),
      2000
    );
  }

  async handleSubmit(event) {
    event.preventDefault();
    const openweathermapResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.inputValue}&appid=c581d95c31d0beaed8402c1fbde66546&units=metric`
    );
    const weather = await openweathermapResponse.json();
    if (weather.weather) {
      this.setState({
        weather: weather,
        ErrorText: ""
      });
    }
    else {
      this.setState({
        ErrorText : "Invalid location, please try again"
      })
    }

    setTimeout(
      () =>
        this.setState({
          loading: false,
        }),
      2000
    );
  }

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  render() {
    return this.state.loading ? (
      <div className="flex flex-row justify-center py-96 h-screen bg-orange-300">
        <img src="/sun-icon.png" alt="" className="animate-bounce h-4/5" />
      </div>
    ) : (
      <div className={`bg-${this.state.weather.weather[0].icon}`}>
        <div className="p-4 min-h-screen flex flex-col fade-in container mx-auto relative">
          <div className="flex justify-between md:flex-row flex-col">
            <div className="max-w-sm">
              <img className="w-1/4" src={suncloud} alt="logo" />
            </div>
            <div className="justify-self-center ">
              <div className="sidebar">
                <form
                  onSubmit={this.handleSubmit}
                  className=" pl-2 border-4 rounded-full border-whit bg-white hover:border-stone-900 drop-shadow-2xl"
                >
                  <input
                    className="outline-none rounded-full h-8"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Another Location..."
                  />
                  
                  <button
                    className="icon-search"
                    type="submit"
                    disabled={!this.state.inputValue}
                  >
                    <i className="fa fa-search pr-4"></i>
                  </button>
                </form>
                {this.state.ErrorText !== '' && 
                <div class="flex items-center text-dark text-sm font-bold px-2 py-3" role="alert">
                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                <p>Please enter a valid city name</p>
              </div>
                }
                <div className="absolute inset-x-0 bottom-0 text-xl mb-8 border-2 rounded-full bg-white drop-shadow-2xl w-32 text-center ml-4">
                  <Clock />
                </div>{" "}
              </div>
            </div>
          </div>
          <div className="m-auto flex flex-col grow justify-center z-10">
            <h1 className="text-9xl">{this.state.weather.main.temp} °C</h1>
            <h3 className="text-3xl pt-6">
              {this.state.weather.weather[0].description}.
            </h3>
            <h2 className="text-6xl leading-relaxed ">
              {this.state.weather.name}-{this.state.weather.sys.country}
            </h2>
          </div>
          <div>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/hajarhdr/pfe2022"
              className="m-auto flex grow justify-center text-2xl"
            >
              <img className="h-20" src="/github-icon.png" alt="" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
