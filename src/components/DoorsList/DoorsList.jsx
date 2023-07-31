import Door from "./Door/Door";
import scss from "./DoorList.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
    selectAllDoors,
    selectIsLoading,
    selectTotalDoors,
    selectShowForm,
    selectNext,
} from "redux/doors/doors-selectors";
import ReserveForm from "shared/components/ReserveForm/ReserveForm";
import { useMemo } from "react";
import { fetchLoadMoreDoors } from "redux/doors/doors-operations";
import Modal from "shared/components/Modal/Modal";
import Loading from "shared/components/Loading/Loading";

const DoorsList = () => {
    const doors = useSelector(selectAllDoors);
    const next = useSelector(selectNext);
    const totalDoors = useSelector(selectTotalDoors);
    const isLoading = useSelector(selectIsLoading);
    const isFormShow = useSelector(selectShowForm);
    const dispatch = useDispatch();

    const doorsList = useMemo(() => doors.map((item) => <Door door={item} key={item.id} />), [doors]);

    const loadMoreDoors = () => {
        dispatch(fetchLoadMoreDoors(next));
    };

    if (!isLoading && doors.length === 0) {
        return (
            <div className={scss.list_container}>
                <div className={scss.title_wrapper}>
                    <h2 className={scss.title}>Залишок дверей на складі у м. Запоріжжя</h2>
                </div>
                <div className={scss.not_found}>
                    <h2 className={scss.text}> Нажаль, у наявності зараз нічого немає за вашим запитом</h2>
                </div>
            </div>
        );
    } else {
        return (
            <div className={scss.door_list}>
                <div className={scss.title_wrapper}>
                    <h2 className={scss.title}>Залишок дверей на складі у м. Запоріжжя</h2>
                </div>
                {isLoading && (
                    <Modal>
                        <Loading />
                    </Modal>
                )}
                <ul className={scss.list}>{doorsList} </ul>
                {isFormShow && <ReserveForm isSelect="" />}
                {doors.length < totalDoors && (
                    <button onClick={loadMoreDoors} className={scss.loadmoreBtn}>
                        Показати ще
                    </button>
                )}
            </div>
        );
    }
};
export default DoorsList;
