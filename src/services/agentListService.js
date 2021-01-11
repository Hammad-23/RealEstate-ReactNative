import axios from 'axios'
export const agentListService= async()=>{
    const result=await axios.post('agents/list')
return Promise.resolve(result.data.data)
}