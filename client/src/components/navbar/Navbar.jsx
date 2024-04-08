import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";
import Cookies from 'js-cookie';



function Navbar() {
  // console.log(Cookies.get("http://localhost:5173"));
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  // const [n, forceUpdate] = useState(0);  
  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleTabSearchNav=(e) => {
    // console.log(e.target.innerText);
    navigate(`/gigs?search=${e.target.innerText}`) ;
    
    // forceUpdate(n + 1);  
    
  };

  // useEffect(()=>{  
  //   setTimeout(()=>{
  //     navigate(`/gigs?search=${searchTerm}`) ;  
  //   },10); 
  // },[n]) 

  useEffect(()=>{
    setOpen(false); 
  },[pathname]) 

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container" >
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">FreeLancer</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>FreeLancer Business</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        My Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">Sign in</Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <div className="link menuLink" onClick={handleTabSearchNav}>
             Graphics & Design
            </div>
            <div className="link menuLink" onClick={handleTabSearchNav}>
              Video & Animation 
            </div>
            <div className="link menuLink" onClick={handleTabSearchNav}>
              Web Development
            </div>
            <div className="link menuLink" onClick={handleTabSearchNav}>
              AI Services
            </div>
            <div className="link menuLink" onClick={handleTabSearchNav}>
              Digital Marketing
            </div>
            <div className="link menuLink" onClick={handleTabSearchNav}>
              Music & Audio
            </div>
            <div className="link menuLink" onClick={handleTabSearchNav}>
              Programming & Tech
            </div>
            <div className="link menuLink" onClick={handleTabSearchNav}>
              Business
            </div>
            <div className="link menuLink" onClick={handleTabSearchNav}>
              Lifestyle
            </div>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
