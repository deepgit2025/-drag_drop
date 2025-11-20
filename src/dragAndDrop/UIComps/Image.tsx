import React, { useState, useEffect } from "react";
import useDataSourceMap from "../libs/useDataSourceMap";

const Image = ({ id, data, onDataUpdate }) => {
  const [selectedData, setSelectedData] = useState(data || {});
  const sourceMap = useDataSourceMap();
  // ✅ Sync local state when Canvas provides existing data
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setSelectedData(data);
    }
  }, [data]);

  // ✅ Handle datasource selection
  const handleDataChange = (value) => {
    const finalDatasource = sourceMap.find((ele) => ele.name === value);
    setSelectedData(finalDatasource);
    onDataUpdate && onDataUpdate(finalDatasource);
  };

  // ✅ Show dropdown if no data selected
  if (!selectedData.source) {
    return (
      <select onChange={(e) => handleDataChange(e.target.value)}>
        <option value="" hidden>
          Choose image datasource
        </option>
        <option value="datasource1">Datasource 1</option>
        <option value="datasource2">Datasource 2</option>
        <option value="datasource3">Datasource 3</option>
        <option value="datasource4">Datasource 4</option>
      </select>
    );
  }

  // ✅ Render image once datasource selected
  const { image } = selectedData.source;
  return (
    <img
      src={image.props.src}
      alt={image.props.alt}
      width={image.props.width}
      height={image.props.height}
      style={{
        borderRadius: image.props.borderRadius || "8px",
        objectFit: "cover",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        display: "block",
      }}
    />
  );
};

export default Image;
