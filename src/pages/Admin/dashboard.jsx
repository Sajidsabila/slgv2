import AdminLayout from "../../layout/admin-layout"

const Dashboard = () => {
    return ( 
        <AdminLayout >
        <div className="bg-slate-700 h-15 rounded-lg text-xl text-white flex items-center p-4">
        Selamat Datang  {JSON.parse(localStorage.getItem("user"))?.value?.data?.full_name}


        </div>

        </AdminLayout>
    )
}
export default Dashboard