import suncloud from "./suncloud.svg";
import react from "react";
import Clock from "./Clock";
import "./App.css";
// testing develop branch
class App extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      geo: "",
      weather: "",
      inputValue: "",
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
      });
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
      });
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
                  <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                  ></link>
                  <button
                    className="icon-search"
                    type="submit"
                    disabled={!this.state.inputValue}
                  >
                    <i className="fa fa-search pr-4"></i>
                  </button>
                </form>
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
