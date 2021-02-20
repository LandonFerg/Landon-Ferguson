var newDate;
var projNames = [];
var projDates = [];

function getLatest(d, di){ // fetch our repos and display latest commit date
fetch('https://api.github.com/repos/LandonFerg/' + d + '/commits').then(function
(response) {
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (data) {
	//  jSON from our response
	console.log("FOUND DATA FOR: " + d)
  	var dd = new Date(data[0].commit.committer.date)
	  
	// change date to mm/dm/yy format
	var latestDate = ('0' + (dd.getMonth()+1)).slice(-2) + "/" + dd.getDate() + "/" + dd.getFullYear().toString().substr(-2);
	console.log(latestDate);
	projDates[di] = latestDate; // define newest date in projDates
}).catch(function (err) {
	// error
	newDate = "";
	console.warn('no repo found for project', err);

});
}

//getLatest(getProjectNames()[0]);

function getProjectNames() {
    var tds = document.querySelectorAll('td.nameLabel');
    return Array.prototype.map.call(tds, function(t) {
		//getLatest(t.textContent);
		 return t.textContent; 
		});
}

function getProjectDays(){
	var tds = document.querySelectorAll('td.date');
    return Array.prototype.map.call(tds, function(t) { // loops through found elements
		 /* update innerHTML here */ /*t.innerHTML = "N/A";*/ return t.textContent; });
}

// add our current data to arrays
projNames = getProjectNames();
projDates = getProjectDays();

function updateProjectDates(){
	for (const [i, value] of projNames.entries()) {
		getLatest(value, i); // do api request for each repo
	}
}

function applyDates(){
	console.log("applying dates..." + projDates);
	var tds = document.querySelectorAll('td.date');
	i = 0;
	return Array.prototype.map.call(tds, function(t) { // loops through found elements
    t.textContent = projDates[i]; i++; return t.textContent; });

}

 updateProjectDates(); // apply our dates from projDates[]

 setTimeout(function(){ // I dont quite understand callbacks in js
	applyDates();
}, 500);
 /*
	A better way to do this to avoid a million api requests would be to
	grab data from firebase and check once every day/week and push new
	data firebase instead
 */