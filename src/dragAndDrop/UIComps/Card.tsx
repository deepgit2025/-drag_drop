// import React, { useState } from "react";
// import sourceMap from "../libs/dataSourceMap";

// const Input: React.FC = () => {
//   const [selectedData, setSelectedData] = useState({});

//   const handleDataChange = (e: any) => {
//     const finalDatasource: any = sourceMap.find((ele) => {
//       console.log(ele.name, e);
//       return ele.name === e;
//     });
//     setSelectedData(finalDatasource);
//   };

//   return (
//     <>
//       {selectedData && Object.values(selectedData).length > 0 ? (
//         <input
//           type={selectedData.source.input.props.type || "text"}
//           placeholder={selectedData.source.input.props.placeholder}
//           defaultValue={selectedData.source.input.props.defaultValue}
//           style={{
//             border: selectedData.source.input.props.border,
//             borderRadius: selectedData.source.input.props.borderRadius,
//             padding: selectedData.source.input.props.padding,
//             width: selectedData.source.input.props.width,
//             color: selectedData.source.input.props.textColor,
//             backgroundColor: selectedData.source.input.props.bgColor,
//           }}
//           className="focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       ) : (
//         <select
//           name="datasources"
//           id="datasources"
//           onChange={(e) => handleDataChange(e.target.value)}
//         >
//           <option value="" selected disabled hidden>
//             Choose input datasource
//           </option>
//           <option value="datasource1">Datasource 1</option>
//           <option value="datasource2">Datasource 2</option>
//           <option value="datasource3">Datasource 3</option>
//           <option value="datasource4">Datasource 4</option>
//         </select>
//       )}
//     </>
//   );
// };

// export default Input;

import React, { useState, useEffect } from "react";
import sourceMap from "../libs/dataSourceMap";

const Card = ({ id, data, onDataUpdate }) => {
  const [selectedData, setSelectedData] = useState(data || {});

  // ✅ Keep in sync with Canvas updates
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setSelectedData(data);
    }
  }, [data]);

  // ✅ When datasource changes
  const handleDataChange = (value) => {
    const finalDatasource = sourceMap.find((ele) => ele.name === value);
    setSelectedData(finalDatasource);
    onDataUpdate && onDataUpdate(finalDatasource); // notify Canvas
  };

  // ✅ If no datasource selected, show dropdown
  if (!selectedData.source) {
    return (
      <select onChange={(e) => handleDataChange(e.target.value)}>
        <option value="" hidden>
          Choose card datasource
        </option>
        <option value="datasource1">Datasource 1</option>
        <option value="datasource2">Datasource 2</option>
        <option value="datasource3">Datasource 3</option>
        <option value="datasource4">Datasource 4</option>
      </select>
    );
  }

  // ✅ Render the actual card once datasource selected
  const { card } = selectedData.source;
  return (
    <div
      style={{
        backgroundColor: card.props.backgroundColor,
        borderRadius: card.props.borderRadius || "8px",
        padding: card.props.padding || "12px",
        textAlign: card.props.textAlign || "left",
        boxShadow: card.props.boxShadow || "0 2px 6px rgba(0,0,0,0.1)",
        width: card.props.width || "250px",
        height: card.props.height || "auto",
        border: card.props.border || "1px solid #e5e7eb",
      }}
    >
      <h3
        style={{
          fontWeight: "600",
          color: "#111827",
          marginBottom: "8px",
        }}
      >
        {card.props.title}
      </h3>
      <p style={{ color: "#374151", fontSize: "14px" }}>
        {card.props.description}
      </p>
    </div>
  );
};

export default Card;
