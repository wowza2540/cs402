export class PostInfo{
    id:string;
    name:string;
    msg:string;
    // answer:string[];
    // postby:string[];

    constructor(id:string,name:string,msg:string){
        this.id = id;
        this.name = name;
        this.msg = msg;
        // this.answer = [];
        // this.postby=[];
    }
    public getID():string{ return this.id;}
    public getName():string{ return this.name;}
    public getMsg():string{ return this.msg;}
}