
import {useLocation} from "react-router-dom";
import NavbarStudent from "./navbarStudent";
import NavbarTeacher from "./navbarTeacher";
import NavbarGuardian from "./navbarGuardian";

const Navbar = () => {

  const { pathname } = useLocation();

  const isStudent = pathname.startsWith("/student");
  const isTeacher = pathname.startsWith("/teacher");
  const isGuardian = pathname.startsWith("/guardian");

  return (

   <>
    {isStudent && <NavbarStudent />}
    {isTeacher && <NavbarTeacher />}
    {isGuardian && <NavbarGuardian />}
  </>
  );
};

export default Navbar;
