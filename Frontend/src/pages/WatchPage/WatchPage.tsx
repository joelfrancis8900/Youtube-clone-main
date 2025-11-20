import Header1 from "../../components/Header1/Header1";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header2 from "../../components/Header2/Header2";
import './WatchPage.css';

export default function Home() {
    return (
        <div className="page" id="page">
            <Header1 />
            <Sidebar />
            <Header2 />
            <div>Test watch page text</div>
        </div>
    );
}
