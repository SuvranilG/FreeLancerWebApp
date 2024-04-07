import React from 'react'

const MinMaxFilter = (props) => {
    // console.log(props);
  return (
    <div>
        <p>
          Explore the boundaries of art and technology with FreeLancer's Free Lancers
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={props.minRef} type="number" placeholder="min" />
            <input ref={props.maxRef} type="number" placeholder="max" />
            <button onClick={props.apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {props.sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => props.setOpen(!open)} />
            {props.open && (
              <div className="rightMenu">
                {props.sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
    </div>
    
  )
}

export default MinMaxFilter