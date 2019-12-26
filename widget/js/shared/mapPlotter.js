"use strict";

if (typeof buildfire == "undefined") throw "please add buildfire.js first to use mapPlotter component";

if (typeof buildfire.components == "undefined") buildfire.components = {};

if (typeof buildfire.components.mapPlotter == "undefined") buildfire.components.mapPlotter = {};

//This block will execute immediately to make sure all depnedices are red 
(function () {
    var scripts = document.getElementsByTagName("script");
    var googleScriptSrc = null;

    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src && scripts[i].src.toLowerCase().indexOf("maps.googleapis.com/maps/api") > -1) {
            googleScriptSrc = scripts[i].src;
        }
        // if (scripts[i].src && scripts[i].src.toLowerCase().indexOf("markerclusterer.js") > -1) {
        //     clustererScriptSrc = scripts[i].src;
        // }
    }

    document.write(
        `<style type="text/css">
        .quick-preview__item {
            position: absolute;bottom: 25px;right: 15px;left: 15px;height: 60px; background: white;
        }
        .switch-block {
            position:absolute; top: 15px; right: 15px;
        }
        .locate-me {
          line-height: 11px; 
          position: absolute;
          bottom: 25px;
          border-radius: 50px;
          width: 35px;
          height: 35px;
          padding: 0;
          left: 25px;
        }
        .locate-me svg {
          width: 25px; 
        }
    </style>`
    );
})();

//Basic methods that helps with dom element management
var domElement = function (tagName, attrs, content) {
    this.el = document.createElement(tagName);

    if (typeof content != "undefined") {
        this.el.innerHTML = content;
    }

    if (typeof attrs != "undefined") {
        for (var k in attrs) {
            this.el.setAttribute(k, attrs[k]);
        }
    }

    this.show = function () {
        this.el.style.display = "block";
    };
    this.hide = function () {
        this.el.style.display = "none";
    };

    this.active = function () {
        this.el.classList.add("active");
    };
    this.inactive = function () {
        this.el.classList.remove("active");
    };
};

//Default image resources
var pin_svg_path =
    "M11.513,12.38c-2.117,0-3.835-1.729-3.835-3.862c0-2.135,1.718-3.863,3.835-3.863s3.835,1.729,3.835,3.863  C15.348,10.65,13.63,12.38,11.513,12.38 M11.513,0C6.825,0,3.025,3.827,3.025,8.549c0,4.46,3.844,10.213,6.411,13.014  c0.959,1.045,2.076,2.454,2.076,2.454s1.2-1.417,2.229-2.493C16.306,18.84,20,13.451,20,8.549C20,3.827,16.2,0,11.513,0";
var list_svg_img = `<?xml version="1.0" encoding="UTF-8"?>
                <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: sketchtool 53.1 (72631) - https://sketchapp.com -->
                    <title>2A8FDFDF-E277-4153-9A99-44AA327EDFAA</title>
                    <desc>Created with sketchtool.</desc>
                    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="List/Filter-Bar" transform="translate(-82.000000, -15.000000)" fill="#FFFFFF">
                            <path d="M88.0267857,18.8839286 C87.7589272,19.1517871 87.4166687,19.2857143 87,19.2857143 C86.5833313,19.2857143 86.2410728,19.1517871 85.9732143,18.8839286 C85.7053558,18.6160701 85.5714286,18.2738116 85.5714286,17.8571429 L85.5714286,16.4285714 C85.5714286,16.0119027 85.7053558,15.6696442 85.9732143,15.4017857 C86.2410728,15.1339272 86.5833313,15 87,15 C87.4166687,15 87.7589272,15.1339272 88.0267857,15.4017857 C88.2946442,15.6696442 88.4285714,16.0119027 88.4285714,16.4285714 L88.4285714,17.8571429 C88.4285714,18.2738116 88.2946442,18.6160701 88.0267857,18.8839286 Z M98.0267857,18.8839286 C97.7589272,19.1517871 97.4166687,19.2857143 97,19.2857143 C96.5833313,19.2857143 96.2410728,19.1517871 95.9732143,18.8839286 C95.7053558,18.6160701 95.5714286,18.2738116 95.5714286,17.8571429 L95.5714286,16.4285714 C95.5714286,16.0119027 95.7053558,15.6696442 95.9732143,15.4017857 C96.2410728,15.1339272 96.5833313,15 97,15 C97.4166687,15 97.7589272,15.1339272 98.0267857,15.4017857 C98.2946442,15.6696442 98.4285714,16.0119027 98.4285714,16.4285714 L98.4285714,17.8571429 C98.4285714,18.2738116 98.2946442,18.6160701 98.0267857,18.8839286 Z M101.642857,16.4285714 C101.880954,16.4285714 102,16.5476179 102,16.7857143 L102,34.6428571 C102,34.8809536 101.880954,35 101.642857,35 L82.3571429,35 C82.1190464,35 82,34.8809536 82,34.6428571 L82,16.7857143 C82,16.5476179 82.1190464,16.4285714 82.3571429,16.4285714 L84.8571429,16.4285714 L84.8571429,18.2589286 C84.8571429,18.7351214 85.0729145,19.1443435 85.5044643,19.4866071 C85.9360141,19.8288708 86.434521,20 87,20 C87.565479,20 88.0639859,19.8288708 88.4955357,19.4866071 C88.9270855,19.1443435 89.1428571,18.7351214 89.1428571,18.2589286 L89.1428571,16.4285714 L94.8571429,16.4285714 L94.8571429,18.2589286 C94.8571429,18.7351214 95.0803549,19.1443435 95.5267857,19.4866071 C95.9732165,19.8288708 96.4791638,20 97.0446429,20 C97.5803598,20 98.0639859,19.8288708 98.4955357,19.4866071 C98.9270855,19.1443435 99.1428571,18.7351214 99.1428571,18.2589286 L99.1428571,16.4285714 L101.642857,16.4285714 Z M99.8571429,32.8571429 L99.8571429,21.4285714 L84.1428571,21.4285714 L84.1428571,32.8571429 L99.8571429,32.8571429 Z" id="calendar-"></path>
                        </g>
                    </g>
                </svg>`;
