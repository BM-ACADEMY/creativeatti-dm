import ImageCards from "./Components/client";
import Faq from "./Components/Faq";
import AnimatedFooter from "./Components/Footer";
import FlolapoText from "./Components/Home";
import SkillsSection from "./Components/Servicecourse";
import StackingCards from "./Components/Services";
import CircleImageScroll from "./Components/Servicespage";
import ReachOutSection from "./Components/ServiceText";
// import CustomCursor from "./CustomCursor";

export default function App() {
  return (
    <div>
      {/* <CustomCursor/> */}

      <FlolapoText/>
      <StackingCards/>
      <ReachOutSection  />
      <SkillsSection/>
      <ImageCards/>
      <CircleImageScroll/>
      <Faq/>
      <AnimatedFooter/>
    </div>
  )
}