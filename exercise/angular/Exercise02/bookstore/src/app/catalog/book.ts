export class Book{
    constructor(public isbn:string,public authors:string, public title:string, public price:number,public publisher:string,public publicationYear:number,public binding:BookBinding, public numberOfPages:number, public description:string,public imageUrl:string) {
    }
    public toString() {
        var ret = this.isbn+" "+this.description+" "+this.title+" "+this.authors+" "+this.publisher;
        return ret;
    }
}

export enum BookBinding {
    PAPERBACK = 1,
    EBOOK
}