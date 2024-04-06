import React, { useState , useRef} from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef("");

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };

  const handleSearch = () => {
    inputRef.current.focus();
  };

  const handleTabSearch=(e) => {
    // console.log(e);
    
    navigate(`/gigs?search=${e.target.innerText}`);
  };
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>
          <div className="search" onClick={handleSearch} >
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                ref={inputRef}
                type="text"
                placeholder='Try "building mobile app"'
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            {/* <button onClick={()=>navigate(`/gigs?search=Web Design`)}>Web Design</button> */}
            
            
            

            <button onClick={handleTabSearch}>Web Design</button>
            <button onClick={handleTabSearch} >Word Press</button>
            <button onClick={handleTabSearch}>Logo Design</button>
            <button onClick={handleTabSearch}>AI Services</button>
          </div>
        </div>
        <div className="right">
          <img src="./img/man.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
