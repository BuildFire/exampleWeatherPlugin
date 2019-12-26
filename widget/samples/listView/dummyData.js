
let dummyData=[
	{
		title:"Title 1"
		,imageUrl:"https://img.icons8.com/ios/72/worldwide-location.png"
		,description:"Blah blah blah"
		,toolbar:[{
			key:"btnBadge"
			,class:"toolbarBadge"
			,text:"9"
		},{
			key:"btnShare"
			,class:"toolbarShare"
			,text:"share"
		}]
		,data:{
			key1:"1"
			,key2:"2"
		}
	}
	,{
		title:"Title 2 really longTitle 2 really longTitle 2 really long"
		,imageUrl:"https://img.icons8.com/ios/72/worldwide-location.png"
		,description:"Blah blah blah"
	}
	,{
		title:"Title 1"
		,imageUrl:"https://img.icons8.com/ios/72/worldwide-location.png"
		,description:"Blah blah blah"
	}
	,{
		title:"Title 2 really longTitle 2 really longTitle 2 really long"
		,imageUrl:"https://img.icons8.com/ios/72/worldwide-location.png"
	}
	,{
		title:"Title 3"
	}
];

(function() {
	/// another way you can create an item
	let item = new ListViewItem({
		title: "Title 2 really longTitle 2 really longTitle 2 really long"
		, imageUrl: "https://img.icons8.com/ios/72/worldwide-location.png"
	});
	dummyData.push(item);
})();