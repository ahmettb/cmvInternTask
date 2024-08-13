export interface Notice
{
    id:number,
topic:string,
content:string,
dateOfValidity: Date;
image: string;
}

export interface NoticeRequestDto
{
topic:string,
content:string,
dateOfValidity: Date;
}