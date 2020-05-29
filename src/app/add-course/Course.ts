export class Course{
    LID:string;
    header:string;
    des:string;
    ftype:string[];
    fname:string[];
    path:string[];
    fid:string[];

    constructor(id:string,header:string,des:string){
        this.LID = id;
        this.header = header;
        this.des = des;
        this.ftype = [];
        this.fname = [];
        this.path = [];
        this.fid = [];
    }
    addTypeFilePath(type:string,name:string,path:string,fid:string){
        this.ftype.push(type);
        this.fname.push(name);
        this.path.push(path);
        this.fid.push(fid);
    }
    setHeader(header:string){
        this.header = header;
    }
    setDescription(description:string){
        this.des = description;
    }
}