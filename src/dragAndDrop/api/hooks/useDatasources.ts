import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDatasource, updateDatasource } from "../datasources";

export const useAndUpdateDatasource = (id) => {
  const client = useQueryClient();

  const query = useQuery({
    queryKey: ["datasource", id],
    queryFn: () => getDatasource(id),
    enabled: !!id,
  });

  const update = useMutation({
    mutationFn: ( data ) => updateDatasource(id, data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["datasource", id] });
    },
  });

  return { ...query, update };
};

