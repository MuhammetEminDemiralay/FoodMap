export interface PostData {
    userId : string,
    documentId : string |number[],
    lat : number,
    long : number,
    comment? : string[]
    like? : number,
    description? : string
    date? : Date
}