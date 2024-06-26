import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
import MinMaxFilter from "../../components/minMaxFilter/MinMaxFilter";
import Loading from "../../components/loading/Loading";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);


  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>      
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        })
        
    
  });

  // console.log(data);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort,search]);

  const apply = () => {
  console.log(search);

    refetch();

  };



  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">FreeLancer. {">"} {`${searchParams.get('search')}`} {'>'}</span>
        {/* <h1>AI Artists</h1> */}
        <p>
          Explore the boundaries of art and technology with FreeLancer's Free Lancers
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        {/* <MinMaxFilter sort={sort} apply={apply} reSort={reSort} refetch={refetch} setOpen={setOpen} setSort={setSort} open={open} minRef={minRef} maxRef={maxRef}  /> */}
        <div className={isLoading?"center":"cards"}>
          {isLoading
            ? <Loading/>
            : error
            ? "Something went wrong!"
            : data?.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
