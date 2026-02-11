import { use, useEffect, useState } from "react";
import LandingPageLayout from "../../layout/landing-page";
import { methodGet } from "../../api/apiMethod";

const ProfileStudentsFrontend = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const getrStudentProfile = async () => {
      try {
        const response = await methodGet("smi.helper.data_student");
        setProfile(response);
      } catch (error) {
        console.error("Error fetching student profile:", error);
      }
    };
    getrStudentProfile();
  }, []);
  return (
    <LandingPageLayout title="Profile Student">
      <p>test</p>
    </LandingPageLayout>
  );
};

export default ProfileStudentsFrontend;
