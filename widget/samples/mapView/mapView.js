function initMap() {
    console.log("initMap",isMapReady)
    //Make sure map is loaded
    if (!isMapReady){
        setTimeout(() => {
            initMap()
        }, 1000);
        return;
    }

    let googleMap = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      gestureHandling: 'greedy',
    });
    const mapOptions = {
      trackUser: {
        extendClassName: "locate-me-extend",
        show: true,
      },
      showFilter: {
        show: true,
      },
      showListView: {
        show: true,
        extendClassName: "switch-block-extend"
      },
      customButton1: {
        show: true,
      },
      customButton2: {
        show: true,
      },
      listOptions: {
        extendClassName: "map-plotter__list-extend"
      },
      listItemOptions: {
        extendClassName: "list-item__holder-extend"
      },
      quickPreviewItem: {
        extendClassName: "quick-preview__item-extend"
      },
      // filterOptions: {
      //   filter: {
      //     "$and": [
      //       { "$json.title": "Parlament" }
      //     ]
      //   },
      //   "page": 0,
      //   "pageSize": 50,
      //   recordCount: true
      // }
    }
    let mapPlotter = new buildfire.components.mapPlotter(document.getElementById("map"), googleMap, "people", mapOptions);
    // mapPlotter.setFilterOptions({
    //   filter: {
    //     "$and": [
    //       { "$json.title": "Parlament" }
    //     ]
    //   },
    //   "page": 0,
    //   "pageSize": 50,
    //   recordCount: true
    // })
    mapPlotter.onPinClick = function (i1, i2, i3) {
      console.log("OnPinClick", i1, i2, i3);
    }
    mapPlotter.onPinCreated = function (i1, i2) {
      console.log("OnPinCreated", i1, i2);
      i1.icon.fillColor = "blue";
    }
    mapPlotter.onFilterClick = function () {
      console.log("onFilterClick");
    }
    mapPlotter.onShowListClick = function (i1, i2) {
      console.log("onShowListClick", i1, i2);
    }
    mapPlotter.onCustom1Click = function (i1, i2) {
      console.log("onCustom1Click", i1, i2);
    }
    mapPlotter.onCustom2Click = function (i1, i2) {
      console.log("onCustom2Click", i1, i2);
    }
  }


  initMap();
  