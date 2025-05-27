import ImageCards from "./Components/client";
import AnimatedFooter from "./Components/Footer";
import FlolapoText from "./Components/Home";
import Navbar from "./Components/navbar";
import SkillsSection from "./Components/Servicecourse";
import StackingCards from "./Components/Services";
import ReachOutSection from "./Components/ServiceText";
// import CustomCursor from "./CustomCursor";

export default function App() {
  return (
    <div>
      {/* <CustomCursor/> */}
      <Navbar/>
      <FlolapoText/>
      <StackingCards/>
      <ReachOutSection  />
      <SkillsSection/>
      <ImageCards/>
      <AnimatedFooter/>
    </div>
  )
}