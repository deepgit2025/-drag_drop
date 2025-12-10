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

// -------- GET Calls --------

export const getDroppedsource = async (id:number) => {
  const res = await api.get(`/droppedComponents`);
  return res.data;
}

// -------- PATCH (update only changed fields) --------
export const updateDroppedsource = async (id:number, updates:any) => {
  const res = await api.patch(`/droppedComponents/${id}`, updates);
  return res.data;
};

// -------- PATCH (update only changed fields) --------
export const addDroppedsource = async (updates:any) => {
  const res = await api.post(`/droppedComponents`, updates);
  return res.data;
};

export const deleteDroppedSource = async (id: string) => {
  const res = await api.delete(`/droppedComponents/${id}`);
  return res.data;
};