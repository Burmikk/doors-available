import scss from "./FilterList.module.scss";
import { useState, useEffect, useRef } from "react";

const FilterList = ({ filterTitle, data, filterName, getRadioValue, getRadioName }) => {
    const [selectedValue, setSelectedValue] = useState();
    const [selectedName, setSelectedName] = useState();
    const [checked, setChecked] = useState();
    const [showMore, setShowMore] = useState(false);
    const [currentHeight, setCurrentHeight] = useState();
    const [smallHeight, setSmallHeight] = useState();

    const elementRef = useRef(null);
    // используя ссылку на элемент получаем его высоту
    // и записываем в стейт при первом рендере
    useEffect(() => {
        if (elementRef.current) {
            const elementHeigth = elementRef.current.clientHeight;
            setCurrentHeight(elementHeigth);
        }
    }, [data]);

    // когда появится реальная высота элемента
    // вычисляем высоту одной li с помощью функции calculateSmalllHeight
    // делаем все в функции потому что нельзя вызывать перебиирающие методы массива в useEffect
    // и ниже инлайново присваиваем по нажатии кнопки либо общую либо свернутую высоту

    useEffect(() => {
        if (currentHeight) {
            calculateSmalllHeight();
        }
    }, [currentHeight]);
    // c помощью Array.from создаем массив li и отрезаем первые 4шт.
    // далее берем высоту li и т.к. у нас есть margin-bottom прибавляем его
    const calculateSmalllHeight = () => {
        if (elementRef.current) {
            const firstFourItems = Array.from(elementRef.current.querySelectorAll("li")).slice(0, 4);
            const smallHeight = firstFourItems.reduce((acc, curr) => acc + curr.offsetHeight + 12, 0);
            setSmallHeight(smallHeight);
        }
    };

    useEffect(() => {
        if (selectedName) {
            getRadioValue(selectedValue);
            getRadioName(selectedName);
        }
    }, [selectedValue, selectedName, getRadioName, getRadioValue]);

    const isChecked = (e, filterName) => {
        const { name, value } = e.target;
        setChecked(value);

        if (filterName === "size_side") {
            setSelectedValue(0);
            setSelectedName(name);
        } else {
            setSelectedValue(value);
            setSelectedName(name);
        }
    };

    const handleShowMore = () => {
        setShowMore(!showMore);
    };

    const filterReset = () => {
        setChecked("");
        setSelectedValue("delete");
    };

    const filterItem = data.map((item) => {
        return (
            <li className={scss.filter_item} key={item.id}>
                <input
                    onChange={(e) => isChecked(e, filterName)}
                    className={scss.input}
                    id={item.name}
                    name={filterName === "size_side" ? item.value : filterName}
                    value={item.id}
                    type="radio"
                    checked={+checked === item.id}
                />

                <label className={scss.label} htmlFor={item.name}>
                    {item.name}
                </label>
            </li>
        );
    });

    return (
        <div className={scss.filter_wrapper}>
            <div className={scss.title_box}>
                <h2 className={scss.title}>{filterTitle}</h2>
                <p className={scss.reset} onClick={filterReset}>
                    Скинути
                </p>
            </div>
            <ul
                style={{ maxHeight: showMore ? currentHeight : smallHeight }}
                ref={elementRef}
                // className={`${scss.filter_list} ${showMore ? "" : scss.filter_list_hidden}`}
                className={scss.filter_list}
            >
                {filterItem}
            </ul>
            {data.length > 4 && (
                <p className={scss.showBtn} onClick={handleShowMore}>
                    {showMore ? "Згорнути" : "Показати всі"}
                </p>
            )}
        </div>
    );
};
export default FilterList;
