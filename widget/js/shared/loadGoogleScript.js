var isMapReady = false;
function setMapReady(){
    isMapReady = true;
}

buildfire.getContext((error, context) => {

function setGoogleMapsScript(key) {
    const docHead = document.getElementsByTagName('head');
    let scriptEl = document.createElement('script');
    scriptEl.id = "googleScript";
    scriptEl.src = "https://maps.googleapis.com/maps/api/js?key=" + key + "&callback=setMapReady";
    docHead[0].appendChild(scriptEl);
};

setGoogleMapsScript(context.apiKeys.googleMapKey);
});