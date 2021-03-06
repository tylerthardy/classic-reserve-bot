const {google} = require('googleapis');
/**
 * Creates a new script project, upload a file, and log the script's URL.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
/**
 * Call an Apps Script function to list the folders in the user's root
 * Drive folder.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function call(auth, functionName, parameters, callback) { // eslint-disable-line no-unused-vars
    const scriptId = 'MoEoSbez4T1VfLvhtdpMkgKN5kDX4RwHg';
    const script = google.script('v1');

    // Make the API request. The request object is included here as 'resource'.
    const scriptOptions = {
        auth: auth,
        scriptId: scriptId,
        requestBody: {
            function: functionName
        }
    };
    if (parameters) {
        scriptOptions.requestBody.parameters = parameters;
    }
    script.scripts.run(scriptOptions, function (err, resp) {
        if (err) {
            // The API encountered a problem before the script started executing.
            console.log('The API returned an error: ' + err);
            return;
        }
        if (resp.data.error) {
            // The API executed, but the script returned an error.

            // Extract the first (and only) set of error details. The values of this
            // object are the script's 'errorMessage' and 'errorType', and an array
            // of stack trace elements.
            const error = resp.data.error.details[0];
            console.log('Script error message: ' + error.errorMessage);
            console.log('Script error stacktrace:');

            if (error.scriptStackTraceElements) {
                // There may not be a stacktrace if the script didn't start executing.
                for (let i = 0; i < error.scriptStackTraceElements.length; i++) {
                    const trace = error.scriptStackTraceElements[i];
                    console.log('\t%s: %s', trace.function, trace.lineNumber);
                }
            }
        } else {
            // The structure of the result will depend upon what the Apps Script
            // function returns. Here, the function returns an Apps Script Object
            // with String keys and values, and so the result is treated as a
            // Node.js object (folderSet).
            printObject(resp.data.response.result);
            callback(resp.data.response.result);
        }
    });
}

function printObject(object) {
    if (Object.keys(object).length == 0) {
        console.log('{}');
    } else {
        console.log('{');
        Object.keys(object).forEach(function (id) {
            console.log('    %s: %s', id, object[id]);
        });
        console.log('}');
    }
}

exports.call = call;