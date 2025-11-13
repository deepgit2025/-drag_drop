// import React, { useEffect, useState } from "react";
// import sourceMap from "../libs/dataSourceMap"


// const Button: React.FC = ({droppedItems, setDroppedItems}) => {
//   //const selectedData = {}
//   // Object.values(selectedData).length
//  const [selectedData, setSelectedData] = useState({});
//   const handleDataChange = (e:any)=>{
//     const finalDatasource:any = sourceMap.find(ele=>{
//       console.log(ele.name, e)
//       return ele.name == e
//     })
//     setSelectedData(finalDatasource);
//   }
//   //update and check if component is already inside dropped widget
//   //check
//   // useEffect(()=>{
//   //   if(droppedItems) set
//   // },droppedItems)

//   return (
//     <>
//     {selectedData && Object.values(selectedData).length > 0 ?
//     <button
//       style={{
//         backgroundColor: selectedData.source.button.props.color,
//         color: selectedData.source.button.props.textColor,
//         borderRadius: selectedData.source.button.props.borderRadius,
//         padding: selectedData.source.button.props.padding,
//         boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
//         transition: "background-color 0.3s ease"
//       }}
//       onMouseEnter={(e) =>
//         (e.currentTarget.style.backgroundColor = "#1d4ed8")
//       }
//       onMouseLeave={(e) =>
//         (e.currentTarget.style.backgroundColor =
//           selectedData.source.button.props.color)
//       }
//     >
//       {selectedData.source.button.props.text}
//     </button>:
//     <select name="datasources" id="datasources" onChange={(e)=>handleDataChange(e.target.value)}>
//       <option value="" selected disabled hidden>Choose here</option>
//       <option value="datasource1">Datasource 1</option>
//       <option value="datasource2">Datasource 2</option>
//       <option value="datasource3">Datasource 3</option>
//       <option value="datasource4">Datasource 4</option>
//     </select>
//     }
//     </>
//   );
// };

// export default Button

import React, { useState, useEffect } from "react";
import sourceMap from "../libs/dataSourceMap";

const Button = ({ id, data, onDataUpdate }) => {
  const [selectedData, setSelectedData] = useState(data || {});

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setSelectedData(data);
    }
  }, [data]);

  const handleDataChange = (value) => {
    const finalDatasource = sourceMap.find((ele) => ele.name === value);
    setSelectedData(finalDatasource);
    onDataUpdate && onDataUpdate(finalDatasource); 
  };

  if (!selectedData.source) {
    return (
      <select onChange={(e) => handleDataChange(e.target.value)}>
        <option value="" hidden>
          Choose datasource
        </option>
        <option value="datasource1">Datasource 1</option>
        <option value="datasource2">Datasource 2</option>
        <option value="datasource3">Datasource 3</option>
        <option value="datasource4">Datasource 4</option>
      </select>
    );
  }

  return (
    <button
      style={{
        backgroundColor: selectedData.source.button.props.color,
        color: selectedData.source.button.props.textColor,
        borderRadius: selectedData.source.button.props.borderRadius,
        padding: selectedData.source.button.props.padding,
      }}
    >
      {selectedData.source.button.props.text}
    </button>
  );
};

export default Button;
