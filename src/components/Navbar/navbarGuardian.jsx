import NavbarLandingPageLayout from "./navbarLandingPageLayout";
const NavbarGuardian = () => {
  const dropdownLinks = [
    {
      text: "Students Report",
      url: "/student/students-report",
      children: [
        {
          label: "Student Attendance",
          url: "/guardian/history-absensi",
        },
        { label: "Fees", url: "/guardian/fees-list" },
        {
          label: "Evaluation Semester",
          url: "/guardian/evaluasi-semester",
        },
        {
          label: "Course Schedule",
          url: "/guardian/course-schedule",
        },
      ],
    },
  ];
    return (
    <NavbarLandingPageLayout homeUrl="/guardian" links={dropdownLinks} profilUrl={"/guardian/profil-user"} />
    )
}

export default NavbarGuardian