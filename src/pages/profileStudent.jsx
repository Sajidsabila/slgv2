import LandingPageLayout from "../layout/landing-page"

const ProfileStudents = () => {
    return (
        <LandingPageLayout title="Profile">
           <div className="container mx-auto">
            <div className="box profile w-[70dvh] h-100 bg-white border-2 border-slate-700 shadow-lg rounded-lg">
                <div className="heading-box w-full h-20 bg-slate-700 text-white flex items-center justify-center text-2xl font-bold">Profile</div>
            </div>
           </div>
        </LandingPageLayout>
    )
}

export default ProfileStudents