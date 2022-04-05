var context = "selection";
var title = "新增代办";
chrome.contextMenus.create({"title": title, "contexts":[context],"id": "context" + context}, () => chrome.runtime.lastError);
//var id = chrome.contextMenus.create({"title": title, "contexts":[context],"id": "context" + context});  

function findDates(str) {
	var res = str.match(/\d{2}([\/.-])\d{2}\1\d{4}/g);
	if(!str || !res || !res[0]){return false;}
	var dts = [];
	for (i = 0; i < res.length; i++) { 
		var d = new Date(res[i]);
		if (isNaN(Date.parse(d))){continue;}
		var ds = d.getFullYear().toString() + 
		('0'+(d.getMonth()+1)).slice(-2) + 
		('0'+d.getDate()).slice(-2);
		dts.push(ds);
	} if(dts.length <= 0){return false;} return dts;
}

function onClickHandler(info, tab) {
  var sText = info.selectionText;
  var url = "https://www.google.com/calendar/event?action=TEMPLATE&details="+"Added From: \n"+tab.url+"&text=" + encodeURIComponent(sText);
  var date = findDates(sText);
  if (date) { url = url+"&dates="+date[0]+"/"; }
  if (date[1]) { url = url+date[1]; } else { url = url+date[0]; }
  //chrome.windows.open(url, '_blank');
  url = url.slice(0,-9);
  chrome.tabs.create({
    url: url,
  });
};

chrome.contextMenus.onClicked.addListener(onClickHandler);