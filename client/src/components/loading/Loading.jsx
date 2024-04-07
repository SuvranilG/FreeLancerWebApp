import React from 'react';
import "./Loading.scss"
import MinMaxFilter from '../minMaxFilter/MinMaxFilter';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css'
const Loading = ({isLoading}) => {
  return (
    <div className='loader-container'>
      {/* <div>
        <Skeleton count={1} base-color="#202020" highlight-color="#444" />
      </div> */}
      <MinMaxFilter/>
      {isLoading &&
      <div className='flex'>
        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <span className='textLoading'>Loading...</span>
      </div>
      }
    </div>
  )
}

export default Loading