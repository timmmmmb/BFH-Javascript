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
 * getValue returns the value of this char
 */
Char.prototype.getValue = function(){
    return this.value;
};

/**
 * constructor for a SingleLineChar
 * @param {Char} value the char value
 * @param {String} string the chars representation as a string all on one line
 */
function SingleLineChar(value, string) {
    Char.apply(this,arguments)
    this.string = string;
    this.value = value;
    return this;
}

SingleLineChar.prototype = Char.prototype;
SingleLineChar.prototype.constructor = SingleLineChar;
SingleLineChar.prototype.getString = function(){
    return this.string;
}

/**
 * constructor for a MultiLineChar
 * @param {Char} value the char value
 * @param {String} lines the chars representation as a string all on multiple lines this is an array of strings
 */
function MultiLineChar(value, lines) {
    Char.apply(this,arguments)
    this.value = value;
    this.lines = lines;
    return this;
}

MultiLineChar.prototype = Char.prototype;
MultiLineChar.prototype.constructor = MultiLineChar;
MultiLineChar.prototype.getLine = function(){
    return this.line;
}

/**
 * constructor for a Font object used to map all chars
 * @param {String} name name of the font
 * @param {Char[]} chars an array of chars
 */
function Font(name, chars, lineHeight) {
    this.name = name;
    this.lineHeight = lineHeight||1;
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
        for(var j = 0; j<this.lineHeight; j++){
            console.log(this.render(text)[j]);
        }
    } else {
        for(var j = 0; j<this.lineHeight; j++){ 
            to(this.render(text)[j]);
        }
    }
};

/**
 * Function to convert a String using this font
 * @param {String} text the text that should get renderd
 */
Font.prototype.render = function(text) {
    // create an array of strings for each line
    var output = {};
    output[0] = "";
    for (var i = 0; i < text.length; i++) {
        for(var j = 0; j<this.lineHeight; j++){
            output[j] += this.alphabet.get(text.charAt(i))+" ";
        }
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
        output[i] =new SingleLineChar(splitted[0], splitted[1]);
    }
    return output;
}

var alphabetString =
"a=.-;b=-...;c=-.-.;d=-..;e=.;f=..-;g=--.;h=....;i=..;j=.---;k=-.-;l=.-..;" +
"m=--;n=-.;o=---;p=.---.;q=--.-;r=.-.;s=...;t=-;u=..-;v=...-;w=.--;x=-..-;" +
"y=-.-;z=--..; =//;.=.-.-.-;,=--..--;?=..--..;!=-.-.--";
// create the morsefont
let morseFont = new Font("MorseFont",createFontArray(alphabetString),1);
// convert some text
morseFont.write("hello","");
