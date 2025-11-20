import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDatasource1,
  getDatasource2,
  getDatasource3,
  getDatasource4,
  updateDatasource1,
  updateDatasource2,
  updateDatasource3,
  updateDatasource4,
} from "../datasources";

// ============ GET HOOKS ============
export const useDatasource1 = () =>useQuery({
    queryKey: ["datasource1"],
    queryFn: getDatasource1,
  });

export const useDatasource2 = () =>
  useQuery({
    queryKey: ["datasource2"],
    queryFn: getDatasource2,
  });

export const useDatasource3 = () =>
  useQuery({
    queryKey: ["datasource3"],
    queryFn: getDatasource3,
  });

export const useDatasource4 = () =>
  useQuery({
    queryKey: ["datasource4"],
    queryFn: getDatasource4,
  });

// ============ UPDATE HOOKS ============
export const useUpdateDatasource1 = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: updateDatasource1,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["datasource1"] });
    },
  });
};

export const useUpdateDatasource2 = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: updateDatasource2,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["datasource2"] });
    },
  });
};

export const useUpdateDatasource3 = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: updateDatasource3,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["datasource3"] });
    },
  });
};

export const useUpdateDatasource4 = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: updateDatasource4,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["datasource4"] });
    },
  });
};
