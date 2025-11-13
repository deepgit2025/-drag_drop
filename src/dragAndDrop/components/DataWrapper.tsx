// import React, {useState} from 'react'
// import sourceMap from '../libs/dataSourceMap';

// export default function DataWrapper(Component:any) {
//   const [selectedData, setSelectedData] = useState({});
//   const handleDataChange = (e:any)=>{
//     const finalDatasource:any = sourceMap.find(ele=>{
//       console.log(ele.name, e)
//       return ele.name == e
//     })
//     setSelectedData(finalDatasource);
//   }
//   return function Enhanced(props:any){
//     return <Component selectedData = {selectedData} setSelectedData = {setSelectedData} handleDataChange = {handleDataChange}  {...props}/>
//   }
// }