var map_svg_img = `<?xml version="1.0" encoding="UTF-8"?>
                    <svg width="22px" height="19px" viewBox="0 0 22 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <!-- Generator: sketchtool 53.1 (72631) - https://sketchapp.com -->
                        <title>9189CD25-C7AF-4136-A3D1-8B4AD348065D</title>
                        <desc>Created with sketchtool.</desc>
                        <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="List/Filter-Bar" transform="translate(-22.000000, -16.000000)" fill="#FFFFFF">
                                <path d="M43.65625,19.5848219 C43.8854178,19.7485132 44,19.9776776 44,20.2723219 L44,34.0714291 C44,34.3988117 43.8854178,34.627976 43.65625,34.7589291 C43.525297,34.8244056 43.4107148,34.8571433 43.3125,34.8571433 C43.1160704,34.8571433 42.9851194,34.8244056 42.9196429,34.7589291 L38.15625,31.5178576 L33.3928571,34.7589291 C33.1309511,34.8898821 32.8854178,34.8898821 32.65625,34.7589291 L27.8928571,31.5178576 L23.1294643,34.7589291 C22.9002965,34.8898821 22.6547632,34.8898821 22.3928571,34.7589291 C22.1309511,34.5952378 22,34.3660734 22,34.0714291 L22,20.2723219 C22,19.9776776 22.1145822,19.7485132 22.34375,19.5848219 L27.5,16.0982148 C27.7619061,15.9672617 28.0074393,15.9672617 28.2366071,16.0982148 L33,19.3392862 L37.8125,16.0982148 C38.0744061,15.9672617 38.3199393,15.9672617 38.5491071,16.0982148 L43.65625,19.5848219 Z M27.0580357,30.1919648 L27.0580357,18.3080362 L23.5714286,20.7633933 L23.5714286,32.6473219 L27.0580357,30.1919648 Z M28.6294643,30.1919648 L32.2142857,32.5982148 L32.2142857,26.2633933 L32.0178571,26.8035719 C31.8541658,26.7708337 31.5267882,26.6071448 31.0357143,26.3125005 L31.4285714,25.6741076 C31.6904775,25.8377989 31.9523796,25.96875 32.2142857,26.0669648 L32.2142857,20.7142862 L28.6294643,18.3080362 L28.6294643,23.2678576 C28.9895851,23.4642872 29.2023806,23.5788694 29.2678571,23.6116076 L28.7767857,24.2500005 L28.7276786,24.2008933 C28.6949403,24.1681551 28.6622025,24.1517862 28.6294643,24.1517862 L28.6294643,30.1919648 Z M33.7857143,32.5982148 L37.3705357,30.1919648 L37.3705357,24.8392862 L37.3214286,24.8883933 L37.3214286,24.9375005 L37.0267857,25.2321433 L36.4375,24.6919648 L36.7321429,24.3973219 C36.7976194,24.3645837 36.8630949,24.2909237 36.9285714,24.1763398 C36.9940479,24.0617559 37.0595235,23.971727 37.125,23.9062505 L37.3705357,24.1517862 L37.3705357,18.3080362 L33.7857143,20.7142862 L33.7857143,26.2142862 L34.1294643,26.2142862 L34.2767857,26.9508933 C34.2113092,26.9508933 34.1294648,26.9590778 34.03125,26.9754469 C33.9330352,26.991816 33.8675597,27.0000005 33.8348214,27.0000005 L33.7857143,27.0000005 L33.7857143,32.5982148 Z M42.4285714,32.5982148 L42.4285714,20.7142862 L38.9419643,18.3080362 L38.9419643,22.6294648 C39.0074408,22.5967265 39.0811008,22.5803576 39.1629464,22.5803576 C39.2447921,22.5803576 39.3020832,22.5639888 39.3348214,22.5312505 L39.53125,23.3169648 L39.2857143,23.3660719 C39.122023,23.3988102 39.0074408,23.4315479 38.9419643,23.4642862 L38.9419643,30.1919648 L42.4285714,32.5982148 Z M26.7633929,23.7098219 C26.534225,23.7752984 26.3050607,23.8898806 26.0758929,24.0535719 L25.5357143,23.4642862 C25.7976204,23.2678567 25.994047,23.1369056 26.125,23.0714291 C26.2232148,23.0059525 26.3705347,22.940477 26.5669643,22.8750005 L26.8125,23.6116076 C26.7797617,23.6443459 26.7715773,23.6607148 26.7879464,23.6607148 C26.8043156,23.6607148 26.7961311,23.6770837 26.7633929,23.7098219 Z M35.0133929,25.9196433 C35.4389902,25.6577373 35.6845235,25.4940484 35.75,25.4285719 L36.2901786,26.0178576 C36.0282725,26.2797637 35.7172637,26.4925592 35.3571429,26.6562505 L35.0133929,25.9196433 Z M25.2901786,25.4285719 L25.2901786,25.4776791 L24.5535714,25.2321433 L24.5535714,25.1830362 C24.6845245,24.7901771 24.8318444,24.4627994 24.9955357,24.2008933 L25.6339286,24.6428576 C25.5357138,24.7738107 25.4211316,25.0357128 25.2901786,25.4285719 Z M30.1517857,24.5446433 C30.315477,24.7410729 30.4955347,24.9211306 30.6919643,25.0848219 L30.1517857,25.6741076 C30.0863092,25.6086311 29.9880959,25.5022334 29.8571429,25.3549112 C29.7261898,25.207589 29.6279765,25.1011913 29.5625,25.0357148 L29.4151786,24.8883933 L30.0044643,24.3482148 C30.0372025,24.380953 30.0863092,24.4464286 30.1517857,24.5446433 Z M40.4642857,24.1517862 L39.9241071,23.5625005 L40.4151786,23.0714291 L39.9241071,22.5803576 L40.4642857,21.9910719 L40.9553571,22.5312505 L41.4955357,21.9910719 L42.0357143,22.5803576 L41.5446429,23.0714291 L42.0357143,23.5625005 L41.4955357,24.1517862 L40.9553571,23.6116076 L40.4642857,24.1517862 Z" id="map"></path>
                            </g>
                        </g>
                    </svg>`;
