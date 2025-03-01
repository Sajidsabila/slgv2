import LandingPageLayout from "../Layout/landing-page";
import building from "../assets/smibuilding-1.png";

const Index = () => {
    return (
        <LandingPageLayout title="Welcome to SMI">
          <div className="flex justify-center py-4">
  <img src={building} alt="Building" className="w-[500px] h-auto mx-auto" />
</div>
        </LandingPageLayout>
    );
};

export default Index;
