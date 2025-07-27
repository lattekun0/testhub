import { useLayoutEffect } from "react";

export default function useDocumentTitle(title: string){
    useLayoutEffect(()=>{
        document.title = title;
    }, [title])
}