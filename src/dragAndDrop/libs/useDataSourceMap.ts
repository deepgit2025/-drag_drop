import datasource1 from "./datasources/datasource1.json"
import datasource2 from "./datasources/datasource2.json"
import datasource3 from "./datasources/datasource3.json"
import datasource4 from "./datasources/datasource4.json"
import { useDatasource1,useDatasource2,useDatasource3,useDatasource4, useUpdateDatasource1 } from "../api/hooks/useDatasources";
import React from 'react'

const useDataSourceMap = () => {
  const ds1 = useDatasource1();
  const ds2 = useDatasource2();
  const ds3 = useDatasource3();
  const ds4 = useDatasource4();

  // ⛔ Don't build sourceMap until all queries have data
  if (ds1.isPending || ds2.isPending || ds3.isPending || ds4.isPending) {
    return null; // or [] or loading state
  }
  return [
    { name: "datasource1", source: ds1.data },
    { name: "datasource2", source: ds2.data },
    { name: "datasource3", source: ds3.data },
    { name: "datasource4", source: ds4.data },
  ];
};

export default useDataSourceMap;


//export default sourceMap;