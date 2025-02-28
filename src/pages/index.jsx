import LandingPageLayout from "../Layout/landing-page";
import building from "../assets/smibuilding-1.png";

const Index = () => {
    return (
        <LandingPageLayout title="Welcome to SMI">
            <img src={building} width="200px"></img>
        </LandingPageLayout>
    );
};

export default Index;
