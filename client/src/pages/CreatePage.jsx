import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/htttp.hook";
import {AuthContext} from "../context/AuthContext";

const CreatePage = () => {
    const {request} = useHttp();
    const auth = useContext(AuthContext);
    const [link, setLink] = useState("");

    useEffect(()=>{
        window.M.updateTextFields();
    },[]);

    const pressHandler = async (event) => {

        if(event.key === "Enter"){
          try {
            const data = await request("/api/link/generate", "POST", {from: link}, {
                Authorization: `Bearer ${auth.token}`
            });

            console.log("DATA: ", data);
          } catch (e) {

          }
        }
    };

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: "2rem"}}>
                <div className="input-field">
                    <input placeholder="Paste link"
                           id="link"
                           type="text"
                           value={link}
                           onChange={e => setLink(e.target.value)}
                           onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Type link</label>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;