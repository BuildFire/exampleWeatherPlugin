

class GridView{
	constructor(containerId,options){
		this.container = document.getElementById(containerId);
		if(!this.container) throw "Cant find container";
		this.container.classList.add("gridViewContainer");
		this.options=options || {};
		this.container.innerHTML="";
	}

	clear(){
		this.container.innerHTML="";
	}
	loadGridViewItems(items){
		if(this.container.innerHTML==""){
			if(this.options.enableAddButton){
				let addButton = ui.create("button",this.container,null,["gridViewAddButton", "border-primary", "btn"]);
				addButton.onclick = this.onAddButtonClicked;
			}
		}
		items.forEach(item=>this.addItem(item));
	}

	addItem(item){
		let t = this;
		if(!(item instanceof GridViewItem) )
			item = new GridViewItem(item);
		item.render(this.container).onclick=()=>{
			t.onItemClicked(item);
		};
	}

	onAddButtonClicked(){
		console.log("Add Button Clicked");
	}

	onItemClicked(item){
		console.log("Item Clicked",item);
	}


}

class GridViewItem{
	constructor(obj={}){
		this.id = obj.id;
		this.title = obj.title;
		this.imageUrl = obj.imageUrl;
		this.badgeNumber = obj.badgeNumber;
		this.badgeClass = obj.badgeClass;
		this.markerUrl = obj.markerUrl;
		this.data = obj.data;
	}


	toRawData(){
		return{
			id: this.id,
			title: this.title,
			imageUrl:this.imageUrl ,
			badgeNumber:this.badgeNumber,
			badgeClass:this.badgeClass,
			markerUrl:this.markerUrl,
			data:this.data
		};
	}

	render(container,card){
		this.container=container;

		if(card)
			card.innerHTML="";
		else
			card = ui.create('div',container,'',['gridViewItem']);

		this.card=card;

		if(this.markerUrl) {
			let marker=ui.create('img', card, null, ['gridViewItemMarker']);
			if(this.markerUrl.indexOf("http")==0)
				marker.src= buildfire.imageLib.cropImage(this.markerUrl,{width:16,height:16});
			else // local
				marker.src= this.markerUrl;
		}


		if(this.badgeNumber)
			ui.create('span', card, this.badgeNumber, ['gridViewItemBadge', 'caption',this.badgeClass]);


		if(this.imageUrl) {
			let img = ui.create('img', card, null, ['gridViewItemImg']);

			if(this.imageUrl.indexOf("http")==0)
				img.src= buildfire.imageLib.cropImage(this.imageUrl,{width:128,height:128});
			else // local
				img.src= this.imageUrl;
		}

		ui.create('h5',card,this.title,['gridViewItemTitle','ellipsis', 'margin--0']);

		return card;
	}

	update(){
		this.render(this.container,this.card);
	}

}