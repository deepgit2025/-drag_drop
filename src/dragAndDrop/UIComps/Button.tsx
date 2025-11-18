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
