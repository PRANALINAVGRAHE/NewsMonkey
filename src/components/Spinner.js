import React from 'react'
import Ajaxloader from './Ajaxloader.gif';

const Spinner = () => {
    return (
      <div className="text-center">
        <img className="my-3" src= {Ajaxloader} alt='loading' />
      </div>
    )
}

export default Spinner

