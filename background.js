// upgrade the CSS saved in local storage, if necessary
util.updateCssVersion();

// handle messages from the front-end
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {

        switch(request.method) {
            case "getOptions":
                sendResponse(options.getOptions());
                break;

            default:
                throw "Did not recognize the requested method: " + request.type;
        }
    }
);
