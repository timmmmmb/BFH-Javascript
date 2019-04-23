/**
 * constructor for a Char
 * @param {Char} value the char value
 * @param {String} string the chars representation as a string
 */
function Char(value, string) {
    this.string = string;
    this.value = value;
    return this;
}

/**
 * constructor for a Font object used to map all chars
 * @param {String} name name of the font
 * @param {Char[]} chars an array of chars
 */
function Font(name, chars) {
    this.name = name;
    var alphabet = new Map();

    // create a HMap from the Char array
    chars.forEach(function (element) {
        alphabet.set(element.value, element.string);
    });

    this.alphabet = alphabet;

    return this;
}

/**
 * function to render text and use it as a parameter for a function
 * @param {String} text the text that should get renderd
 * @param {Function} to a function that should use the renderd text
 */
Font.prototype.write = function(text, to) {
    if (typeof to !== "function") {
        console.log(this.render(text));
    } else {
        to(this.render(text));
    }
};

/**
 * Function to convert a String using this font
 * @param {String} text the text that should get renderd
 */
Font.prototype.render = function(text) {
    var output = "";
    for (var i = 0; i < text.length; i++) {
        output += this.alphabet.get(text.charAt(i));
        output += " ";
    }
    return output;
};

/**
 * converts a string into an array
 * the string gets splitted per ;
 * and it splitts the value, char with =
 * @param {String} string the string that should get converted into an array
 */
function createFontArray(string){
    let input = string.split(";")
    let output = [input.length];
    for(let i = 0; i < input.length; i++){
        let splitted = input[i].split("=");
        output[i] =new Char(splitted[0], splitted[1]);
    }
    return output;
}

var alphabetString =
"a=.-;b=-...;c=-.-.;d=-..;e=.;f=..-;g=--.;h=....;i=..;j=.---;k=-.-;l=.-..;" +
"m=--;n=-.;o=---;p=.---.;q=--.-;r=.-.;s=...;t=-;u=..-;v=...-;w=.--;x=-..-;" +
"y=-.-;z=--..; =//;.=.-.-.-;,=--..--;?=..--..;!=-.-.--";
// create the morsefont
let morseFont = new Font("MorseFont",createFontArray(alphabetString));
// convert some text
morseFont.write("hello","");
// override the render function
morseFont.render = function(text){
    var output = "";
    for (var i = 0; i < text.length; i++) {
        output += this.alphabet.get(text.charAt(i));
        output += "/";
    }
    return output;
}
morseFont.write("hello","");