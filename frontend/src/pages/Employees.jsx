import React, {useEffect, useState} from 'react'


export default function Employees(){
const [employees, setEmployees] = useState([])


useEffect(()=>{
// TODO: fetch('/api/employees')
setEmployees([])
},[])


return (
<div>
<h1 className="text-2xl font-bold mb-4">Employees</h1>
<div className="bg-white p-4 rounded-lg">
<table className="w-full text-left">
<thead>
<tr className="text-sm text-gray-500"><th>Name</th><th>Department</th><th>Role</th><th>Status</th><th>Actions</th></tr>
</thead>
<tbody>
{employees.length===0 && (
<tr><td colSpan={5} className="py-6 text-center text-gray-500">No employees yet</td></tr>
)}
</tbody>
</table>
</div>
</div>
)
}