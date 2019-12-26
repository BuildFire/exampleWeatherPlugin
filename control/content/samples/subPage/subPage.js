
class SubPage{
	constructor(id){
		this.container = document.getElementById(id);
		if(!this.container)throw "Sub Page ID not found";
		if(!this.container.classList.contains("subPage"))throw "Sub Page doesnt have class [subPage]";

		let closeButton = this.container.querySelector(".close-modal");
		if(closeButton)
			closeButton.onclick=()=>{this.container.classList.remove("activeDialog");};

	}

	show(){
		this.container.classList.add("activeFull");
	}

	showDialog(options,saveCallback,deleteCallback){
		let btnSave = this.container.querySelector(".spSaveButton");
		btnSave.onclick=saveCallback;

		let btnDeleteButton = this.container.querySelector(".spDeleteButton");
		btnDeleteButton.style.display=''; //reset
		btnDeleteButton.onclick=deleteCallback;
		if(options) {
			if (options.title) {
				let h = this.container.querySelector(".spHeaderText");
				h.innerHTML = options.title;
			}
			if (options.saveText)
				btnSave.innerHTML = options.saveText;

			
			if (options.hideDelete)
				btnDeleteButton.style.display = 'none';

		}
		this.container.classList.add("activeDialog");

	}

	close(){
		this.container.classList.remove("activeFull");
		this.container.classList.remove("activeDialog");
	}
}