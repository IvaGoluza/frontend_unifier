
import React from 'react';
import "./CheckBox.css"

const Options = () => {
   return (
      <div className="grid grid-rows-2">
         <div className="option">
            <input type="radio" id="jednokratna" name="akcija" />
            <label htmlFor="jednokratna"></label>
            <span className='pl-2'>Jednokratna opcija</span>
         </div>
         <div className="option">
            <input type="radio" id="dvokratna" name="akcija" />
            <label htmlFor="dvokratna"></label>
            <span className='pl-2'>Višekratna opcija</span>
         </div>
      </div>
   );
}

export default Options;
