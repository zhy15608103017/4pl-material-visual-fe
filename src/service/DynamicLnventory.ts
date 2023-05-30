import request from '@/utils/request';
const baseUrl = "/juslink-4pl-material-visual-service";
export default async function  fetchData(datas:any){

    // const data = await request.get(`https://sccpdev.jus-link.com/dynamic-inventory-micro-app/juslink动态库存.xlsx`, {responseType:'arrayBuffer'})
    // let book = XLSX.read(new Uint8Array(data),{ type:'array',cellDates:true })
    // let rows = XLSX.utils.sheet_to_json(book.Sheets['Sheet1'])

    
    // return rows
    const {materialNo,...parms}=datas
    if(parms?.warehouseNoEq==="全部")delete parms.warehouseNoEq
    return request(`${baseUrl}/materials/${materialNo}/dynamic-inventories`, {
        method: 'POST',
        data:parms
     
    });
}
export async function getWarehouse(materialNo:string){
    return request(`${baseUrl}/materials/${materialNo}/warehouses`, {
        method: 'get',
     
    });
}
 