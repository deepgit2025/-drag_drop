import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getDatasource, 
  updateDatasource, 
  addDroppedsource, 
  updateDroppedsource, 
  getDroppedsource 
} from "../datasources";

export const useAndUpdateDatasource = (id:any) => {
  const client = useQueryClient();
  const isDrop = id === "droppedComponents";

  const query = useQuery({
    queryKey: ["datasource", id],
    queryFn: () => isDrop ? getDroppedsource(id) : getDatasource(id),
    enabled: !!id,
    retry: false, // important for 404
  });
  const updateDropMutation = async (data:any) => {
    try {
      await getDroppedsource(data.id);
      return updateDroppedsource(data.id, data);
    } catch {
      return addDroppedsource(data);
    }
  };

  const update = useMutation({
    mutationFn: (data) =>
      isDrop
        ? updateDropMutation(data)
        : updateDatasource(id, data),

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["datasource", id] });
    },
  });

  return { ...query, update };
};


