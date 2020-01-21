
Date.prototype.addDays=function(days){
	let d = new Date(this);
	return new Date(d.setDate(d.getDate() + days));
};

Date.prototype.addWeekDays=function(days){
	let total = Math.abs( days);
	let delta = days < 0? -1:1;
	let d = new Date(this);
	let sanityCheck = 0;
	while(total != 0 && sanityCheck < 999) {
		d = new Date(d.setDate(d.getDate() + delta));
		if ( [0,6].indexOf(d.getDay()) < 0 ) total-=1;
		sanityCheck ++;
	}
	return d;
};



Date.prototype.toDateInputString=function() {

	var day = ("0" + this.getDate()).slice(-2);
	var month = ("0" + (this.getMonth() + 1)).slice(-2);

	return this.getFullYear() + "-" + (month) + "-" + (day);
};

Date.prototype.toTimeInputString=function() {
	function dz(value){
		return (value<10?"0" :"") + value;
	}
	let v = dz(this.getHours()) + ":" + dz(this.getMinutes()) ;

	return v;

};


Date.prototype.toTimeDiffString=function(endDate){

	let secs=Math.abs(endDate - this) / 1000;

	var days, hours, minutes, seconds;

	if( secs == null )
		return "";

	days = ( secs / 86400 ) >> 0;
	hours = ( secs % 86400 / 3600 ) >> 0;
	minutes = ( secs % 3600 / 60 ) >> 0;
	seconds = Math.round( secs % 60 );
	seconds = seconds < 10 ? "0" + seconds : seconds;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	hours = hours && hours < 10 ? "0" + hours : hours;

	return "" + ( days ? days+" - " : "" ) + ( hours ? hours+":" : "" ) + minutes + ":" + seconds;
};