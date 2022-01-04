import React, { useEffect, useState, createContext } from "react";
import Popup from "./Popup/Popup";
import axios from "axios";

const scheme = createContext();

const Portfolio = () => {
  const [state, setState] = useState();
  const [search, setSearch] = useState([]);
  const [update, setUpdate] = useState({
    unit: 1,
    schemecode: null,
    popup: false,
  });

  const [scheme, setScheme] = useState();

  useEffect(async () => {
    const mf = await fetch(`https://api.mfapi.in/mf/search?q=${state}`);
    const jsonmf = await mf.json();
    setSearch(jsonmf);
  }, [state]);

  useEffect(async () => {
    const schemedetails = axios.get(
      `https://api.mfapi.in/mf/${update.schemecode}`
    );
    setScheme(schemedetails);
  }, [update]);

  const handleUserSearch = (e) => {
    setState(e.target.value);
  };

  return (
    <>
      <div className="main">
        <div className="navbar">
          <h1 className="heading">Mutual Fund Store</h1>
        </div>
        <div className="content_container">
          <div className="search_container">
            <input
              type="text"
              className="search"
              placeholder="Search"
              onChange={handleUserSearch}
              value={state}
            />
          </div>
        </div>
      </div>

      {search.map((value, index) => {
        console.log("Value", value.schemeCode);
        return (
          <>
            <p className="search_results">
              <a
                key={index}
                href="#"
                onClick={() => {
                  setUpdate(() => {
                    return {
                      schemecode: value.schemeCode,
                      popup: !update.popup,
                    };
                  });
                }}
              >
                {value.schemeName}
                {value.schemeCode}
              </a>
              <span className="total_unit_container">
                <a
                  key={index}
                  href="#"
                  onClick={() => {
                    setUpdate(() => {
                      if (index == index) {
                        return {
                          unit: update.unit - 1,
                        };
                      }
                    });
                  }}
                  className="operation"
                >
                  -
                </a>
                <span>{update.unit} Unit</span>
                <a
                  href="#"
                  onClick={() => {
                    setUpdate(() => {
                      if (index == index) {
                        return {
                          unit: update.unit + 1,
                        };
                      }
                    });
                  }}
                  key={index}
                  className="operation"
                >
                  +
                </a>
              </span>
            </p>
          </>
        );
      })}
      {update.popup ? (
        <div className="units_container">
          <div className="units">
            <div className="fund_container">
              <div className="fund_name">Fund Name</div>
              <div className="scheme">
                <p className="scheme_category">Scheme Category</p>
                <p className="scheme_type">Scheme Type</p>
              </div>
              <div className="fund_house">Fund House</div>
              <div className="nav">Nav</div>
              <div className="available_units">Available Units</div>
              <div className="buy_sell_btns">
                <a className="buy">Buy</a>
                <a className="sell">Sell</a>
              </div>
            </div>
            <div className="close">
              <a
                href="#"
                onClick={() => {
                  setUpdate(() => {
                    return {
                      popup: !update.popup,
                    };
                  });
                }}
              >
                Close
              </a>
            </div>
          </div>
        </div>
      ) : null}

      <div className="footer"></div>
    </>
  );
};

export default Portfolio;
export { scheme };
