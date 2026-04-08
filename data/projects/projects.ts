export type projecttype = {
    id : number ;
    title : string ;
    status : "building" | "live" ;
    content : string ;
    url : string ;
    github? : string ;
    src : string ; 
}

export const projects : projecttype[] = [
    {
        id : 1 ,
        title : "quicknote" ,
        status : "building" ,
        content : "take notes directly from browser to your obsidian vault" ,
        url : "https://github.com/manasds" ,
        src : "/images/bg8.png" 
    } , 
    {
        id : 2 ,
        title : "cursor" ,
        status : "live" ,
        content : "ai orchestrator that lives in your ide and has context of your codebase !!" ,
        url : "https://cursor.com" ,
        src : "/images/bg10.png"
    }
]