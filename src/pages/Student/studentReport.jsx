import { Link } from "react-router-dom"
import LandingPageLayout from "../../layout/landing-page"


const StudentReport = () => {
    return (
    <LandingPageLayout title="Learning Resources">
      <div className="container mx-auto px-4 flex items-center lg:h-130 xl:h-150">
        <div className="flex flex-col lg:flex-row items-center lg:items-start w-full">
          <img
            src="/assets/mascots/brandi.png"
            alt="Learning Resources"
            className="hidden lg:block lg:w-120 xl:w-150 lg:mt-60 xl:mt-80"
          />
          <div className="flex flex-col md:ml-20 xl:mt-120 lg:mt-80 text-center md:text-left">
            <p className="font-extrabold text-2xl md:text-center self-start">
              STUDENTS REPORT
            </p>

            <Link to="/students-report/history-absensi" className="w-full md:w-72 bg-black text-white py-3 px-6 font-bold mt-4 rounded-lg shadow-xl hover:scale-105 transition">
              Kehadiran Siswa
            </Link>

            <Link to="/students-report/fees" className="w-full md:w-72 bg-black text-white py-3 px-6 font-bold mt-4 rounded-lg shadow-xl hover:scale-105 transition">
              Mutasi Rekening
            </Link>

            <Link className="w-full md:w-72 bg-black text-white py-3 px-6 font-bold mt-4 rounded-lg shadow-xl hover:scale-105 transition">
              Hasil Evaluasi Semester
            </Link>
          </div>
        </div>
      </div>
    </LandingPageLayout>
  )
}
export default StudentReport