var user_svg_pin = `<?xml version="1.0" encoding="UTF-8"?>
                    <svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <!-- Generator: sketchtool 53.1 (72631) - https://sketchapp.com -->
                        <title>AB9CD5AC-2C44-49E9-A211-BB6F64BBFB69</title>
                        <desc>Created with sketchtool.</desc>
                        <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="GPS" transform="translate(-12.000000, -13.000000)" fill="#FFFFFF">
                                <g id="GPS_Icon">
                                    <g transform="translate(12.000000, 13.000000)">
                                        <path d="M15,24.5098039 C16.7429281,24.5098039 18.3442193,24.0849716 19.8039216,23.2352941 C21.2418373,22.3856167 22.3856167,21.2418373 23.2352941,19.8039216 C24.0849716,18.3442193 24.5098039,16.7429281 24.5098039,15 C24.5098039,13.2570719 24.0849716,11.6557807 23.2352941,10.1960784 C22.3856167,8.75816275 21.2418373,7.61438333 19.8039216,6.76470588 C18.3442193,5.91502843 16.7429281,5.49019608 15,5.49019608 C13.2570719,5.49019608 11.6557807,5.91502843 10.1960784,6.76470588 C8.75816275,7.61438333 7.61438333,8.75816275 6.76470588,10.1960784 C5.91502843,11.6557807 5.49019608,13.2570719 5.49019608,15 C5.49019608,16.7429281 5.91502843,18.3442193 6.76470588,19.8039216 C7.61438333,21.2418373 8.75816275,22.3856167 10.1960784,23.2352941 C11.6557807,24.0849716 13.2570719,24.5098039 15,24.5098039 Z M27.1895425,13.6601307 L30,13.6601307 L30,16.3398693 L27.1895425,16.3398693 C26.9934631,18.213517 26.3943405,19.9400792 25.3921569,21.5196078 C24.3899732,23.0991364 23.0991364,24.3899732 21.5196078,25.3921569 C19.9400792,26.3943405 18.213517,26.9934631 16.3398693,27.1895425 L16.3398693,30 L13.6601307,30 L13.6601307,27.1895425 C11.786483,26.9934631 10.0653673,26.3943405 8.49673203,25.3921569 C6.92809673,24.3899732 5.64270654,23.0991364 4.64052288,21.5196078 C3.63833922,19.9400792 3.02832353,18.213517 2.81045752,16.3398693 L0,16.3398693 L0,13.6601307 L2.81045752,13.6601307 C3.02832353,11.786483 3.63833922,10.0599208 4.64052288,8.48039216 C5.64270654,6.90086356 6.92809673,5.6100268 8.49673203,4.60784314 C10.0653673,3.60565948 11.786483,3.00653693 13.6601307,2.81045752 L13.6601307,0 L16.3398693,0 L16.3398693,2.81045752 C18.213517,3.00653693 19.9400792,3.60565948 21.5196078,4.60784314 C23.0991364,5.6100268 24.3899732,6.90086356 25.3921569,8.48039216 C26.3943405,10.0599208 26.9934631,11.786483 27.1895425,13.6601307 Z"></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>`;

