var mraa = require('mraa'); // require mraa
var request = require("request"); //req

var auth = "Bearer xxxxx"; // Device token
var dev = "xxxxx"; //device ID

var count = 0; // Setting the inital value of count as 0

var pinIn = new mraa.Gpio(12); // Pin for in
var pinOut = new mraa.Gpio(8); // pin for OUt

pinIn.dir(mraa.DIR_IN); // setting pin IN as INPUT mode
pinOut.dir(mraa.DIR_IN); // setting pin OUT as INPUT mode

// Setting default value as LOW
pinIn.write(0);
pinOut.write(0);

//Function which listen for the the push buttons and make it act as a switch
function check() {
    var ch = 0; // help to use pushbutton as switch ( one can hold the push button as much they need but only one request is considered)
    var inner = pinIn.read();
    if (inner == 1) {
        while (pinIn.read() == 1) {
            
        }
        count++;
        ch = 1;
    }
    var outer = pinOut.read();
    if (outer == 1) {
        while (pinOut.read() == 1) {
            
        }
        count--;
        ch = 1;
    }
    if (ch == 1) {
        console.log(count) // printing the current count
        post(count);
        ch = 0;
    }
    setTimeout(check, 500);
}
console.log("Running"); // Print running when program starts
post(0); //uploading 0 to artik when starts
check(); // starting the fucntion check() to listen pushbuttons

// Function which upload to artik
function post(c) {

    // seting the properties to upload
    var options = {
        method: 'POST', // reqest type
        url: 'https://api.artik.cloud/v1.1/messages', // api request url
        headers: {
            'Content-Type': 'application/json', // setting conect type as json
            'cache-control': 'no-cache', // don't store any cache'
            'authorization': auth // passing the token as the header
        },
        //passing data as json though body of the post request
        body: '{\r\n\t"sdid": "' + dev + '",\r\n\t"type": "message",\r\n\t"data": {\r\n\t\t\t"count": "' + c + '"\r\n\t\t}\r\n}'
    };

    //seting the the request with the properties above mentioned
    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        console.log(body); // printing the response
    });

}