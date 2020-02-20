class WeatherInfo {
    constructor(data = {}) {
        this.isActive = data.isActive || true;
        this.createdOn = data.createdOn || null;
        this.createdBy = data.createdBy || null;
        this.lastUpdatedOn = data.lastUpdatedOn || null;
        this.lastUpdatedBy = data.lastUpdatedBy || null;
        this.deletedOn = data.deletedOn || null;
        this.deletedBy = data.deletedBy || null;
        this.useCustomColor = data.useCustomColor || null;
        this.Color = data.Color || null;
        this.latestUpdate = data.latestUpdate || new Date();
        this.id = data.id || null;
        this.clouds = data.clouds || {
            all: null
        };
        this.coord = data.coord || {
            lat: null,
            lng: null
        };
        this.main = data.main || {
            temp: null,
            feels_like: null,
            humidity: null,
            pressure: null,
            temp_max: null,
            temp_min: null
        }
        this.name = data.name || null;
        this.rain = data.rain || null;
        this.snow = data.snow || null;
        this.sys = data.sys || {
            country: null
        };
        this.weather = data.weather || {
            description: null,
            icon: null,
            id: null,
            main: null
        };
        this.wind = data.wind || {
            speed: null,
            deg: null
        };
    }
}