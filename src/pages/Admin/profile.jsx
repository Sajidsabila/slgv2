import AdminLayout from "../../layout/admin-layout";

const Profile = () => {
    const roles = JSON.parse(sessionStorage.getItem("user"))?.roles;
    console.log(roles);
    return(
        <AdminLayout>
            <div className="flex items-center justify-center h-100 pt-20">
                <div className="w-90 h-auto bg-white border-2 border-slate-100 shadow-lg rounded-xl">
                <div className="bg-slate-800 text-white px-6 py-3 font-semibold">
                  Profile User
                </div>
                <div className="flex flex-col pt-4 px-3 gap-1">
                <div className="mb-1 w-full">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2 fw-bold">Name</label>
                    <input 
                        readOnly
                        type="text" 
                        id="name" 
                        value={JSON.parse(sessionStorage.getItem("user"))?.full_name || ""}
                        placeholder="Enter your name" 
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4 w-full">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2 fw-bold" >Email</label>
                    <input 
                         readOnly
                        type="email" 
                        id="email" 
                        value={JSON.parse(sessionStorage.getItem("user")).email || ""}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4 w-full">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2 fw-bold" >Phone</label>
                    <input 
                         readOnly
                        type="email" 
                        id="email" 
                        value={JSON.parse(sessionStorage.getItem("user"))?.mobile_no || ""}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4 w-full">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2 fw-bold" >Roles</label>
                  <div className="flex flex-wrap gap-3">
                            {roles.length > 0 ? (
                                    roles.map((role, index) => (
                                        <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-gray-400 border border-gray-500">{role.role}</span>
                                    ))
                                ) : (
                                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">Tidak Ada</span>
                                )}
                  </div>
                   
                </div>
            </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Profile;
