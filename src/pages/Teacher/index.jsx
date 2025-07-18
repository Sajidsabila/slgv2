import { Link } from "react-router-dom";
import LandingPageLayout from "../../layout/landing-page";
import { capitalAtWords } from "../../helper/helper";
const IndexTeacher = () => {
      const getName = capitalAtWords(
        JSON.parse(sessionStorage.getItem("profileInstructor"))?.instructor_name || ""
      );

      const url = [ 
        {id: 1, title: "Calender Academic", url: "/teacher/calender-academic"},
        {id: 2, title: "Book Menu", url: "/teacher/book-menu"},
        {id: 3, title: "Learning Materi", url: "/teacher/learning-materi"},
        {id: 4, title: "Evaluation Semester", url: "/teacher/evaluation-semester"},
        {id: 5, title: "Modul Training", url: "/teacher/modul-training"},
    ]
      return (
    <LandingPageLayout title="Welcome to SMI">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center text-sky-700 mb-2">
          Selamat Datang {getName} di Student Learning Guide
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-15">
            {url.map((url) => (
                 <Link
                to={url.url}
                key={url.id}
                className="p-5 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <p className="text-lg font-semibold text-gray-700 text-center">
            {url.title}
                </p>
              </Link>
            ))}
             
        </div>
      </div>
    </LandingPageLayout>
  );
}

export default IndexTeacher