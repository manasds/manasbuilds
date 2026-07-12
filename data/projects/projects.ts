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
        title : "flint" ,
        slug : "flint" ,
        date : "2026-07-09" ,
        status : "live" ,
        content : "this app enables p2p file sharing between two browsers without any server using webrtc" ,
        url : "https://flint.manasbuilds.me" ,
        github : "https://github.com/manasds/flint" ,
        src : "/images/bg2.jpg" 
    } ,
]
