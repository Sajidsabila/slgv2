import NavbarLandingPageLayout from "./navbarLandingPageLayout";

const NavbarTeacher = () => {
    const teacherLinks = [
       {
         text: "Learning Resources",
         children: [
           {
             label: "Calender Academic",
             url: "/teacher/learning-resources/kalender-academic",
           },
           {
             label: "Education Program",
             url: "/teacher/learning-resources/program-edukasi",
           },
           {
             label: "Learning Material",
             children: [
               { label: "Syllabus", url: "/teacher/learning-resources/syllabus" },
               {
                 label: "Exam Speciment",
                 url: "/teacher/learning-resources/exam-speciment",
               },
               { label: "SLG", url: "/teacher/learning-resources/slg" },
               { label: "LHB", url: "/teacher/learning-resources/lhb" },
             ],
           },
         ],
       },
       {
         text: "Modul Training",
         children: [
           {
             label: "Initial Training",
             children: [
               {
                 label: "Product Knowledge",
                 url: "/teacher/initial-training/product-knowledge",
               },
               {
                 label: "Company Profile",
                 url: "/teacher/initial-training/company-profile",
               },
               { label: "Visi Misi", url: "/teacher/initial-training/visi-misi" },
               {
                 label: "SMI Learning System Concept",
                 children: [
                   {
                     label: "SMI Value",
                     url: "/teacher/initial-training/smi-value",
                   },
                   {
                     label: "Syllabus Overview",
                     url: "/teacher/initial-training/Syllabus Overview",
                   },
                   {
                     label: "IMTE",
                     url: "/teacher/initial-training/IMTE",
                   },
                   {
                     label: "Classroom SOP",
                     url: "/teacher/initial-training/Classroom SOP",
                   },
                 ],
               },
             ],
           },
           {
             label: "Musikal Skill",
             children: [
               { label: "Playing", url: "/teacher/musical-skill/playing" },
               {
                 label: "Improvising (Yafet)",
                 url: "/teacher/musical-skill/improvising",
               },
               { label: "Listening", url: "/teacher/musical-skill/Listening" },
               { label: "Reading", url: "/teacher/musical-skill/Reading" },
               { label: "Singing", url: "/teacher/musical-skill/Singing" },
               {
                 label: "Instrument Knowledge",
                 url: "/teacher/musical-skill/Instrument Knowledge",
               },
             ],
           },
           {
             label: "Technology Skill",
             children: [
               { label: "Beginner", url: "/teacher/technology-skill/Beginner" },
               {
                 label: "Intermediate",
                 url: "/teacher/technology-skill/Intermediate",
               },
               { label: "Advanced", url: "/teacher/students-report/Advanced" },
             ],
           },
           {
             label: "Pedagogy Skill",
             url: "/teacher/pedagogy-skill/Pedagogy Skill",
           },
           {
             label: "Head Education Modul",
             url: "/teacher/head-education-modul/Head Education Modul",
           },
         ],
       },
     ];
     return (
     <NavbarLandingPageLayout homeUrl="/teacher" links={teacherLinks}  profilUrl={"/teacher/profil-user"}/>
     );
   };


export default NavbarTeacher