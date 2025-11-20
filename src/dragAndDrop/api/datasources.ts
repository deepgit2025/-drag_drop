import { api } from "./axiosInstance";

// -------- GET Calls --------
export const getDatasource1 = async () => {
  const res = await api.get("/datasource1");
  return res.data;
};

export const getDatasource2 = async () => {
  const res = await api.get("/datasource2");
  return res.data;
};

export const getDatasource3 = async () => {
  const res = await api.get("/datasource3");
  return res.data;
};

export const getDatasource4 = async () => {
  const res = await api.get("/datasource4");
  return res.data;
};

// -------- PATCH (update only changed fields) --------
export const updateDatasource1 = async (updates) => {
  const res = await api.patch("/datasource1", updates);
  return res.data;
};

export const updateDatasource2 = async (updates) => {
  const res = await api.patch("/datasource2", updates);
  return res.data;
};

export const updateDatasource3 = async (updates) => {
  const res = await api.patch("/datasource3", updates);
  return res.data;
};

export const updateDatasource4 = async (updates) => {
  const res = await api.patch("/datasource4", updates);
  return res.data;
};
