import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./Home/page";

export default function Page() {
  return (
    <div className="bg-black">
    <Navbar/>
    <Home/>
    <Footer/>
    </div>
  );
}
