import React, { useEffect, useState } from "react"
import axios from 'axios'
import '../App.css';
import { Table} from 'antd';
import 'antd/dist/antd.css';


const CenterList = ({history}) => {

          if(!localStorage.getItem('date') || !localStorage.getItem('pinCode')){
               history.push('/')
          }

          const [centers, setCenters] = useState(()=>[])
          const [date, setDate] = useState(()=>"")
          const [loading, setLoading] = useState(()=>true)

          useEffect(()=>{

                    let date = localStorage.getItem('date');
                    let pincode = localStorage.getItem('pinCode');
                   
                    let spdate = date.split("-");
                    let d = spdate[2]+"-"+spdate[1]+"-"+spdate[0];
                    
                    setDate(d);

                    let data; 

                    axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${d}`)
                    .then((res)=>{
                              createTableData(res.data.sessions)
                    })
                    .catch((err)=>{
                        console.log(err);
                    })



          }, [])

          const createTableData = (data) => {
                
                    let tdata = [];

                    for(let i =0; i<data.length; ++i){
                          
                              

                             

                              let address = data[i].address+", "+ data[i].block_name+", "+data[i].district_name+", "+data[i].state_name+", Pin: "+data[i].pincode;

                           tdata.push({
                                   cid: data[i].center_id,
                                   name: data[i].name,
                                   address: address,
                                   from: data[i].from,
                                   to: data[i].to,
                                   date: data[i].date,
                                   acty: data[i].available_capacity,
                                   actyd1: data[i].available_capacity_dose1,
                                   actyd2: data[i].available_capacity_dose2,
                                   minage: data[i].min_age_limit,
                                   vaccine: data[i].vaccine,
                                   fees: data[i].fee,
                                   tslots: <ul>
                                              {data[i].slots.map((e)=>{
                                                        return (<li>{e}</li>)
                                              })}
                                           </ul>
                           })   
                    }

                    setCenters(tdata);
                    setLoading(false);
          }

          const columns = [
                    {
                      title: 'Center Id',
                      dataIndex: 'cid',
                      key: 'cid',
                    },
                    {
                      title: 'Name',
                      dataIndex: 'name',
                      key: 'name',
                    },
                    {
                      title: 'Address',
                      dataIndex: 'address',
                      key: 'address',
                      width: "15%"
                    },
                    {
                              title: 'From',
                              dataIndex: 'from',
                              key: 'from',
                            },
                            {
                              title: 'To',
                              dataIndex: 'to',
                              key: 'to',
                            },
                            {
                              title: 'Available Capacity',
                              dataIndex: 'acty',
                              key: 'acty',
                            },
                            {
                              title: 'Available Capacity(Dose 1)',
                              dataIndex: 'actyd1',
                              key: 'actyd1',
                            },
                            {
                              title: 'Available Capacity(Dose 2)',
                              dataIndex: 'actyd2',
                              key: 'actyd2',
                            },
                            {
                              title: 'Minimum Age',
                              dataIndex: 'minage',
                              key: 'minage',
                            },
                            {
                              title: 'Vaccine',
                              dataIndex: 'vaccine',
                              key: 'vaccine',
                            },
                            {
                              title: 'Fees',
                              dataIndex: 'fees',
                              key: 'fees',
                            },
                            {
                              title: 'Time Slots',
                              dataIndex: 'tslots',
                              key: 'tslots',
                              width: "10%"
                            },



                  ];

               

          return(
                   <>
                   <div style={{backgroundColor: "#282c34", height: " 100vh"}}>
                   <h4 style={{padding: "2%", textAlign: "center", color: "white", fontFamily: "monospace"}}>Vaccination Center List ({date})</h4>
                   <Table loading={loading}  bordered dataSource={centers} columns={columns} />  
                   </div>
                   </>               
                   
          );
}

export default CenterList;