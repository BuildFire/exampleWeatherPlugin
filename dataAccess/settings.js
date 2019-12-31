class Settings {
    static TAG = 'settings';

    /**
       * Returns settings
       * @param {Function} callback callback for handling response
       */
    static getAll = (options, callback) => {
        buildfire.datastore.search(options, Settings.TAG, (err, record) => {
            if (err) return callback(err);
            const records = record.map(data => new Setting(data));
            return callback(records);
        });
    };

    /**
   * Gets all barcodes
   * @param {Function} callback callback for handling response
   */
  static get = (callback) => {
    buildfire.datastore.get(Settings.TAG, (error, record) => {
      if (error) return callback(error);

      if (!record.data.place) {
        const cmd = {
          place: {title: "", address: {lat: null, lng: null}},
          createdOn: new Date(),
          createdBy: authManager.currentUser.email
        };

        buildfire.datastore.save(cmd, Settings.TAG, (error, record) => {
          if (error) return callback(error);

          return callback(null, new Setting(record.data));
        });
      }
      
      return callback(null, new Setting(record.data));
    });
  };

    /**
       * Returns settings with given id
       * @param {String} id id of member to be retrieved
       * @param {Function} callback callback for handling response
       */
    static getById = (id, callback) => {
        buildfire.datastore.getById(id, Settings.TAG, (err, record) => {
            if (err) return callback(err);

            return callback(null, new Setting(record));
        });
    };

    /**
       * Adds a settings
       * @param {Object} data data of section to be added
       * @param {Function} callback callback for handling response
       */
    static add = (data, callback) => {
        data.createdBy = authManager.currentUser.email;
        data.createdOn = new Date();
  
        buildfire.datastore.insert(data, Settings.TAG, (error, record) => {
          if (error) return callback(error);
            
          buildfire.analytics.trackAction('location selected', { _buildfire: {  } });
          return callback(null, new Setting(record));
        });
    };

    /**
       * Updates a settings 
       * @param {Object} data data of setting to be updated
       * @param {Function} callback callback for handling response
       */
    static set = (data, callback) => {
        const cmd = {
            $set: {
              place: data.place,
              lastUpdatedOn: new Date(),
              lastUpdatedBy: authManager.currentUser.email
            }
        };
        buildfire.datastore.save(cmd, Settings.TAG, (error, record) => {
            if (error) return callback(error);

            return callback(null, new Setting(record));
          });
    };

    /**
       * Archives a settings
       * @param {Object} data data of member to be deleted
       * @param {Function} callback callback for handling response
       */
    static delete = (data, callback) => {
        data.deletedBy = authManager.currentUser.email;
        data.deletedOn = new Date();
        data.isActive = false;
        buildfire.datastore.update(data.id, data, Settings.TAG, (error, record) => {
            if (error) return callback(error);
        
            return callback(null, new Setting(record));
          });
    };
}