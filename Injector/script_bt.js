function ClearHandler(e)
{
	var result = confirm("Are you sure you want to clear ALL styles in storage?");
	if(!result) return;
	chrome.storage.sync.clear(function()
	{
		if (chrome.extension.lastError) alert('An error occurred: ' + chrome.extension.lastError.message);
	});
	text.value = "";
}

function BackInBlack()
{
	text.style.borderColor = "black";
}

function SaveHandler(e)
{
	var obj = {};        
	obj[tabUrl] = text.value;   
	chrome.storage.sync.set(obj, function()
	{
		if (chrome.extension.lastError) alert('An error occurred: ' + chrome.extension.lastError.message);
		text.style.borderColor = "#1dde54";
		var black = "black";
		setTimeout(BackInBlack, 500);
	});
}

var tabUrl;
var text = document.getElementById("text");

document.getElementById("save").onclick = SaveHandler;
document.getElementById("clear").onclick = ClearHandler;

chrome.tabs.getSelected(null, function(tab) {
	tabUrl = tab.url;
	var begin = tabUrl.indexOf("//") + 2;
	if(begin == -1) begin = 0;
	var end = tabUrl.indexOf("/", begin);
	if(end == -1) end = tabUrl.length - 1;
	tabUrl = tabUrl.substring(begin, end);
	
	chrome.storage.sync.get([ tabUrl ], function(result)
	{
		if(result[tabUrl]) text.value = result[tabUrl];
	});
});