chrome.webRequest.onHeadersReceived.addListener(
	function(details) {
		for (const header of details.responseHeaders) {
			if (header.name.toLowerCase() === 'content-security-policy') {
				header.value = "default-src *;script-src 'none';style-src 'unsafe-inline'";
			}
		}

		return { responseHeaders: details.responseHeaders };
	},
	{urls: ["https://www.flowdock.com/app/*"]},
	["blocking", "responseHeaders"]
);
