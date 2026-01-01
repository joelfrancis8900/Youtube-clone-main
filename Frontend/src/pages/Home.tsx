import Header1 from "../components/Header1/Header1";
import Sidebar from "../components/Sidebar/Sidebar";
import Header2 from "../components/Header2/Header2";
import GridContainer from "../components/GridContainer/GridContainer";
import './Home.css';


export default function Home() {
    return (
        <div className="page" id="page">
            <Header1 />
            <Sidebar />
            <Header2 />
            <GridContainer />

        </div >
    );
}

