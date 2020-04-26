const {google} = require('googleapis');
const auth = require('./auth/auth')

auth.authorize((auth) => {
  callAppsScript(auth);
})
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
function callAppsScript(auth) { // eslint-disable-line no-unused-vars
    const scriptId = 'MoEoSbez4T1VfLvhtdpMkgKN5kDX4RwHg';
    const script = google.script('v1');
  
    // Make the API request. The request object is included here as 'resource'.
    script.scripts.run({
      auth: auth,
      resource: {
        function: 'getFoldersUnderRoot',
      },
      scriptId: scriptId,
    }, function(err, resp) {
      if (err) {
        // The API encountered a problem before the script started executing.
        console.log('The API returned an error: ' + err);
        return;
      }
      if (resp.error) {
        // The API executed, but the script returned an error.
  
        // Extract the first (and only) set of error details. The values of this
        // object are the script's 'errorMessage' and 'errorType', and an array
        // of stack trace elements.
        const error = resp.error.details[0];
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
        console.log(resp);
        const folderSet = resp.data.response.result;
        if (Object.keys(folderSet).length == 0) {
          console.log('No folders returned!');
        } else {
          console.log('Folders under your root folder:');
          Object.keys(folderSet).forEach(function(id) {
            console.log('\t%s (%s)', folderSet[id], id);
          });
        }
      }
    });
  }