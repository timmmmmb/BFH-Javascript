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

SingleLineChar.prototype = Object.create(Char.prototype);
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

MultiLineChar.prototype = Object.create(Char.prototype);
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
        if(lineHeight == 1){
            let string = [];
            string[0] = element.string;
            alphabet.set(element.value, string);
        }else{
            alphabet.set(element.value, element.lines);
        }
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
    for(var j = 0; j<this.lineHeight; j++){
        output[j] = "";
    }
    for (var i = 0; i < text.length; i++) {
        for(var j = 0; j<this.lineHeight; j++){
            //console.log(j);
            output[j] += this.alphabet.get(text.charAt(i))[j]+" ";
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

/**
 * converts a string into a multilinefont
 * the string gets splitted per @@@
 * and it splitts the value, char with @@
 * @param {String} string the string that should get converted into an array
 */
function createMultilineFont(string){
    let input = string.split("@@@")
    let output = [input.length];
    for(let i = 0; i < input.length; i++){
        let splitted = input[i].split("@@");
        let lines = splitted[1].split("@");
        output[i] =new MultiLineChar(splitted[0], lines);
    }
    return output;
}

var alphabetString =
"a=.-;b=-...;c=-.-.;d=-..;e=.;f=..-;g=--.;h=....;i=..;j=.---;k=-.-;l=.-..;" +
"m=--;n=-.;o=---;p=.---.;q=--.-;r=.-.;s=...;t=-;u=..-;v=...-;w=.--;x=-..-;" +
"y=-.-;z=--..; =//;.=.-.-.-;,=--..--;?=..--..;!=-.-.--";

var dollaralphabet = ' @@    @    @    @    @    @    @    @    @    @    @    @    @@@A@@  ______  @ /      \\ @/$$$$$$  |@$$ |__$$ |@$$    $$ |@$$$$$$$$ |@$$ |  $$ |@$$ |  $$ |@$$/   $$/ @          @          @          @@@B@@ _______  @/       \\ @$$$$$$$  |@$$ |__$$ |@$$    $$< @$$$$$$$  |@$$ |__$$ |@$$    $$/ @$$$$$$$/  @          @          @          @@@C@@  ______  @ /      \\ @/$$$$$$  |@$$ |  $$/ @$$ |      @$$ |   __ @$$ \\__/  |@$$    $$/ @ $$$$$$/  @          @          @          @@@D@@ _______  @/       \\ @$$$$$$$  |@$$ |  $$ |@$$ |  $$ |@$$ |  $$ |@$$ |__$$ |@$$    $$/ @$$$$$$$/  @          @          @          @@@E@@ ________ @/        |@$$$$$$$$/ @$$ |__    @$$    |   @$$$$$/    @$$ |_____ @$$       |@$$$$$$$$/ @          @          @          @@@F@@ ________ @/        |@$$$$$$$$/ @$$ |__    @$$    |   @$$$$$/    @$$ |      @$$ |      @$$/       @          @          @          @@@G@@  ______  @ /      \\ @/$$$$$$  |@$$ | _$$/ @$$ |/    |@$$ |$$$$ |@$$ \\__$$ |@$$    $$/ @ $$$$$$/  @          @          @          @@@H@@ __    __ @/  |  /  |@$$ |  $$ |@$$ |__$$ |@$$    $$ |@$$$$$$$$ |@$$ |  $$ |@$$ |  $$ |@$$/   $$/ @          @          @          @@@I@@ ______ @/      |@$$$$$$/ @  $$ |  @  $$ |  @  $$ |  @ _$$ |_ @/ $$   |@$$$$$$/ @        @        @        @@@J@@    _____ @   /     |@   $$$$$ |@      $$ |@ __   $$ |@/  |  $$ |@$$ \\__$$ |@$$    $$/ @ $$$$$$/  @          @          @          @@@K@@ __    __ @/  |  /  |@$$ | /$$/ @$$ |/$$/  @$$  $$<   @$$$$$  \\  @$$ |$$  \\ @$$ | $$  |@$$/   $$/ @          @          @          @@@L@@ __       @/  |      @$$ |      @$$ |      @$$ |      @$$ |      @$$ |_____ @$$       |@$$$$$$$$/ @          @          @          @@@M@@ __       __ @/  \\     /  |@$$  \\   /$$ |@$$$  \\ /$$$ |@$$$$  /$$$$ |@$$ $$ $$/$$ |@$$ |$$$/ $$ |@$$ | $/  $$ |@$$/      $$/ @             @             @             @@@N@@ __    __ @/  \\  /  |@$$  \\ $$ |@$$$  \\$$ |@$$$$  $$ |@$$ $$ $$ |@$$ |$$$$ |@$$ | $$$ |@$$/   $$/ @          @          @          @@@O@@  ______  @ /      \\ @/$$$$$$  |@$$ |  $$ |@$$ |  $$ |@$$ |  $$ |@$$ \\__$$ |@$$    $$/ @ $$$$$$/  @          @          @          @@@P@@ _______  @/       \\ @$$$$$$$  |@$$ |__$$ |@$$    $$/ @$$$$$$$/  @$$ |      @$$ |      @$$/       @          @          @          @@@Q@@  ______  @ /      \\ @/$$$$$$  |@$$ |  $$ |@$$ |  $$ |@$$ |_ $$ |@$$ / \\$$ |@$$ $$ $$< @ $$$$$$  |@     $$$/ @          @          @@@R@@ _______  @/       \\ @$$$$$$$  |@$$ |__$$ |@$$    $$< @$$$$$$$  |@$$ |  $$ |@$$ |  $$ |@$$/   $$/ @          @          @          @@@S@@  ______  @ /      \\ @/$$$$$$  |@$$ \\__$$/ @$$      \\ @ $$$$$$  |@/  \\__$$ |@$$    $$/ @ $$$$$$/  @          @          @          @@@T@@ ________ @/        |@$$$$$$$$/ @   $$ |   @   $$ |   @   $$ |   @   $$ |   @   $$ |   @   $$/    @          @          @          @@@U@@ __    __ @/  |  /  |@$$ |  $$ |@$$ |  $$ |@$$ |  $$ |@$$ |  $$ |@$$ \\__$$ |@$$    $$/ @ $$$$$$/  @          @          @          @@@V@@ __     __ @/  |   /  |@$$ |   $$ |@$$ |   $$ |@$$  \\ /$$/ @ $$  /$$/  @  $$ $$/   @   $$$/    @    $/     @           @           @           @@@W@@ __       __ @/  |  _  /  |@$$ | / \\ $$ |@$$ |/$  \\$$ |@$$ /$$$  $$ |@$$ $$/$$ $$ |@$$$$/  $$$$ |@$$$/    $$$ |@$$/      $$/ @             @             @             @@@X@@ __    __ @/  |  /  |@$$ |  $$ |@$$  \\/$$/ @ $$  $$<  @  $$$$  \\ @ $$ /$$  |@$$ |  $$ |@$$/   $$/ @          @          @          @@@Y@@ __      __ @/  \\    /  |@$$  \\  /$$/ @ $$  \\/$$/  @  $$  $$/   @   $$$$/    @    $$ |    @    $$ |    @    $$/     @            @            @            @@@Z@@ ________ @/        |@$$$$$$$$/ @    /$$/  @   /$$/   @  /$$/    @ /$$/____ @/$$      |@$$$$$$$$/ @          @          @          @@@a@@          @          @  ______  @ /      \\ @ $$$$$$  |@ /    $$ |@/$$$$$$$ |@$$    $$ |@ $$$$$$$/ @          @          @          @@@b@@ __       @/  |      @$$ |____  @$$      \\ @$$$$$$$  |@$$ |  $$ |@$$ |__$$ |@$$    $$/ @$$$$$$$/  @          @          @          @@@c@@          @          @  _______ @ /       |@/$$$$$$$/ @$$ |      @$$ \\_____ @$$       |@ $$$$$$$/ @          @          @          @@@d@@       __ @      /  |@  ____$$ |@ /    $$ |@/$$$$$$$ |@$$ |  $$ |@$$ \\__$$ |@$$    $$ |@ $$$$$$$/ @          @          @          @@@e@@          @          @  ______  @ /      \\ @/$$$$$$  |@$$    $$ |@$$$$$$$$/ @$$       |@ $$$$$$$/ @          @          @          @@@f@@  ______  @ /      \\ @/$$$$$$  |@$$ |_ $$/ @$$   |    @$$$$/     @$$ |      @$$ |      @$$/       @          @          @          @@@g@@          @          @  ______  @ /      \\ @/$$$$$$  |@$$ |  $$ |@$$ \\__$$ |@$$    $$ |@ $$$$$$$ |@/  \\__$$ |@$$    $$/ @ $$$$$$/  @@@h@@ __       @/  |      @$$ |____  @$$      \\ @$$$$$$$  |@$$ |  $$ |@$$ |  $$ |@$$ |  $$ |@$$/   $$/ @          @          @          @@@i@@ __ @/  |@$$/ @/  |@$$ |@$$ |@$$ |@$$ |@$$/ @    @    @    @@@j@@          @          @       __ @      /  |@      $$/ @      /  |@      $$ |@      $$ |@ __   $$ |@/  \\__$$ |@$$    $$/ @ $$$$$$/  @@@k@@ __       @/  |      @$$ |   __ @$$ |  /  |@$$ |_/$$/ @$$   $$<  @$$$$$$  \\ @$$ | $$  |@$$/   $$/ @          @          @          @@@l@@ __ @/  |@$$ |@$$ |@$$ |@$$ |@$$ |@$$ |@$$/ @    @    @    @@@m@@              @              @ _____  ____  @/     \\/    \\ @$$$$$$ $$$$  |@$$ | $$ | $$ |@$$ | $$ | $$ |@$$ | $$ | $$ |@$$/  $$/  $$/ @              @              @              @@@n@@          @          @ _______  @/       \\ @$$$$$$$  |@$$ |  $$ |@$$ |  $$ |@$$ |  $$ |@$$/   $$/ @          @          @          @@@o@@          @          @  ______  @ /      \\ @/$$$$$$  |@$$ |  $$ |@$$ \\__$$ |@$$    $$/ @ $$$$$$/  @          @          @          @@@p@@          @          @  ______  @ /      \\ @/$$$$$$  |@$$ |  $$ |@$$ |__$$ |@$$    $$/ @$$$$$$$/  @$$ |      @$$ |      @$$/       @@@q@@          @          @  ______  @ /      \\ @/$$$$$$  |@$$ |  $$ |@$$ \\__$$ |@$$    $$ |@ $$$$$$$ |@      $$ |@      $$ |@      $$/ @@@r@@          @          @  ______  @ /      \\ @/$$$$$$  |@$$ |  $$/ @$$ |      @$$ |      @$$/       @          @          @          @@@s@@          @          @  _______ @ /       |@/$$$$$$$/ @$$      \\ @ $$$$$$  |@/     $$/ @$$$$$$$/  @          @          @          @@@t@@   __     @  /  |    @ _$$ |_   @/ $$   |  @$$$$$$/   @  $$ | __ @  $$ |/  |@  $$  $$/ @   $$$$/  @          @          @          @@@u@@          @          @ __    __ @/  |  /  |@$$ |  $$ |@$$ |  $$ |@$$ \\__$$ |@$$    $$/ @ $$$$$$/  @          @          @          @@@v@@           @           @ __     __ @/  \\   /  |@$$  \\ /$$/ @ $$  /$$/  @  $$ $$/   @   $$$/    @    $/     @           @           @           @@@w@@              @              @ __   __   __ @/  | /  | /  |@$$ | $$ | $$ |@$$ | $$ | $$ |@$$ \\_$$ \\_$$ |@$$   $$   $$/ @ $$$$$/$$$$/  @              @              @              @@@x@@          @          @ __    __ @/  \\  /  |@$$  \\/$$/ @ $$  $$<  @ /$$$$  \\ @/$$/ $$  |@$$/   $$/ @          @          @          @@@y@@          @          @ __    __ @/  |  /  |@$$ |  $$ |@$$ |  $$ |@$$ \\__$$ |@$$    $$ |@ $$$$$$$ |@/  \\__$$ |@$$    $$/ @ $$$$$$/  @@@z@@          @          @ ________ @/        |@$$$$$$$$/ @  /  $$/  @ /$$$$/__ @/$$      |@$$$$$$$$/ @          @          @          @@@.@@    @    @    @    @    @    @ __ @/  |@$$/ @    @    @    @@@!@@ __ @/  |@$$ |@$$ |@$$ |@$$/ @ __ @/  |@$$/ @    @    @    @@@?@@  ____  @ /    \\ @/$$$$  |@$$  $$ |@   /$$/ @  /$$/  @  $$/   @  /  |  @  $$/   @        @        @        ';

var isoString = ' @@   @   @   @   @   @   @   @   @   @   @   @@@A@@      ___     @     /\\  \\    @    /::\\  \\   @   /:/\\:\\  \\  @  /::\\~\\:\\  \\ @ /:/\\:\\ \\:\\__\\@ \\/__\\:\\/:/  /@      \\::/  / @      /:/  /  @     /:/  /   @     \\/__/    @@@B@@      ___     @     /\\  \\    @    /::\\  \\   @   /:/\\:\\  \\  @  /::\\~\\:\\__\\ @ /:/\\:\\ \\:|__|@ \\:\\~\\:\\/:/  /@  \\:\\ \\::/  / @   \\:\\/:/  /  @    \\::/__/   @     ~~       @@@C@@      ___     @     /\\  \\    @    /::\\  \\   @   /:/\\:\\  \\  @  /:/  \\:\\  \\ @ /:/__/ \\:\\__\\@ \\:\\  \\  \\/__/@  \\:\\  \\      @   \\:\\  \\     @    \\:\\__\\    @     \\/__/    @@@D@@      ___     @     /\\  \\    @    /::\\  \\   @   /:/\\:\\  \\  @  /:/  \\:\\__\\ @ /:/__/ \\:|__|@ \\:\\  \\ /:/  /@  \\:\\  /:/  / @   \\:\\/:/  /  @    \\::/__/   @     ~~       @@@E@@      ___     @     /\\  \\    @    /::\\  \\   @   /:/\\:\\  \\  @  /::\\~\\:\\  \\ @ /:/\\:\\ \\:\\__\\@ \\:\\~\\:\\ \\/__/@  \\:\\ \\:\\__\\  @   \\:\\ \\/__/  @    \\:\\__\\    @     \\/__/    @@@F@@      ___     @     /\\  \\    @    /::\\  \\   @   /:/\\:\\  \\  @  /::\\~\\:\\  \\ @ /:/\\:\\ \\:\\__\\@ \\/__\\:\\ \\/__/@      \\:\\__\\  @       \\/__/  @              @              @@@G@@      ___     @     /\\  \\    @    /::\\  \\   @   /:/\\:\\  \\  @  /:/  \\:\\  \\ @ /:/__/_\\:\\__\\@ \\:\\  /\\ \\/__/@  \\:\\ \\:\\__\\  @   \\:\\/:/  /  @    \\::/  /   @     \\/__/    @@@H@@      ___     @     /\\__\\    @    /:/  /    @   /:/__/     @  /::\\  \\ ___ @ /:/\\:\\  /\\__\\@ \\/__\\:\\/:/  /@      \\::/  / @      /:/  /  @     /:/  /   @     \\/__/    @@@I@@            @      ___   @     /\\  \\  @     \\:\\  \\ @     /::\\__\\@  __/:/\\/__/@ /\\/:/  /   @ \\::/__/    @  \\:\\__\\    @   \\/__/    @            @@@J@@       ___   @      /\\  \\  @      \\:\\  \\ @  ___ /::\\__\\@ /\\  /:/\\/__/@ \\:\\/:/  /   @  \\::/  /    @   \\/__/     @             @             @             @@@K@@      ___     @     /\\__\\    @    /:/  /    @   /:/__/     @  /::\\__\\____ @ /:/\\:::::\\__\\@ \\/_|:|~~|~   @    |:|  |    @    |:|  |    @    |:|  |    @     \\|__|    @@@L@@      ___ @     /\\__\\@    /:/  /@   /:/  / @  /:/  /  @ /:/__/   @ \\:\\  \\   @  \\:\\  \\  @   \\:\\  \\ @    \\:\\__\\@     \\/__/@@@M@@      ___     @     /\\__\\    @    /::|  |   @   /:|:|  |   @  /:/|:|__|__ @ /:/ |::::\\__\\@ \\/__/~~/:/  /@       /:/  / @      /:/  /  @     /:/  /   @     \\/__/    @@@N@@      ___     @     /\\__\\    @    /::|  |   @   /:|:|  |   @  /:/|:|  |__ @ /:/ |:| /\\__\\@ \\/__|:|/:/  /@     |:/:/  / @     |::/  /  @     /:/  /   @     \\/__/    @@@O@@      ___     @     /\\  \\    @    /::\\  \\   @   /:/\\:\\  \\  @  /:/  \\:\\  \\ @ /:/__/ \\:\\__\\@ \\:\\  \\ /:/  /@  \\:\\  /:/  / @   \\:\\/:/  /  @    \\::/  /   @     \\/__/    @@@P@@      ___     @     /\\  \\    @    /::\\  \\   @   /:/\\:\\  \\  @  /::\\~\\:\\  \\ @ /:/\\:\\ \\:\\__\\@ \\/__\\:\\/:/  /@      \\::/  / @       \\/__/  @              @              @@@Q@@      ___     @     /\\  \\    @    /::\\  \\   @   /:/\\:\\  \\  @   \\:\\~\\:\\  \\ @    \\:\\ \\:\\__\\@     \\:\\/:/  /@      \\::/  / @      /:/  /  @     /:/  /   @     \\/__/    @@@R@@      ___     @     /\\  \\    @    /::\\  \\   @   /:/\\:\\  \\  @  /::\\~\\:\\  \\ @ /:/\\:\\ \\:\\__\\@ \\/_|::\\/:/  /@    |:|::/  / @    |:|\\/__/  @    |:|  |    @     \\|__|    @@@S@@      ___     @     /\\  \\    @    /::\\  \\   @   /:/\\ \\  \\  @  _\\:\\~\\ \\  \\ @ /\\ \\:\\ \\ \\__\\@ \\:\\ \\:\\ \\/__/@  \\:\\ \\:\\__\\  @   \\:\\/:/  /  @    \\::/  /   @     \\/__/    @@@T@@      ___     @     /\\  \\    @     \\:\\  \\   @      \\:\\  \\  @      /::\\  \\ @     /:/\\:\\__\\@    /:/  \\/__/@   /:/  /     @   \\/__/      @              @              @@@U@@      ___     @     /\\__\\    @    /:/  /    @   /:/  /     @  /:/  /  ___ @ /:/__/  /\\__\\@ \\:\\  \\ /:/  /@  \\:\\  /:/  / @   \\:\\/:/  /  @    \\::/  /   @     \\/__/    @@@V@@      ___     @     /\\__\\    @    /:/  /    @   /:/  /     @  /:/__/  ___ @  |:|  | /\\__\\@  |:|  |/:/  /@  |:|__/:/  / @   \\::::/__/  @    ~~~~      @              @@@W@@      ___     @     /\\__\\    @    /:/ _/_   @   /:/ /\\__\\  @  /:/ /:/ _/_ @ /:/_/:/ /\\__\\@ \\:\\/:/ /:/  /@  \\::/_/:/  / @   \\:\\/:/  /  @    \\::/  /   @     \\/__/    @@@X@@      ___     @     |\\__\\    @     |:|  |   @     |:|  |   @     |:|__|__ @ ____/::::\\__\\@ \\::::/~~/~   @  ~~|:|~~|    @    |:|  |    @    |:|  |    @     \\|__|    @@@Y@@      ___     @     |\\__\\    @     |:|  |   @     |:|  |   @     |:|__|__ @     /::::\\__\\@    /:/~~/~   @   /:/  /     @   \\/__/      @              @              @@@Z@@      ___     @     /\\  \\    @     \\:\\  \\   @      \\:\\  \\  @       \\:\\  \\ @ _______\\:\\__\\@ \\::::::::/__/@  \\:\\~~\\~~    @   \\:\\  \\     @    \\:\\__\\    @     \\/__/    ';
// create the morsefont
let morseFont = new Font("MorseFont",createFontArray(alphabetString),1);
// convert some text
//morseFont.write("hello","");

// create the morsefont
let dollarfont = new Font("DollarFont",createMultilineFont(dollaralphabet),12);
// convert some text
dollarfont.write("hallo tim kek","");

// create the morsefont
let isofont = new Font("isoFont",createMultilineFont(isoString),11);
// convert some text
//isofont.write("HELLO","");


