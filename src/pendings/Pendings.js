import {useEffect, useState} from 'react'
import 'antd/dist/antd.css';
import style from './pendings.module.css' 
import { Row, Col, Card, Modal, Input, Select, Layout,DatePicker, Alert } from 'antd';
import PendingDetail from './PendingDetail'
import moment from 'moment'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Pendings = ()=>{
    const {Content} = Layout
    const [counters,setCounters] = useState({active:4,done:0})
    const [showModal,setShowModal] = useState(0)
    const [pendings,setPendings] = useState([
        {
            priority:"",
            text:"",
            status:0,
            id:"addPending",
            dueDate:''
        },
        {
            priority:"High",
            text:"Make a platform based on flexbox",
            status:0,
            id:'1',
            dueDate:'2022-06-17'
        },
        {
            priority:"Low",
            text:"Make a platform based on css",
            status:0,
            id:'2',
            dueDate:'2022-06-18'
        },
        {
            priority:"Middle",
            text:"Make a platform based on ReactJS",
            status:0,
            id:'3',
            dueDate:'2022-06-16'
        },
        {
            priority:"Low",
            text:"Make a platform based on React Native",
            status:0,
            id:'4',
            dueDate:'2022-06-16'
        }
    ])
    const addPending = ()=>{
        setShowModal(1)
    }
    const [priority, setPriority] = useState('')
    const [status, setStatus] = useState(0)
    const [text, setText] = useState('')
    const [date, setDate] = useState('')
    const [errors, setErrors] = useState(false)
    
    const handleOk = ()=>{
        
        let number = Math.floor(Math.random()*100000)
        const newData = {text,status,priority,id:`x${number}${pendings.length}`,dueDate:date}
        const exist = pendings.filter((pen)=>pen.text.trim()===text.trim()?true:false)
        if(exist.length){
            setErrors(true)
            return
        }
        setErrors(false)
        if(status===1){
            setCounters({active:counters.active,done:counters.done+1})
        }
        if(status===0){
            setCounters({active:counters.active+1,done:counters.done})
        }
        setPendings([...pendings,newData])
    }

    const handleCancel = ()=>{
        setShowModal(0)
    }
    const deletePending = (i)=>{
        if(pendings[i].status===0){
            setCounters({done:counters.done,active:counters.active-1})
        }
        if(pendings[i].status===1){
            setCounters({done:counters.done-1,active:counters.active})
        }
        setPendings(pendings.filter((it,e)=>{
            if(i===e){
                it.status = 2
            }
            return it.status!==2
        }))
    }
    const {Option} = Select

    const dragEndHandler = (result)=>{
        if(!result.destination)return
        const items = pendings
        const dropItem = pendings[result.source.index]

        items.splice(result.source.index,1)
        items.splice(result.destination.index,0,dropItem)

        setPendings(items)

    }
    const [asc,setSort] = useState(0)
    const sortPendings=()=>{
        const items = pendings.sort((a,b)=>{
            return !asc?new Date(b.dueDate) - new Date(a.dueDate):new Date(a.dueDate) - new Date(b.dueDate);
        })
        setSort(!asc)
        setPendings(items)
    }
    return(
        <Content>
            <Row gutter={[16, 16]} className={style.rowMargin}>
                <Col span={24}>
                    <button className={style.sortPendings} onClick={sortPendings}>Order date {asc?'ASC':'DESC'}</button>
                </Col>
            </Row>
            <Row gutter={[16, 16]} className={style.rowMargin}>
                <DragDropContext onDragEnd={dragEndHandler}>
                    <Droppable droppableId='pendings'>
                            
                        {(provided)=>{
                            let iter = 0;
                            return (<div className={`ant-row ${style.fixedrow}`}
                                ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                            
                            {pendings.map((pending,index)=>{

                                return pending.status===0?
                                    <Draggable className={'ant-col ant-col-6'} key={pending.id} draggableId={pending.id} index={index}>
                                        
                                        {(provided)=>{
                                            if(pending.id==='addPending'){
                                                return(
                                                    <Col span={6} key={pending.id} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <Card className={`${style.card}`} onClick={addPending}><div className={style.crossed}></div></Card>
                                                    </Col>  
                                                )
                                            }else{
                                            return(
                                                
                                                <Col span={6} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                    <PendingDetail   counters={counters} setPendings ={setPendings} setCounters={setCounters} info={pending} index={index} handler={deletePending}/>
                                                </Col>
                                                )
                                            }
                                        }}
                                    </Draggable>
                                :''
                            })}
                            {provided.placeholder}
                            </div>)
                        }}
                    </Droppable>
                </DragDropContext>
                <Modal title="Add pending" visible={showModal} onOk={handleOk} onCancel={handleCancel}>
                    <Input addonBefore={'Priority: '} onChange={(e)=>{
                        setPriority(e.target.value)
                    }} />
                    <Input addonBefore={'Text: '} onChange={(e)=>{
                        setText(e.target.value)
                    }} />
                    <Select defaultValue={0} onChange={(e)=>{
                        setStatus(e.target.value)
                    }}>
                        <Option value={0}>Active</Option>
                    </Select>
                    <DatePicker onChange={(date,stringdate)=>{
                        setDate(stringdate)
                    }} />
                    {errors?<Alert
                        message="The pending is already created."
                        type="error"
                        closable
                        />:''}
                </Modal>
            </Row>
            <Row className={style.rowMargin}>
                <Col span={6}>
                </Col>
                <Col span={6}>
                    Active {counters.active}
                </Col>
                <Col span={6}>
                </Col>
                <Col span={6}>
                    Done {counters.done}
                </Col>
            </Row>
        </Content>
    )
}

export default Pendings