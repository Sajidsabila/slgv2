import NavbarLandingPageLayout from "./navbarLandingPageLayout";

const NavbarStudent = () => {
  const dropdownLinks = [
    {
      text: "Students Report",
      url: "/student/students-report",
      children: [
        {
          label: "Student Attendance",
          url: "/student/students-report/history-absensi",
        },
        { label: "Fees", url: "/student/students-report/fees" },
        {
          label: "Evaluation Semester",
          url: "/student/students-report/evaluasi-semester",
        },
      ],
    },
    {
      text: "Learning Resources",
      url: "/student/learning-resources",
      children: [
        {
          label: "Calender Academic",
          url: "/student/learning-resources/kalender-academic",
        },
        {
          label: "Education Program",
          url: "/student/learning-resources/program-edukasi",
        },
        {
          label: "Learning Material",
          children: [
            {
              label: "Syllabus",
              url: "/student/learning-resources/materi-pembelajaran/syllabus",
            },
            {
              label: "Exam Speciment",
              url: "/student/learning-resources/materi-pembelajaran/exam-speciment",
            },
          ],
        },
      ],
    },
  ];
    return (
      <NavbarLandingPageLayout homeUrl="/student" links={dropdownLinks} profilUrl="/student/profil-user"/>
    )
}

export default NavbarStudent