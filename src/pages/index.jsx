import LandingPageLayout from "../layout/landing-page";
import building from "../assets/smibuilding-1.webp";

const Index = () => {
    return (
        <LandingPageLayout title="Welcome to SMI">
          <div className="flex justify-center py-4">
          <img src={building}
           alt="Building"
           width="500" 
           height="300"
           className="mx-auto rounded-lg shadow-lg"
           loading="lazy"
           decoding="async"
      />
</div>
        </LandingPageLayout>
    );
};

export default Index;
