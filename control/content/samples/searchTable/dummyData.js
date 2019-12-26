
const dummyData={
	fetchDummyRecords:(recordCount=100,callback)=>{
		var r = new XMLHttpRequest();
		r.open("GET", `http://www.filltext.com/?rows=${recordCount}&firstName={firstName}&lastName={lastName}&email={email}&createdOn={date}&credits={randomDecimal|1000}}`, true);
		r.onreadystatechange = function () {
			if (r.readyState != 4 || r.status != 200) return callback("error fetching records");
			let data = JSON.parse(r.responseText);
			callback(null,data);
		};
		r.send();
	}
	,insertDummyRecords(tag,recordCount=100,callback){
		this.fetchDummyRecords(recordCount,(e,results)=>{
			if(e) return callback(e);
			let records=[];
			let i = 0;
			results.forEach((row)=>{
				let r = {
					name: {
						firstName: row.firstName
						, lastName: row.lastName
					}
					,email:row.email
					,credits: Math.round(row.credits * 100)/100
					,createdOn:row.createdOn
					,isActive:(i % 10 == 0?1:0)
					,_buildfire:{
						index:{
							text:row.firstName.toLowerCase() + " " + row.lastName.toLowerCase() + " " + row.email.toLowerCase()
							,number1:(i % 10 == 0?1:0)
							,date1:row.createdOn
						}
					}
				};
				i++;
				records.push(r);
			});
			debugger;
			buildfire.publicData.bulkInsert(records,tag,callback);
		});
	}
};