var user_map_pin = `<?xml version="1.0" encoding="UTF-8"?>
                    <svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <!-- Generator: sketchtool 53.1 (72631) - https://sketchapp.com -->
                        <title>AB9CD5AC-2C44-49E9-A211-BB6F64BBFB69</title>
                        <desc>Created with sketchtool.</desc>
                        <g id="Symbols" stroke="none" stroke-width="1" fill="red" fill-rule="evenodd">
                            <g id="GPS" transform="translate(-12.000000, -13.000000)" fill="red">
                                <g id="GPS_Icon">
                                    <g transform="translate(12.000000, 13.000000)">
                                        <path d="M15,24.5098039 C16.7429281,24.5098039 18.3442193,24.0849716 19.8039216,23.2352941 C21.2418373,22.3856167 22.3856167,21.2418373 23.2352941,19.8039216 C24.0849716,18.3442193 24.5098039,16.7429281 24.5098039,15 C24.5098039,13.2570719 24.0849716,11.6557807 23.2352941,10.1960784 C22.3856167,8.75816275 21.2418373,7.61438333 19.8039216,6.76470588 C18.3442193,5.91502843 16.7429281,5.49019608 15,5.49019608 C13.2570719,5.49019608 11.6557807,5.91502843 10.1960784,6.76470588 C8.75816275,7.61438333 7.61438333,8.75816275 6.76470588,10.1960784 C5.91502843,11.6557807 5.49019608,13.2570719 5.49019608,15 C5.49019608,16.7429281 5.91502843,18.3442193 6.76470588,19.8039216 C7.61438333,21.2418373 8.75816275,22.3856167 10.1960784,23.2352941 C11.6557807,24.0849716 13.2570719,24.5098039 15,24.5098039 Z M27.1895425,13.6601307 L30,13.6601307 L30,16.3398693 L27.1895425,16.3398693 C26.9934631,18.213517 26.3943405,19.9400792 25.3921569,21.5196078 C24.3899732,23.0991364 23.0991364,24.3899732 21.5196078,25.3921569 C19.9400792,26.3943405 18.213517,26.9934631 16.3398693,27.1895425 L16.3398693,30 L13.6601307,30 L13.6601307,27.1895425 C11.786483,26.9934631 10.0653673,26.3943405 8.49673203,25.3921569 C6.92809673,24.3899732 5.64270654,23.0991364 4.64052288,21.5196078 C3.63833922,19.9400792 3.02832353,18.213517 2.81045752,16.3398693 L0,16.3398693 L0,13.6601307 L2.81045752,13.6601307 C3.02832353,11.786483 3.63833922,10.0599208 4.64052288,8.48039216 C5.64270654,6.90086356 6.92809673,5.6100268 8.49673203,4.60784314 C10.0653673,3.60565948 11.786483,3.00653693 13.6601307,2.81045752 L13.6601307,0 L16.3398693,0 L16.3398693,2.81045752 C18.213517,3.00653693 19.9400792,3.60565948 21.5196078,4.60784314 C23.0991364,5.6100268 24.3899732,6.90086356 25.3921569,8.48039216 C26.3943405,10.0599208 26.9934631,11.786483 27.1895425,13.6601307 Z"></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>`;

// Component constructor
buildfire.components.mapPlotter = function (selector, googleMap, publicDataTag, options) {
    this._options = {};
    this.ignoreOtherBuffers = 0;

    if (typeof google == "undefined") throw "please add GoogleMaps first to use mapPloter components";

    // if (typeof MarkerClusterer == "undefined") throw "please add MarkerClusterer first to use mapPloter components";

    this.setCoreOptions();

    this.userCoordinates = googleMap.getCenter();

    this.itemsData = [];

    this.ids = [];

    this.listItems = [];

    this.mapMarkers = [];

    if (options.filterOptions) {
        this.filterOptions = options.filterOptions;
    }

    if (options && Object.keys(options).length) {
        for (var k in options) {
            if (this._options[k]) {
                this._options[k] = this.mergeOptions(this._options[k], options[k]);
            }
        }
    }

    this.selector = selector;

    var _mapBoxBoundingRects = this.selector.getBoundingClientRect();
    this.mapPlotterEl = new domElement("div", {
        class: "map-plotter",
        style:
            `
            width: ` +
            _mapBoxBoundingRects.width +
            `px;
            height:` +
            _mapBoxBoundingRects.height +
            `px;
            position:relative;`
    });


    this.mapInstance = googleMap;
    this.mapInitialCenter = googleMap.getCenter();
    this.mapInitialZoom = googleMap.getZoom();
    this.publicDataTag = publicDataTag;

    this.selectedMarker = null;

    this.clusterClickHandler = null;

    this.boundsChangedHandler = null;

    this.zoomChangedHandler = null;

    this.centerChangedHandler = null;

    this.init();

    this.loadItems();
}

