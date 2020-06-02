import { replyInfo } from "./replyInfo";

export class PostInfo{
    id:string;
    name:string;
    msg:string;
    reply:replyInfo[];
    qaid:string;
    ownerID:string;

    constructor(id:string,name:string,msg:string,qaid:string){
        this.reply =[];
        this.id = id;
        this.name = name;
        this.msg = msg;
        this.qaid = qaid;
    }
    public getID():string{ return this.id;}
    public getName():string{ return this.name;}
    public getMsg():string{ return this.msg;}
    public addreply(r1:replyInfo){
        this.reply.push(r1);
    }
    public setOnwer(id:string){
        this.ownerID = id;
    }
    
}