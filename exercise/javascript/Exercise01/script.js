var alphabetString = 
"a=.-;b=-...;c=-.-.;d=-..;e=.;f=..-;g=--.;h=....;i=..;j=.---;k=-.-;l=.-..;" +
"m=--;n=-.;o=---;p=.---.;q=--.-;r=.-.;s=...;t=-;u=..-;v=...-;w=.--;x=-..-;" +
"y=-.-;z=--..; =//;.=.-.-.-;,=--..--;?=..--..;!=-.-.--";

//console.log(convertFromMorse(".. // .- --. .-. . . // -.. ..- -.. ."));
console.log(convertToMorse("hello wie geht es"));

/**
 * replaces all occurences of the search string with the replacment string in the input 
 * @param {*} string input string which shall be searchd in 
 * @param {*} search the string that should get replaced
 * @param {*} replacement the new string that replaces the search string
 */
function replaceAll(string, search, replacement) {
    return string.split(search).join(replacement);
};

/**
 * this function converts one character to morse
 * @param {*} input one character that should get converted to morse
 */
function charToMorseCode(input){
    var output = alphabetString.match(input+"=[-./]*");
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
        output += " ";
    }
    return output;
}

/**
 * converts a string from morse
 * @param {*} input a string that should get converted from morse
 */
function convertFromMorse(input){
    let output = "";
    input = replaceAll(input,".","\\.");
    input = input.split(" ");
    for (var i = 0; i < input.length; i++) {
        output += charFromMorseCode(input[i]);
    }
    return output;
}

/**
 * this function converts one character from morse
 * @param {*} input one character that should get converted from morse
 */
function charFromMorseCode(input){
    var output = alphabetString.match(".="+input+";");
    output = output[0].substring(0,1);
    return output;
}
