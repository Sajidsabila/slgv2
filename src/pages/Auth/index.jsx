import { useState } from "react";
import { urlLink } from "../../config/config";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setIsLoading] = useState(false)
    const headers = { "Content-Type": "application/x-www-form-urlencoded" };
    const localStorageExpired = (key, value, ttl) => {
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + ttl,
        };
        localStorage.setItem(key, JSON.stringify(item));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        setError(null);

        if (!email || !password) {
            setIsLoading(false);
            setError("Email dan Password tidak boleh kosong");
            return;
        }

        try {
            const response = await fetch(`${urlLink.url}/api/method/login`, {
                method: "POST",
                headers: headers,
                body: new URLSearchParams({ usr: email, pwd: password }),
                credentials: "include", 
            });
            const data = await response.json();
            if(!response.ok){
                setIsLoading(false)
                throw new Error(data.message);
         
            }
           const getLoggedUser = await fetch(`${urlLink.url}/api/method/frappe.auth.get_logged_user`, {
                 method: "POST",
                 credentials: "include",

                 headers: headers,
                 mode: "cors",
           });
            const user = await  getLoggedUser.json();
            const userData = await fetch(`${urlLink.url}/api/resource/User/${user.message}`, {
                     method: "GET",
                     credentials: "include",
                     headers: headers,
                     mode: "cors",
                 });
                 const dataUser = await userData.json();
                 const getUser = {
                    full_name: dataUser.data.full_name,
                    user_image: dataUser.data.user_image,
                    email: dataUser.data.email,
                    roles: dataUser.data.roles,
                    mobile_no: dataUser.data.mobile_no,
                };
                
                 const roles = Array.isArray(dataUser.data.roles) ? dataUser.data.roles : [];
                 const isInstructor = roles.some(roleObj => roleObj.role === "Instructor" || "Education Manager");
                 if (!isInstructor) {
                     localStorage.clear();
                     setIsLoading(false)
                     throw new Error("Username dan Password Salah")
                 } 
                   
                     localStorageExpired("user", getUser, 7200000);
                     window.location.href = "/admin";
        } catch (err) {
            setError(err.message || "Terjadi kesalahan");
            setIsLoading(false)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-[350px] h-auto border-2 border-slate-200 rounded-lg p-4 shadow-lg">
                <h3 className="text-lg font-bold text-center mb-4">Halaman Login</h3>
                {error && <p className="text-white py-2 bg-red-700 rounded-l mb-2 w-full h-8 text-sm text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            placeholder="Email"
                            value={email}
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit"
                    disabled={loading}
                     className="bg-slate-800 text-white w-full h-10 rounded-lg hover:bg-slate-900 transition">
                       {loading ? 'loading...' : 'login' }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
