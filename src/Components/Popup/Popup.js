import React, { useContext, useEffect, useState } from "react";
import "../Popup/popup.css";
import { scheme } from "../../Components/Portfolio";
import axios from "axios";

const Popup = () => {
  const schemecode = useContext(scheme);
  const [state, setState] = useState();

  useEffect(async () => {
    const schemedetails = axios.get(`https://api.mfapi.in/mf/${schemecode}`);

    // console.log("prom", schemedetails);

    // console.log("details", schemedetailsjson.Object);
    setState(schemedetails);
  }, []);

  return (
    <div className="popup">
      <div className="inner_popup">
        <p>{schemecode}</p>
      </div>
    </div>
  );
};

export default Popup;
