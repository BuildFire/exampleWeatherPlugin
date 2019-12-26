class Section {
    constructor(data = {}) {
      // DONT DELETE THESE DATA OBJECTS 
      this.isActive = data.isActive || true; 
      this.createdOn = data.createdOn || new Date(); 
      this.createdBy = data.createdBy || null; 
      this.lastUpdatedOn = data.lastUpdatedOn || null; 
      this.lastUpdatedBy = data.lastUpdatedBy || null; 
      this.deletedOn = data.deletedOn || null; 
      this.deletedBy = data.deletedBy || null; 
      
      //ADD NEW ONES BELOW
    }
  }
  