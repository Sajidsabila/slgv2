

const Logout = async () => {
   try{
    const response = await fetch(`${import.meta.env.VITE_SISTER_URL}/api/method/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({}), 
      }); 
      const data = await response.json(); 
      console.log(data); 
      if(!response.ok){ 
        alert(data.message);
      } 
      localStorage.clear();
      window.location.href = "/login"; 
   }catch(error){ 
     alert(error.message);
   }
}
export default Logout