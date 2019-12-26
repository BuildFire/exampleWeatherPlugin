
if (typeof (buildfire) == "undefined") throw ("please add buildfire.js first to use sortableList components");
if (typeof (buildfire.components) == "undefined") buildfire.components = {};

if (typeof (Sortable) == "undefined")throw ("please add sortable.min.js first to use sortableList components");


buildfire.components.SortableList = class SortableList{

    constructor (element, items=[]) {
        // sortableList requires Sortable.js
        if (typeof (Sortable) == "undefined") throw ("please add Sortable first to use sortableList components");
        this.items = [];
        this.init(element);
        this.loadItems(items);
    }

    // will be called to initialize the setting in the constructor
    init(element) {
        if(typeof(element)=="string")
            this.element = document.getElement(element);
        else
            this.element=element;
        //this._renderTemplate();
        this.element.classList.add("draggable-list-view");
        this._initEvents();
    }

    // this method allows you to replace the slider image or append to then if appendItems = true
    loadItems (items, appendItems) {
        if (items && items instanceof Array) {
            if (!appendItems && this.items.length !== 0) {
                // here we want to remove any existing items since the user of the component don't want to append items
                this._removeAll();
            }


            for (var i = 0; i < items.length; i++) {
                this.items.push(items[i]);
                let row = document.createElement("div");
                this.injectItemElements(items[i],this.items.length - 1,row);
                this.element.appendChild(row);
            }
        }
    }

    // allows you to append a single item or an array of items
    append (items) {
        if (!items)
            return;
        else if (!(items instanceof Array) && typeof (items) == "object")
            items = [items];

        this.loadItems(items, true);
    }

    // remove all items in list
    clear() {
        this._removeAll();
    }

    // remove all the DOM element and empty the items array
    _removeAll () {
        this.items = [];
        this.element.innerHTML='';
    }

    // append new sortable item to the DOM
    injectItemElements (item,index,divRow) {
        if(!item) throw "Missing Item";
        divRow.innerHTML="";
        divRow.setAttribute("arrayIndex",index);

        // Create the required DOM elements
        var moveHandle = document.createElement("span"),
            title = document.createElement("a") ,
            deleteButton = document.createElement("span");

        // Add the required classes to the elements
        divRow.className = "d-item clearfix";
        moveHandle.className = "icon icon-menu cursor-grab";
        title.className = "title ellipsis item-title";

        deleteButton.className = "btn btn--icon icon icon-cross2";
        title.innerHTML = item.title;

        // Append elements to the DOM
        divRow.appendChild(moveHandle);
        if(item.imgUrl){
            let img = document.createElement("img");
            img.src = buildfire.imageLib.cropImage(item.imgUrl,{width:16,height:16});
            divRow.appendChild(img);
        }
        divRow.appendChild(title);
        divRow.appendChild(deleteButton);



        title.onclick = ()=>{
            let index = divRow.getAttribute("arrayIndex"); /// it may have bee reordered so get value of current property
            index = parseInt(index);
            this.onItemClick(item,index,divRow);
            return false;
        };

        deleteButton.onclick=()=>{
            let index = divRow.getAttribute("arrayIndex"); /// it may have bee reordered so get value of current property
            index = parseInt(index);
            let t = this;
            this.onDeleteItem(item,index,confirmed=>{
                if(confirmed){
                    divRow.parentNode.removeChild(divRow);
                    t.reIndexRows();
                }
            });
            return false;
        };
    }

    // initialize the generic events
    _initEvents() {
        var me = this;
        var oldIndex = 0;

        // initialize the sort on the container of the items
        me.sortableList = Sortable.create(me.element, {
            animation: 150,
            onUpdate: function (evt) {

                var newIndex = me._getSortableItemIndex(evt.item);
                var tmp = me.items.splice(oldIndex,1)[0];
                me.items.splice(newIndex,0,tmp);
                me.reIndexRows();
                me.onOrderChange(tmp, oldIndex, newIndex);
            },
            onStart: function (evt) {
                oldIndex = me._getSortableItemIndex(evt.item);
            }
        });
    }

    reIndexRows(){
        let i = 0;
        this.element.childNodes.forEach(e=>{
            e.setAttribute("arrayIndex",i);
            i++;
        });
    }

    // get item index from the DOM sortable elements
    _getSortableItemIndex (item) {

        var index = 0;
        while ((item = item.previousSibling) != null) {
            index++;
        }
        return index;
    }

    _cropImage (url, options) {
        if (!url) {
            return "";
        }
        else {
            return buildfire.imageLib.cropImage(url, options);
        }
    }

    /* This will be triggered when the order of items changes
	  Example: if you move the first item location to be the second this will return item object, 0, 1 */
    onOrderChange(item, oldIndex, newIndex) {
        console.warn("please handle onOrderChange", item, oldIndex, newIndex);
    }

    // This will be triggered when you delete an item
    onDeleteItem (item, index) {
        console.error("please handle onDeleteItem", item);
    }

    // This will be triggered when you delete an item
    onItemClick (item, index,divRow) {
        console.error("please handle onItemClick", item);
    }
};