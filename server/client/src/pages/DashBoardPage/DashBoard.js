/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import BigTile from '../../components/BigTile/BigTile'
import axios from 'axios'
import Card from '../../components/Card/Card';
import style from './DashBoard.module.scss'

import { BASE_API_URL } from '../../utils/Constants';
// import {useLocation} from 'react-router-dom';
// eslint-disable-next-line no-unused-vars


import {  useEffect } from 'react'
function DashBoard() {
  
     const [allapi,setallapi]= useState([]);

     useEffect(()=>{
       axios.get(`${BASE_API_URL}/allapi`)
       .then((res) => {
         
         setallapi(res.data);
        //  seaa
       });
     },[])     

  return <div>
      < Navbar />
      <BigTile />
      <div className={style.margindede}>
      <h3>ALL APIs</h3>
      </div>
      <div className={style.parent}>
        {allapi.map((item,index) =>(
          item.IsPublish && <Card key ={index} endpoint= {item.endpoint} name={item.name} image={item.url} description={item.desc} className={style.child} />
        ))
        }
      </div>

  </div>;
}

DashBoard.propTypes = {};

export default DashBoard;
