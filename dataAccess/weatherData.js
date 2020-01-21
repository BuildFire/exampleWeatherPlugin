class WeatherData {
    static TAG = 'weather-data';

    /**
       * Returns all weather data
       * @param {Function} callback callback for handling response
       */
    static getAll = (options, callback) => {
        buildfire.publicData.search(options, WeatherData.TAG, (err, record) => {
            if (err) return callback(err);
            const records = record.map(data => new WeatherInfo(data));
            return callback(records);
        });
    };
  
    /**
    * Gets weather data
    * @param {Function} callback callback for handling response
    */
    static get = (callback) => {
      buildfire.publicData.get(WeatherData.TAG, (error, record) => {
        if (error) return callback(error);

        return callback(null, new WeatherInfo(record.data));
      });
    };

    /**
       * Returns weather data with given id
       * @param {String} id id of member to be retrieved
       * @param {Function} callback callback for handling response
       */
    static getById = (id, callback) => {
        buildfire.publicData.getById(id, WeatherData.TAG, (err, record) => {
            if (err) return callback(err);

            return callback(null, new WeatherInfo(record));
        });
    };

    /**
       * Adds a weather data
       * @param {Object} data data of weather API response to be added
       * @param {Function} callback callback for handling response
       */
    static add = (data, callback) => {
        buildfire.publicData.insert(data, WeatherData.TAG, (error, record) => {
          if (error) return callback(error);
      
          return callback(null, new WeatherInfo(record));
        });
    };

    /**
       * Updates a weather data 
       * @param {Object} data data of weather API response to be updated
       * @param {Function} callback callback for handling response
       */
      static set = (data, callback) => {
        buildfire.publicData.save(data, WeatherData.TAG, (error, record) => {
            if (error) return callback(error);

            return callback(null, new WeatherInfo(record));
          });
    };

    /**
       * Archives a weather data
       * @param {Object} data data of member to be deleted
       * @param {Function} callback callback for handling response
       */
    static delete = (data, callback) => {
        data.deletedOn = new Date();
        data.isActive = false;
        buildfire.publicData.update(data.id, data, WeatherData.TAG, (error, record) => {
            if (error) return callback(error);
        
            return callback(null, new WeatherInfo(record));
          });
    };
}