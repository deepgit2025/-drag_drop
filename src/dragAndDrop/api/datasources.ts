import { api } from "./axiosInstance";


// -------- GET Calls --------

export const getDatasource = async (id:number) => {
  const res = await api.get(`/datasource${id}`);
  return res.data;
}

// -------- PATCH (update only changed fields) --------
export const updateDatasource = async (id:number, updates:any) => {
  const res = await api.patch(`/datasource${id}`, updates);
  return res.data;
};
