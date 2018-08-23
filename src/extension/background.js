chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		return { redirectUrl: chrome.extension.getURL('bundle.js') }
	},
	{
		urls: [
			"https://d2cxspbh1aoie1.cloudfront.net/owl-assets/owl-web-bd7286df4ef3347517507cddca808701.js"
		]
	},
	["blocking"]
);

chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		return { cancel: true }
	},
	{
		urls: [
			"https://d2cxspbh1aoie1.cloudfront.net/owl-assets/owl-374418fe96b3f464c6cba39928deae62.css"
		]
	},
	["blocking"]
);

chrome.webRequest.onHeadersReceived.addListener(
	function(details) {
		for (var i = 0; i < details.responseHeaders.length; i++) {
			if ('content-security-policy' === details.responseHeaders[i].name.toLowerCase()) {
				details.responseHeaders[i].value = '';
			}
		}

		return { responseHeaders: details.responseHeaders };
	},
	{urls: ["https://www.flowdock.com/app/*"]},
	["blocking", "responseHeaders"]
);
