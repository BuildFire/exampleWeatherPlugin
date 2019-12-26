class Sections {
    static TAG = 'sections'


    /**
       * Returns sections
       * @param {Function} callback callback for handling response
       */
      static getById = (id, callback) => {
        buildfire.publicData.search({isActive: false}, Sections.TAG, (error, record) => {
          if (error) return callback(error);
          const records = record.map(data => new Section(data))
          return callback(null, records);
        });
      };
  
    /**
       * Returns section with given id
       * @param {String} id id of member to be retrieved
       * @param {Function} callback callback for handling response
       */
    static getById = (id, callback) => {
      buildfire.publicData.getById(id, Sections.TAG, (error, record) => {
        if (error) return callback(error);
  
        return callback(null, new Section(record));
      });
    };

    /**
       * Adds a sections
       * @param {Object} data data of section to be added
       * @param {Function} callback callback for handling response
       */
    static add = (data, callback) => {
      data.createdBy = authManager.currentUser.email;
      data.createdOn = new Date();
      data._buildfire.index = Sections.buildIndex(data);
  
      buildfire.publicData.insert(data, Sections.TAG, (error, record) => {
        if (error) return callback(error);
    
        return callback(null, new Section(record));
      });
    };
  
    /**
       * Updates a section 
       * @param {Object} data data of section to be updated
       * @param {Function} callback callback for handling response
       */
    static set = (data, callback) => {
      data.lastUpdatedBy = authManager.currentUser.email;
      data.lastUpdatedOn = new Date();
      data._buildfire.index = Sections.buildIndex(data);
  
      buildfire.publicData.update(data.id, data, Sections.TAG, (error, record) => {
        if (error) return callback(error);
  
  
        return callback(null, new Section(record));
      });
    };
  
    /**
       * Archives a section
       * @param {Object} data data of member to be deleted
       * @param {Function} callback callback for handling response
       */
    static delete = (data, callback) => {
      data.deletedBy = authManager.currentUser.email;
      data.deletedOn = new Date();
      data.isActive = false;
  
      buildfire.publicData.update(data.id, data, Section.TAG, (error, record) => {
        if (error) return callback(error);
    
        return callback(null, new Section(record));
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