import {useEffect, useState} from 'react'
import 'antd/dist/antd.css';
import { Col, Card, Select } from 'antd';
import style from './pendings.module.css' 
import moment from 'moment'
const PendingDetail = ({info, index, handler,setCounters,counters,setPendings})=>{
    const [pendInfo, setPendInfo] = useState(info)
    const [allStatus] = useState(['Active','Done'])
    const [manana,setManana] = useState(false)
    useEffect(()=>{
        const tomorrow = moment().add(1,'days').format('YYYY-MM-DD')
        const today = moment().format('YYYY-MM-DD')
        if(moment(tomorrow).isSame(pendInfo.dueDate)||moment(today).isSame(pendInfo.dueDate)){
            setManana(true)
        }
    },[])
    return (
        <Card className={`${style.card} ${manana?style.manana:''}`}>
            <span onClick={()=>handler(index)} className={style.close}>&times;</span>
            <h3>{pendInfo.priority}</h3>
            <p>{pendInfo.text}</p>
            <Select defaultValue={info.status} onChange={(statVal)=>{
                
                setPendInfo({...pendInfo,status:statVal})
                setPendings((prevInfo)=>{

                    var items = prevInfo
                    const {id,text,priority,status=statVal} = items[index] 
                    items[index].status = statVal
                    return items                    
                })
                if(statVal===1){

                    return setCounters({active:counters.active-1,done:counters.done+1})
                }
            }}>
                {allStatus.map((stat,i)=>{
                    return <Select.Option key={i} value={i}>{stat}</Select.Option>
                })}
            </Select>
            <hr/>
            <span>{pendInfo.dueDate}</span>
        </Card>
        
    )
}

export default PendingDetail