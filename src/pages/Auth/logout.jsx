import { urlLink } from "../../api/config";


const Logout = async () => {
   try{
    const response = await fetch(`${urlLink.url}/api/method/logout`, {
        method: "POST",
        credentials: "include",
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