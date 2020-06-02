export class replyInfo{
    id:string;
    name:string;
    msg:string;
    rid:string
    owner:string;


    constructor(id:string,name:string,msg:string,rid:string){
        this.id = id;
        this.name = name;
        this.msg = msg;
        this.rid = rid;
    }
    public getID():string{ return this.id;}
    public getName():string{ return this.name;}
    public getMsg():string{ return this.msg;}
    public setOwner(id:string){
        this.owner = id;
    }
}