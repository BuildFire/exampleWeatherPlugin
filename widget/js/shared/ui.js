
const ui ={
	create(elementType,appendTo,innerHTML,classNameArray){
		let e = document.createElement(elementType);
		if(innerHTML) e.innerHTML = innerHTML;
		if(Array.isArray(classNameArray))
			classNameArray.forEach(c=>e.classList.add(c));
		if(appendTo) appendTo.appendChild(e);
		return e;
	}
};