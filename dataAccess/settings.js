export default class Settings {
    static TAG = 'settings';

    /**
       * Returns settings
       * @param {Function} callback callback for handling response
       */
    static getAll = (id, callback) => {
        buildfire.datastore.getById(id, Settings.TAG, (err, record) => {
            if (err) return callback(err);
            const records = record.map(data => new Setting(data));
            return callback(records);
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
        data._buildfire.index = Setting.buildIndex(data);
  
        buildfire.datastore.insert(data, Setting.TAG, (error, record) => {
          if (error) return callback(error);
      
          return callback(null, new Setting(record));
        });
    };

    /**
       * Updates a settings 
       * @param {Object} data data of setting to be updated
       * @param {Function} callback callback for handling response
       */
    static set = (data, callback) => {
        data.lastUpdatedOn = new Date();
        data.lastUpdatedBy = authManager.currentUser.email;
        buildfire.datastore.update(data.id, data, Setting.TAG, (error, record) => {
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
        buildfire.datastore.update(data.id, data, Setting.TAG, (error, record) => {
            if (error) return callback(error);
        
            return callback(null, new Setting(record));
          });
    };
}