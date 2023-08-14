import scss from "./PageNotFound.module.scss";
import notFound from "../../assets/not_found404.png";
import { Link } from "react-router-dom";
const PageNotFound = () => {
    return (
        <div className={scss.notFound}>
            <div className={scss.notFound_wrapper}>
                <div className={scss.image_wrapper}>
                    <img className={scss.img} src={notFound} alt="закрита дверь з табличкою 404" />
                </div>
                <div className={scss.info}>
                    <h2 className={scss.title}>404</h2>
                    <h3 className={scss.message}>Помилка!</h3>
                    <p className={scss.text}>Щось пішло не так й сторінка не знайдена.</p>
                    <Link to="/" className={scss.btn}>
                        На головну
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default PageNotFound;
