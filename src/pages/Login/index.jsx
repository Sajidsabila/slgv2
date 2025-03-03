import { useState } from "react";

const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
};

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Email dan Password tidak boleh kosong");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_SISTER_URL}/api/method/login`, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ usr: email, pwd: password }),
                credentials: "include",
            });

            const data = await response.json();
            console.log("Login Response:", data);

            if (!response.ok) {
                throw new Error(data.message || "Login gagal. Periksa email dan password.");
            }

            // Ambil sid dari cookie
            const sid = getCookie("sid");

            if (!sid) {
                throw new Error("SID tidak ditemukan dalam cookies.");
            }

            // Simpan ke localStorage
            localStorage.setItem("sid", sid);
            localStorage.setItem("user", JSON.stringify(data));

            window.location.href = "/admin"; // Redirect setelah login berhasil
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-[350px] h-auto border-2 border-slate-200 rounded-lg p-4 shadow-lg">
                <h3 className="text-lg font-bold text-center mb-4">Halaman Login</h3>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
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
                    <button type="submit" className="bg-slate-800 text-white w-full h-10 rounded-lg hover:bg-slate-900 transition">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
