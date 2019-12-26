/**
 * Created by danielhindi on 8/31/17.
 */

class Settings{

	static get(callback){ /// supporting both callback and promises
		return new Promise( (resolve,reject)=>{
			buildfire.datastore.get("settings",(e,obj)=>{
				if(e){
					reject(e);
					if(callback)callback(e);
				}
				else{
					let s = new Settings(obj);
					resolve(s);
					if(callback)callback(null,s);
				}
			});
		} );
	}

	constructor(dbObj = {data:{}}){
		this.id= dbObj.id || null;
		this.info = dbObj.data.info || new InfoCard();
		this.bgImageUrl = dbObj.data.bgImageUrl;
		///  Add your properties here <<=============================== MAKE CHANGES HERE
		this.prop1= dbObj.data.prop1 || '';
		this.prop2= dbObj.data.prop2 || '';
		this.prop3= dbObj.data.prop3 || '';
	}

	toRawData(){
		return {
			id: this.id
			,info: this.info
			,bgImageUrl: this.bgImageUrl
			///  copy your properties <<=============================== MAKE CHANGES HERE
			,prop1 : this.prop1
			,prop2 : this.prop2
			,prop3 : this.prop3
		};
	}

	save(callback){
		return new Promise((resolve,reject)=>{
			buildfire.datastore.save( this.toRawData(), "settings",(e,r)=>{
				if(e){
					reject(e);
					if(callback)callback(e);
				}
				else{
					resolve(r);
					if(callback)callback(null,r);
				}
			});
		});

	}

}

