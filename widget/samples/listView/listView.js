

class ListView{
	constructor(containerId,options){
		this.container = document.getElementById(containerId);
		if(!this.container) throw "Cant find container";
		this.container.classList.add("listViewContainer");
		this.options=options || {};
		this.container.innerHTML="";
	}

	clear(){
		this.container.innerHTML="";
	}
	loadListViewItems(items){
		if(this.container.innerHTML==""){
			if(this.options.enableAddButton){
				let addButton = ui.create("button",this.container,"<span></span>",["listViewAddButton", "btn", "btn--add", "btn--fab", "btn-primary"]);
				addButton.onclick = this.onAddButtonClicked;
			}
		}
		items.forEach(item=>this.addItem(item));
	}

	addItem(item){
		let t = this;
		if(!(item instanceof ListViewItem) )
			item = new ListViewItem(item);
		let i = item.render(this.container);
		i.onclick=()=>{ t.onItemClicked(item); };
		i.onToolbarClicked=(key,item,e)=>{ t.onItemToolbarClicked(key,item,e); };
	}

	onAddButtonClicked(){
		console.log("Add Button Clicked");
	}

	onItemClicked(item){
		console.log("Item Clicked",item);
	}

	onItemToolbarClicked(key,item,e){
		console.log("Item Toolbar Clicked",item);
	}


}

class ListViewItem{
	constructor(obj={}){
		this.id = obj.id;
		this.title = obj.title;
		this.imageUrl = obj.imageUrl;
		this.description = obj.description;
		this.toolbar = obj.toolbar || [];
		this.data = obj.data;

	}


	toRawData(){
		return{
			id: this.id,
			title: this.title,
			imageUrl:this.imageUrl ,
			description:this.description,
			toolbar:this.toolbar,
			data:this.data
		};
	}

	render(container,card){
		this.container=container;

		if(card)
			card.innerHTML="";
		else
			card = ui.create('div',container,'',['listViewItem']);

		this.card=card;


		let imgContainer = ui.create('div', card, null, ['listViewItemImgContainer']);
		if(this.imageUrl) {
			let img = ui.create('img', imgContainer, null, ['listViewItemImg']);

			if(this.imageUrl.indexOf("http")==0)
				img.src= buildfire.imageLib.cropImage(this.imageUrl,{width:128,height:128});
			else // local
				img.src= this.imageUrl;

			ui.create('i', imgContainer, null, ['listViewItemIcon']);
		}

		let listViewItemCopy= ui.create('div',card,null,['listViewItemCopy', 'ellipsis', 'padded', 'padded--m']);

		ui.create('h5',listViewItemCopy,this.title,['listViewItemTitle', 'ellipsis', 'margin--0']);

		if(this.description)
			ui.create('p',listViewItemCopy,this.description,['listViewItemDescription', 'ellipsis', 'margin--0']);


		let t = this;
		if(this.toolbar && this.toolbar.length ){
			let listViewItemToolbar = ui.create('div', card, null, ['listViewItemToolbar']);
			this.toolbar.forEach(obj=>{
				let i = ui.create('span', listViewItemToolbar, obj.text, ['listViewItemToolbarItem',obj.class]);
				i.onclick = e=>{
					t.onToolbarClicked(obj.key,t,e);
					e.preventDefault();
					e.stopPropagation();
					return false;
				};
			});

		}

		return card;
	}

	onToolbarClicked(key, item){

	}

	update(){
		this.render(this.container,this.card);
	}

}