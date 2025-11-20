import React, { useState, useEffect } from "react";
import useDataSourceMap from "../libs/useDataSourceMap";

const Text = ({ id, data, onDataUpdate }) => {
  const [selectedData, setSelectedData] = useState(data || {});
  const sourceMap = useDataSourceMap();
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
          Choose text datasource
        </option>
        <option value="datasource1">Datasource 1</option>
        <option value="datasource2">Datasource 2</option>
        <option value="datasource3">Datasource 3</option>
        <option value="datasource4">Datasource 4</option>
      </select>
    );
  }
  const { text } = selectedData.source;

  return (
    <div
      style={{
        backgroundColor: text.props.bgColor || "transparent",
        padding: text.props.padding || "12px",
        borderRadius: text.props.borderRadius || "8px",
        textAlign: text.props.alignment || "left",
        color: text.props.color || "#000",
        fontSize: text.props.fontSize || "16px",
        fontWeight: text.props.fontWeight || "400",
      }}
    >
      {text.props.title && (
        <h4 style={{ marginBottom: "4px" }}>{text.props.title}</h4>
      )}
      <p>{text.props.content}</p>
    </div>
  );
};

export default Text;
