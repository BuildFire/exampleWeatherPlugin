class WeatherData {
    static TAG = 'weather-data';

    /**
       * Returns weather data
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
       * Returns weather data with given id
       * @param {String} id id of member to be retrieved
       * @param {Function} callback callback for handling response
       */
    static getById = (id, callback) => {
        buildfire.datastore.getById(id, WeatherData.TAG, (err, record) => {
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
        data.createdBy = authManager.currentUser.email;
        data.createdOn = new Date();
        data._buildfire.index = WeatherInfo.buildIndex(data);
  
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
        data.lastUpdatedOn = new Date();
        data.lastUpdatedBy = authManager.currentUser.email;
        buildfire.publicData.update(data.id, data, WeatherData.TAG, (error, record) => {
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
        data.deletedBy = authManager.currentUser.email;
        data.deletedOn = new Date();
        data.isActive = false;
        buildfire.publicData.update(data.id, data, WeatherData.TAG, (error, record) => {
            if (error) return callback(error);
        
            return callback(null, new WeatherInfo(record));
          });
    };
     /**
       * Builds index
       * @param {Object} data data for which index will be built
       */
      static buildIndex = data => {
        /**
         * Example index 
         * const index = {
           text: data.firstName + ' ' + data.lastName + ' ' + data.email,
           string1: data.email
          };
         */
         const index = {};
         return index;
       }
}