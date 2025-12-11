import React,{useState} from "react";
import { useAndUpdateDatasource } from "../../api/hooks/useDatasources"; 
import { updateDatasource, updateDroppedsource } from "../../api/datasources";

const Layover = ({ id, data, onDataUpdate, name }) => {
  if (!data) return null;
  const datasourceid = data.name.slice(-1);
  const dsFields = useAndUpdateDatasource(datasourceid);
  const compName = name?.toLowerCase();   
  const compData = data?.source?.[compName];    
  const fields = compData?.props || {};    
  const [updatedFields, setupdatedFields] = useState(fields)
  if (!fields) return null;
 // let updatedFields : any = fields;
  const updateField = (key:any, value:any) => {
    setupdatedFields(prev=>{
      const newObj = { ...prev, [key]: value }; 
      return newObj;
    })
  };

  // const handleSave = () => {
  //   onDataUpdate({
  //     ...data,
  //     source: {
  //       ...data.source,
  //       [compName]: {
  //         ...data.source[compName],
  //         props: {
  //           ...updatedFields
  //         }
  //       }
  //     }
  //   });
  //   //update data
  //   console.log(data.source)
  //   dsFields.update.mutate(data.source);
  // };
  const handleSave = () => {
    const finalUpdatedObject = {
      ...data,
      source: {
        ...data.source,
        [compName]: {
          ...data.source[compName],
          props: {
            ...updatedFields,
          },
        },
      },
    };
    onDataUpdate(finalUpdatedObject);
  //  console.log(finalUpdatedObject.name)
    updateDroppedsource(datasourceid,finalUpdatedObject.source)
    // dsFields.update.mutate({
    //   id: datasourceid,
    //   data: finalUpdatedObject
    // });
  };
  return (
    <div className="layover fixed right-0 top-0 h-full w-80 bg-white shadow-xl p-4 overflow-y-auto border">
      <h2 className="text-lg font-semibold mb-4 capitalize">
        Edit {compName} properties
      </h2>

      {Object.keys(updatedFields).map((key) => {
        const value = updatedFields[key];

        // auto-determine input type
        const inputType =
          typeof value === "number"
            ? "number"
            : value?.includes("#")
            ? "color"
            : "text";

        return (
          <div key={key} className="flex flex-col gap-1 mb-3 items-center">
            <label className="text-sm font-medium text-gray-700 capitalize">
              {key}
            </label>

            <input
              type={inputType}
              value={value}
              onChange={(e) => updateField(key, e.target.value)}
              className="border rounded p-2 text-sm"
            />
          </div>
        );
      })}

      <button
        className="
            font-medium 
            rounded 
            transition 
            duration-200 
            shadow-sm
            hover:scale-[1.02]
            hover:shadow 
            active:scale-[0.98]
            hover-button
        "
        onClick={handleSave}
        style={{
            backgroundColor: "#2563eb", 
            color: "#ffffff",
            borderRadius: "8px",
            padding: "10px 20px",
            width: "100px",
            height: "40px",
            cursor:"pointer"
        }}
        >
        Save
        </button>
    </div>
  );
};

export default Layover;
