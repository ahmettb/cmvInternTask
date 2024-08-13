export interface News{
id:number,
topic:string,
content:string,
dateOfValidity: Date;
newLink: string;
};
export interface NewDto {
    topic: string;
    content: string;
    dateOfValidity: Date;
    newLink: string;
};