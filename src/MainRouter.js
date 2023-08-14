import { Route, Routes } from "react-router-dom";
import Home from "pages/Home/Home";
import DoorCard from "pages/DoorCard/DoorCard";
import scss from "./App.module.scss";
import PageNotFound from "pages/PageNotFound/PageNotFound";

const MainRouter = () => {
    return (
        <main className={scss.main}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:doorId" element={<DoorCard />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </main>
    );
};
export default MainRouter;
