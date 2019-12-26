
let dummyData=[
	{
		title:"Title 1"
		,imageUrl:"https://img.icons8.com/ios/72/worldwide-location.png"
		,badgeNumber:3
		,badgeClass:"green"
		,markerUrl:"https://img.icons8.com/ios/72/worldwide-location.png"
	}
	,{
		title:"Title 2 really longTitle 2 really longTitle 2 really long"
		,imageUrl:"https://img.icons8.com/ios/72/worldwide-location.png"
		,badgeNumber:3333
		,badgeClass:"red"
		,markerUrl:"https://img.icons8.com/ios/72/worldwide-location.png"
	}
	,{
		title:"Title 1"
		,imageUrl:"https://img.icons8.com/ios/72/worldwide-location.png"
		,badgeNumber:0
		,badgeClass:"green"
		,markerUrl:"https://img.icons8.com/ios/72/worldwide-location.png"
	}
	,{
		title:"Title 2 really longTitle 2 really longTitle 2 really long"
		,imageUrl:"https://img.icons8.com/ios/72/worldwide-location.png"
	}
];

(function() {
	let item = new GridViewItem({
		title: "Title 2 really longTitle 2 really longTitle 2 really long"
		, imageUrl: "https://img.icons8.com/ios/72/worldwide-location.png"
		, badgeNumber: 3333
		, badgeClass: "red"
		, markerUrl: "https://img.icons8.com/ios/72/worldwide-location.png"
	});
	dummyData.push(item);
})();