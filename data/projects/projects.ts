export type projecttype = {
    id : number ;
    title : string ;
    slug : string ; 
    date?: string ;
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
        slug : "quicknote" ,
        date : "2026-03-15" ,
        status : "building" ,
        content : "take notes directly from browser to your obsidian vault" ,
        url : "https://github.com/manasds" ,
        src : "/images/bg8.png" 
    } , 
    {
        id : 2 ,
        title : "Cursor" ,
        slug : "cursor" ,
        date : "2025-01-01" ,
        status : "live" ,
        content : "ai orchestrator that lives in your ide and has context of your codebase !!" ,
        url : "https://cursor.com" ,
        src : "/images/bg10.png"
    } ,
    {
        id : 3 ,
        title : "Supermemory" ,
        slug : "supermemory" ,
        date : "2024-09-05" ,
        status : "building" ,
        content : "a system that remebers your memories across different models" ,
        url : "https://supermemory.ai" ,
        src : "/images/bg4.png"
    }
]
