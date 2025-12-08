export const updateDatasource = async ( key, data) => {
  const res = await fetch(`http://localhost:5001/${key}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  console.log(res.json())
  return res.json();
};