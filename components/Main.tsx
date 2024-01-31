'use client'

import { GroupBase, OptionsOrGroups } from "react-select"
import { ReactSelect ,type OptionType,type OptionValue} from "./Select"
import { LoadOptions } from "react-select-async-paginate"


export const Main=()=>{
    return <>
    <ReactSelect
        placeholder='Select Client'
        loadOptions={loadOptions as LoadOptions<OptionType<OptionValue>, GroupBase<OptionType<OptionValue>>, AdditionalType>}
        isMulti
    />
    </>
}


const loadOptions=async(search:string,options:OptionsOrGroups<OptionType<OptionValue>,GroupBase<OptionType<OptionValue>>>,{page}:AdditionalType)=>{

    const url=new URL('http://24.144.81.246:8000/api/client/get')

    url.searchParams.append('status','true')
    url.searchParams.append('page',page.toString())

    if(search){
        url.searchParams.append('search',search)
        url.searchParams.delete('page')
    }

    const token =`Token caedebedb8ef694a88ccd78a7cb40670bb077bbdc9c1dd4a3dfc21e3a6999f29`

    console.log(options)

    const response= await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Authorization':token
        }
    })

    

    const data= await response.json() as ResponseType

    const optionData=data.payload.results.map(option=>({
        label:option.name,
        value:option.id
    
    }))
    

    return {
        hasMore:!!data.payload.next,
        options:optionData,
        additional:{
            page:page+1
        }
    }
}


type ResponseType={
    status:number,
    message:string
    payload:{
        count:number,
        total_pages:number,
        limit:number,
        current_page:number,
        next:string | null,
        previous:string | null,
        results:ClientType[]
    }
}


type ClientType={
    readonly id:number,
    readonly name:string,
}

type AdditionalType={
    page:number
}