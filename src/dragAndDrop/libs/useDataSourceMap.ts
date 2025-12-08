import { useAndUpdateDatasource } from "../api/hooks/useDatasources";
import React from 'react';

const useDataSourceMap = () => {
  const ds1 = useAndUpdateDatasource(1);
  const ds2 = useAndUpdateDatasource(2);
  const ds3 = useAndUpdateDatasource(3);
  const ds4 = useAndUpdateDatasource(4);

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