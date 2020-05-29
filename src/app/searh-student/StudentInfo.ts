export class StudentInfo{
    id:string;
    private name:string;
    private department:string;
    constructor(id:string,fname:string,depart:string){
        this.id = id;
        this.name = fname;
        this.department = depart;
    }
    public getID():string{
        return this.id;
    }
    public getfname():string{
        return this.name;
    }
    public getDepartment():string{
        return this.department;
    }
}