//Components elements definition
buildfire.components.mapPlotter.prototype = {
    // Allows change of the default filtering
    setFilterOptions: function (filterOptions) {
        this.filterOptions = filterOptions;
        this.clearAll();
        this.loadItems(0);
    },

    // Sets default options for the component
    setCoreOptions: function () {
        this._options = {
            showFilter: {
                show: false,
                imgUrl: ""
            },
            trackUser: {
                show: false,
                userViewImgUrl: user_svg_pin,
                userMapPin: {
                    // url: 'https://maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
                    url: "data:image/svg+xml;charset=UTF-8;base64," + btoa(user_map_pin),
                    // This marker is 20 pixels wide by 32 pixels high.
                    size: new google.maps.Size(30, 30),
                    // The origin for this image is (0, 0).
                    origin: new google.maps.Point(0, 0),
                    // The anchor for this image is the base of the flagpole at (0, 32).
                    anchor: new google.maps.Point(15, 15)
                },
                extendClassName: ""
            },
            showListView: {
                show: false,
                listViewImgUrl: list_svg_img,
                mapViewImgUrl: map_svg_img,
                extendClassName: ""
            },
            showFilter: {
                show: false,
                imgUrl: list_svg_img,
                extendClassName: ""
            },
            customButton1: {
                show: false,
                imgUrl: list_svg_img,
                extendClassName: "",
            },
            customButton2: {
                show: false,
                imgUrl: list_svg_img,
                extendClassName: "",
            },
            listOptions: {
                extendClassName: ""
            },
            listItemOptions: {
                extendClassName: ""
            },
            quickPreviewItem: {
                extendClassName: ""
            },
            markerCluster: {
                clusterImgUrl: "https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m",
                maxClusterLevel: 18
            },
            mapPinOptions: {
                onClicked: {
                    showQuickPreview: true,
                    autoOpenDetails: true,
                    autoOpenDetailsDelay: 1000
                },
                defaultIcon: {
                    path: pin_svg_path,
                    fillColor: "red",
                    fillOpacity: 1,
                    strokeColor: "#969696",
                    strokeWeight: 1,
                    anchor: new google.maps.Point(12, 24),
                    scale: 1
                },
                activeIcon: {
                    path: pin_svg_path,
                    fillColor: "red",
                    fillOpacity: 0.8,
                    strokeColor: "#969696",
                    strokeWeight: 1,
                    anchor: new google.maps.Point(12, 24),
                    scale: 1.4
                }
            },
            defaultZoomLevel: 12
        }
    },

    // Helper method
    isObject: function (item) {
        return item && typeof item === "object" && !Array.isArray(item);
    },

    // Assigned value from the source options to the target
    mergeOptions: function (target, source) {
        if (this.isObject(target) && this.isObject(source)) {
            for (var key in source) {
                if (this.isObject(source[key])) {
                    if (!target[key]) Object.assign(target, { [key]: {} });
                    this.mergeOptions(target[key], source[key]);
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }
        return target;
    },

    // Initialize component
    init: function () {
        this.selector.parentNode.insertBefore(this.mapPlotterEl.el, this.selector);
        this.mapPlotterEl.el.appendChild(this.selector);

        this._createButtons();

        var mcOptions = {
            imagePath: this._options.markerCluster.clusterImgUrl,
            maxZoom: this._options.markerCluster.maxClusterLevel
        };
        this.markerClusterer = new MarkerClusterer(this.mapInstance, [], mcOptions);
        this.mapView = true;
        // Enable user to be located and show position on the map if possible
        if (this._options.trackUser.show) {
            this._createUserLocator();
            this._createUserPin();
            this.onLocateMeClick();

        }
    },

    handleBoundsChange: function () {
        var _freshBounds = this.mapInstance.getBounds().toJSON();

        if (JSON.stringify(_freshBounds) !== JSON.stringify(this.boundsFields)) {
            this.boundsFields = _freshBounds;

            var viewPortPoligon = [[this.boundsFields.west, this.boundsFields.north], [this.boundsFields.east, this.boundsFields.north], [this.boundsFields.east, this.boundsFields.south], [this.boundsFields.west, this.boundsFields.south], [this.boundsFields.west, this.boundsFields.north]];
            this.onBoundsChange(viewPortPoligon);
        }
    },

    mapViewPortChanged: function (_initiator) {
        console.log("mapViewPortChanged")
        // if(this.busy) return;
        console.log("mapViewPortChanged executed")
        this.busy = true;

        if (_initiator === 0) {
            this.ignoreOtherBuffers = 4;
            google.maps.event.addListenerOnce(this.mapInstance, 'idle', function () {
                this.boundsFields = this.mapInstance.getBounds().toJSON();
                this.onBoundsChange([[this.boundsFields.west, this.boundsFields.north], [this.boundsFields.east, this.boundsFields.north], [this.boundsFields.east, this.boundsFields.south], [this.boundsFields.west, this.boundsFields.south], [this.boundsFields.west, this.boundsFields.north]], true);
            }.bind(this));
        } else if (this.ignoreOtherBuffers) {
            this.ignoreOtherBuffers = this.ignoreOtherBuffers - 1;
        }

        console.log("MAP EVENT INITIATOR ", _initiator);

        if (this.boundFetchTimeout) {
            clearTimeout(this.boundFetchTimeout);
            this.boundFetchTimeout = null;
        }
        if (this.ignoreOtherBuffers === 0) {
            this.boundFetchTimeout = setTimeout(this.handleBoundsChange.bind(this), 500);
        }

        this.loadItems();
    },

    detachMapListeners: function () {

        google.maps.event.removeListener(this.clusterClickHandler);

        google.maps.event.removeListener(this.boundsChangedHandler);

        google.maps.event.removeListener(this.zoomChangedHandler);

        google.maps.event.removeListener(this.centerChangedHandler);
        console.log("DETACH LISTENERS");
    },

    attachMapListeners: function () {
        this.clusterClickHandler = this.markerClusterer.addListener('clusterclick', this.mapViewPortChanged.bind(this, 0));

        this.boundsChangedHandler = this.mapInstance.addListener('bounds_changed', this.mapViewPortChanged.bind(this, 1));

        this.zoomChangedHandler = this.mapInstance.addListener('zoom_changed', this.mapViewPortChanged.bind(this, 2));

        this.centerChangedHandler = this.mapInstance.addListener('center_changed', this.mapViewPortChanged.bind(this, 3));

        this.boundsFields = this.mapInstance.getBounds().toJSON();
        this.onBoundsChange([[this.boundsFields.west, this.boundsFields.north], [this.boundsFields.east, this.boundsFields.north], [this.boundsFields.east, this.boundsFields.south], [this.boundsFields.west, this.boundsFields.south], [this.boundsFields.west, this.boundsFields.north]], true);
    },

    // Depending on a configuration some buttons are created and could be customize
    _createButtons: function () {
        var switchBlock = new domElement("div", {
            class: "btn-group-vertical switch-block " + this._options.showListView.extendClassName
        });
        var that = this;
        if (this._options.showFilter.show) {
            this.filterButton = new domElement(
                "button",
                { style: "line-height: 11px;margin-bottom: 25px;", class: "btn btn-primary " + this._options.showFilter.extendClassName },
                this._options.showFilter.imgUrl
            );
            this.filterButton.el.addEventListener("click", () => { that._onFilterClick() })
            switchBlock.el.append(this.filterButton.el);
        }
        if (this._options.showListView.show) {
            this.showListButton = new domElement(
                "button",
                { style: "line-height: 13px;margin-bottom: 25px;", class: "btn btn-primary " + this._options.showListView.extendClassName },
                this._options.showListView.listViewImgUrl
            );
            this.showListButton.el.addEventListener("click", () => { that._onShowListViewHanlder() });
            switchBlock.el.append(this.showListButton.el);
        }
        if (this._options.customButton1.show) {
            this.custom1Button = new domElement(
                "button",
                { style: "line-height: 13px;margin-bottom: 25px;", class: "btn btn-primary" + this._options.customButton1.extendClassName },
                this._options.customButton1.imgUrl
            );
            this.custom1Button.el.addEventListener("click", () => { that._onCustom1Click() });
            switchBlock.el.append(this.custom1Button.el);
        }
        if (this._options.customButton2.show) {
            this.custom2Button = new domElement(
                "button",
                { style: "line-height: 13px;margin-bottom: 25px;", class: "btn btn-primary " + this._options.customButton2.extendClassName },
                this._options.customButton2.imgUrl
            );
            this.custom2Button.el.addEventListener("click", () => { that._onCustom2Click() });
            switchBlock.el.append(this.custom2Button.el);
        }

        this.mapPlotterEl.el.append(switchBlock.el);
    },

    _createUserPin: function () {
        this.userMarker = new google.maps.Marker({
            clickable: false,
            position: this.userCoordinates,
            icon: this._options.trackUser.userMapPin,
            shadow: null,
            zIndex: 999,
            map: this.mapInstance
        });
    },

    clearAll: function () {
        this._resetActiveMarker();
        this.ids.length = 0;
        this.itemsData.length = 0;
        this.mapMarkers.forEach(function (mapMarker) {
            google.maps.event.clearInstanceListeners(mapMarker);
        });
        this.mapMarkers.length = 0;
        this.markerClusterer.clearMarkers();
    },

    addItems: function (_itemsList, ignoreFitBounds) {

        let markers = []
        _itemsList.forEach((item) => {
            if (this.ids[item.id]) return;

            this.ids[item.id] = item.id;
            this.itemsData.push(item);

            let marker = this._createMarker(item);
            if (marker) {
                this.mapMarkers.push(marker);
                markers.push(marker);
            }
        
            item.distanceKm = this.getDistanceFromLatLon(
                this.userCoordinates.lat(),
                this.userCoordinates.lng(),
                item.data._buildfire.geo.coordinates[1],
                item.data._buildfire.geo.coordinates[0],
                false,
                false)

            item.distanceMile = this.getDistanceFromLatLon(
                this.userCoordinates.lat(),
                this.userCoordinates.lng(),
                item.data._buildfire.geo.coordinates[1],
                item.data._buildfire.geo.coordinates[0],
                true,
                false)
        })

        this.itemsData.concat(_itemsList);
        if (this._onDataChange && typeof (this._onDataChange) == "function") {
            this._onDataChange(this.itemsData)
        }

        this.markerClusterer.addMarkers(markers);

        if (!this.clusterClickHandler) {
            google.maps.event.addListenerOnce(this.mapInstance, 'idle', this.attachMapListeners.bind(this));
        };
    },

    mapCenter: function () {
        this.mapInstance.setCenter(this.userCoordinates);
        this.mapInstance.setZoom(this.mapInitialZoom);
    },

    mapFitBounds: function (_includeUser) {
        this.detachMapListeners();
        if (!this.mapMarkers.length) {
            google.maps.event.addListenerOnce(this.mapInstance, 'idle', this.attachMapListeners.bind(this));
            return false;
        }

        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < this.mapMarkers.length; i++) {
            bounds.extend(this.mapMarkers[i].getPosition());
        }

        this.mapInstance.fitBounds(bounds, 10);
        google.maps.event.addListenerOnce(this.mapInstance, 'idle', this.attachMapListeners.bind(this));
    },

    loadItems: function (page = 0) {
        console.log("LOAD_ITEMS", this.filterOptions)
        // Current user location
        var pointTo = [this.userCoordinates.lng(), this.userCoordinates.lat()];
        // Default filter finds locations near to the current user location
        let filterOptions = {
            "filter": {
                "$and": [
                    {
                        "$json._buildfire.geo": {
                            "$near": {
                                "$geometry": {
                                    "type": "Point",
                                    "coordinates": pointTo
                                },
                                "$minDistance": 0,
                                "$maxDistance": 8000
                            }
                        }
                    }
                ]
            },
            "page": page,
            "pageSize": 50
        };

        if(this.boundsFields){
            filterOptions = {
                "filter": {
                    "$and": [
                        {
                            "$json._buildfire.geo": {
                                "$geoWithin":{
                                    "$geometry": { 
                                        "type": "Polygon",  
                                        coordinates: [ [[this.boundsFields.west, this.boundsFields.north], [this.boundsFields.east, this.boundsFields.north], [this.boundsFields.east, this.boundsFields.south], [this.boundsFields.west, this.boundsFields.south], [this.boundsFields.west, this.boundsFields.north] ] ]
                                    }
                                }
                            }
                            
                        }
                    ]
                },
                    "page": page,
                    "pageSize": 50
            }
        }

        if(this.filterOptions){
            if(this.filterOptions.filter){
                filterOptions.filter.$and.push(this.filterOptions.filter)
            }

            if(this.filterOptions.sort){
                filterOptions.filter.sort = this.filterOptions.sort
            }
        }
        
        buildfire.publicData.search(
            filterOptions,
            this.publicDataTag,
            function (error, resp) {
                if (error) {
                    throw "Error loading mapItems from publicData.";
                }

                if (resp) {
                    this.addItems(resp);
                }
                
                if(resp.length == 50){
                    this.loadItems(page + 1 )
                }
                
                this.busy = false;
            }.bind(this)
        );
    },

    onMarkerClick: function (_parent, _marker) {
        _parent._resetActiveMarker();
        _marker.setIcon(_parent._options.mapPinOptions.activeIcon);

        //Attaching an action to a marker click. There is the default behavior, that can be override
        if (_parent._options.mapPinOptions.onClicked.showQuickPreview) {
            let holder = _parent._createQuickHolder();
            if (_parent._onPinClick && typeof (_parent._onPinClick) == "function") {
                _parent._onPinClick(_marker, _marker.markerData, holder);
            } else {
                _parent._createQuickPreviewItem(_marker.markerData, holder);
            }
            _parent.mapPlotterEl.el.append(holder);
        }

        _parent.selectedMarker = _marker;
    },

    _createMarker: function (_markerData) {
        if (_markerData.data._buildfire && _markerData.data._buildfire.geo
            && _markerData.data._buildfire.geo.coordinates
            && _markerData.data._buildfire.geo.coordinates.length == 2) {
            var latLng = new google.maps.LatLng(_markerData.data._buildfire.geo.coordinates[1], _markerData.data._buildfire.geo.coordinates[0]);
            var marker = new google.maps.Marker({
                position: latLng,
                title: _markerData.data.title || "",
                markerData: _markerData,
                icon: this._options.mapPinOptions.defaultIcon,
            });

            marker.addListener("click", this.onMarkerClick.bind(null, this, marker));
            if (this._onPinCreated && typeof (this._onPinCreated) == "function") {
                this._onPinCreated(marker, _markerData);
            }
            return marker;
        }

        return null;
    },

    _resetActiveMarker: function () {
        if (this.selectedMarker) {
            var _lastMarker = this.selectedMarker;
            this.selectedMarker = null;
            _lastMarker.setIcon(this._options.mapPinOptions.defaultIcon);
        }

        if (this.quickPreviewItem) {
            this.quickPreviewItem.el.remove();
            this.quickPreviewItem = null;
        }
    },

    clearBlinkInterval: function () {
        clearInterval(this.blinkInterval);
        this.blinkInterval = null;
        this.on = 12;
    },

    blinkMyPosition: function () {
        if (this.on % 2 == 0) {
            this.userMarker.setMap(null);
        } else {
            this.userMarker.setMap(this.mapInstance);
        }
        this.on -= 1;
        if (this.on == 0) this.clearBlinkInterval();
    },

    onLocateMeClick: function () {
        buildfire.geo.getCurrentPosition({ timeout: 10000 }, (err, position) => {
            if (position && position.coords) {
                this.userCoordinates = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                this.userMarker.position = this.userCoordinates;
                this.mapInstance.setCenter(this.userCoordinates);
                this.mapCenter();
                this.clearBlinkInterval();
                this.blinkInterval = setInterval(this.blinkMyPosition.bind(this), 400);
                this.loadItems();
            } else {
                buildfire.notifications.alert({
                    title: "Location turned off",
                    message: "Please turn on your location"
                });
            }
        });
    },

    _createUserLocator: function () {
        let locateMeStyle = "line-height: 11px;";
        if (this.activeView == "list") {
            locateMeStyle = locateMeStyle + "display:none;";
        }
        this.locateMe = new domElement(
            "button",
            { style: locateMeStyle, class: "locate-me btn btn-primary " + this._options.trackUser.extendClassName },
            this._options.trackUser.userViewImgUrl
        );

        this.locateMe.el.addEventListener("click", this.onLocateMeClick.bind(this));

        this.mapPlotterEl.el.append(this.locateMe.el);
    },

    _createQuickHolder: function () {
        var _extendedClassName = "quick-preview__item " + this._options.quickPreviewItem.extendClassName;
        this.quickPreviewItem = new domElement("div", {
            class: _extendedClassName
        });

        return this.quickPreviewItem.el;
    },

    _createQuickPreviewItem: function (_selectedItemData, holder) {
        var itemHolder = new domElement("div", {
            class: "list-item__holder " + this._options.listItemOptions.extendClassName
        });
        var itemImg = new domElement("img", {
            src: _selectedItemData.data.imgUrl,
            class: "list-item__image"
        });
        var itemDetails = new domElement("div", {
            class: "list-item__details"
        });
        var itemTitle = new domElement("label", {}, _selectedItemData.data.title || "");
        var itemDescription = new domElement("p", {}, _selectedItemData.data.description || "");

        if (_selectedItemData.data.imgUrl) {
            itemHolder.el.append(itemImg.el);
        }
        itemDetails.el.append(itemTitle.el);
        itemDetails.el.append(itemDescription.el);
        itemHolder.el.append(itemDetails.el);

        holder.append(itemHolder.el);
    },

    getDistanceFromLatLon: function (lat1, lon1, lat2, lon2, unitIsMile, numberValue) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
        var dLon = this.deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km

        var distanceMile = (d * 0.621371192);
        var distanceKm = d;
        var distanceMileStr = "";
        var distanceKmStr = "";

   

        distanceMileStr = distanceMile.toFixed(2) + " M";
        distanceKmStr = distanceKm.toFixed(2) + " KM";
        console.log(lat1, lon1, lat2, lon2)
        console.log(unitIsMile,distanceMile.toFixed(2),distanceKm.toFixed(2))
        if(numberValue){
            return unitIsMile ? distanceMile.toFixed(2) : distanceKm.toFixed(2);
        }
        
        return unitIsMile ? distanceMileStr : distanceKmStr;
    },

    toRad: function (Value) 
    {
        return Value * Math.PI / 180;
    },

    deg2rad: function (deg) {
        return deg * (Math.PI / 180);
    },
    _emptyFunc: function(){

    },
    _onShowListViewHanlder: function(){
        this.mapView = !this.mapView;
        this.showListButton.el.innerHTML = this.mapView? this._options.showListView.listViewImgUrl: this._options.showListView.mapViewImgUrl;
        this._onShowListClick();
    },

    onPinCreated: function(cb) {
        this._onPinCreated = cb || this._emptyFunc;;
    },
    onPinClick: function(cb) {
        this._onPinClick = cb || this._emptyFunc;;
    },
    onFilterClick: function (cb) {
        this._onFilterClick = cb || this._emptyFunc;
     },

    onShowListClick: function (cb) {
        this._onShowListClick = cb || this._emptyFunc;
     },

    onCustom1Click: function (cb) { 
        this._onCustom1Click = cb || this._emptyFunc;
    },

    onCustom2Click: function (cb) { 
        this._onCustom1Click = cb || this._emptyFunc;
    },

    onClusterClick: function () { 
    },

    onBoundsChange: function () { },

    onDataChange: function (cb) {
        this._onDataChange = cb || this._emptyFunc;
     },
}