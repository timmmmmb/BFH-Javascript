var alphabetString = 
"a=.-;b=-...;c=-.-.;d=-..;e=.;f=..-;g=--.;h=....;i=..;j=.---;k=-.-;l=.-..;" +
"m=--;n=-.;o=---;p=.---.;q=--.-;r=.-.;s=...;t=-;u=..-;v=...-;w=.--;x=-..-;" +
"y=-.-;z=--..; =//;.=.-.-.-;,=--..--;?=..--..;!=-.-.--";

console.log(convertToMorse("test"));


/**
 * this function converts one character to morse
 * @param {*} input one character that should get converted to morse
 */
function charToMorseCode(input){
    var output = alphabetString.match(input+"=[.-]*");
    output = output[0].substring(2);
    return output;
}

/**
 * converts a string to morse
 * @param {*} input a string that should get converted to morse
 */
function convertToMorse(input){
    let output = "";
    for (var i = 0; i < input.length; i++) {
        output += charToMorseCode(input.charAt(i));
    }
    return output;
}
