// export const TEACHER = [
//     {
//         "id": "5909610759",
//         "fname": "jungkook",
//         "lname": "jeon",
//         "sujectList": ["cs101","cs102","cs103"]
//     }
// ];
export class Subject{
    id:string;
    name:string;
    des:string;
    constructor(id:string,name:string,des:string){
        this.id = id;
        this.name = name;
        this.des = des;
    }

}