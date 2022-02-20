/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { useState } from "react";
import style from './NewAPI.module.scss'
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helper/authContext"
import Navbar from "../../components/Navbar/Navbar";
import { BASE_API_URL } from "../../utils/Constants";

function NewAPI() {

    const { setAuthState } = useContext(AuthContext);


    let history = useNavigate();
    const [name, setname] = useState();
    const [url, seturl] = useState();
    const [desc, setdesc] = useState();
    const [endpoint, setendpoint] = useState();

    function handleChange(e) {
        if (e.target.name == "name") setname(e.target.value);
        if (e.target.name == "url") seturl(e.target.value);
        if (e.target.name == "desc") setdesc(e.target.value);
        if (e.target.name == "endpoint") setendpoint(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const obj = {
            header: sessionStorage.getItem("accessToken"),
            name: name,
            url: url,
            desc: desc,
            endpoint:endpoint,
            IsPublish: false,
        }
        console.log(obj);
        axios.post(`${BASE_API_URL}/new-api`, obj,)
            .then(res => {
                if (res.data.message) alert(res.data.message);
                else {
                    history('/')
                    history("/my-apis");
                }
            })
            .catch(err => {
                alert("error in signup: ", err);
            });
    }

    return (
        <>
            <Navbar />
            <div className={style.main_block}>
                <h1>ADD New API</h1>
                <form onSubmit={handleSubmit}>
                    <input className={style.forinput} type="text" name="name" id="name" placeholder="API Name" onChange={handleChange} />
                    <input className={style.forinput} type="text" name="url" id="url" placeholder="API Image Url" onChange={handleChange} />
                    <input className={style.forinput} type="text" name="endpoint" id="endpoint" placeholder="API Endpoint" onChange={handleChange} />
                    {/* <input type="text" name="desc" id="desc" placeholder="Description" onChange={handleChange} /> */}
                    <textarea className={style.fortextarea} type="text" name="desc" id="desc" placeholder="Description" onChange={handleChange} rows="4" cols="50">
                    
                    </textarea>
                    <div className={style.btn_block}>
                        <button type="submit">Add API</button>
                    </div>
                </form>

            </div >
        </>

    )

}

NewAPI.propTypes = {};

export default NewAPI;