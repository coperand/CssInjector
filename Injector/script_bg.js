chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab)
{
	if(changeInfo.status == "complete")
	{
		var tabUrl = tab.url;
		var begin = tabUrl.indexOf("//") + 2;
		if(begin == -1) begin = 0;
		var end = tabUrl.indexOf("/", begin);
		if(end == -1) end = tabUrl.length - 1;
		tabUrl = tabUrl.substring(begin, end);
		
		chrome.storage.sync.get([ tabUrl ], function(result)
		{
			if(result[tabUrl]) chrome.tabs.insertCSS(tabId, {code: result[tabUrl]});
		});
	}
})