import {Component} from 'react';

class Weather extends Component<{},{location:any,weatherResult:any}> {

    constructor(props:any) {
        super(props)
        this.state = {
            location: [0,0],
            weatherResult: {name:'name',weather:[{icon:'icon'}],main:{temp:0},}
        }
    };
        
    
    getLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getPosition);
        }
    };
    getPosition = (position:any) => {
        this.setState({location:[position.coords.latitude, position.coords.longitude]});
        this.fetchWeatherFahrenheit()
    }
    
    async fetchWeatherFahrenheit()  {
            let lat:number = this.state.location[0];
            let lon:number = this.state.location[1];
            let url:string = 'https://api.openweathermap.org/data/2.5';
            let key:string = 'f19f2d47c690f58f576572b71182a24e';
            await fetch(`${url}/weather/?lat=${lat}&lon=${lon}&units=imperial&APPID=${key}`)
            .then(res => res.json())
            .then(weatherResults => {
                this.setState({weatherResult:weatherResults})
            });
        }

        componentWillMount(){
            this.getLocation();
        }

    render() {
        return (
            <div>
                {(typeof this.state.weatherResult.main != 'undefined') ? (
                <div className="Weather">
                    <div  id="weatherDiv">
                    <div className="city">{this.state.weatherResult.name}</div>
                    <img className="weatherImg" src={`https://openweathermap.org/img/wn/${this.state.weatherResult.weather[0].icon}@2x.png`} />
                    <div>{this.state.weatherResult.weather[0].description}</div>
                    <br />
                    <div>Temp: {Math.round(this.state.weatherResult.main.temp)+"°F"}</div>
                    </div>
                </div>
                ): (
                <div> </div>
                )}
            </div>
        );
    }
}

export default Weather;