class Setting {
    constructor(data = {}) {
        this.isActive = data.isActive || true;
        this.createdOn = data.createdOn || new Date();
        this.createdBy = data.createdBy || null;
        this.lastUpdatedOn = data.lastUpdatedOn || null;
        this.lastUpdatedBy = data.lastUpdatedBy || null;
        this.deletedOn = data.deletedOn || null;
        this.deletedBy = data.deletedBy || null;
        this.useCustomColor = data.useCustomColor || null;
        this.Color = data.Color || null;
        this.apiKey = data.apiKey || null;
        this.tempUnit = data.tempUnit || null;
        this.useUserCurrentLocation = data.useUserCurrentLocation || null;
        this.place = data.place || {
            title: null,
            address: {
                lat: null,
                lng: null
            }
        }
    }
}