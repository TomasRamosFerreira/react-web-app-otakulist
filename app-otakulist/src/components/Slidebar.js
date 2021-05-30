import React, {useState, useEffect} from 'react'
import Error from './Error/FetchError/FetchError';
import {Link} from 'react-router-dom';
import '../assets/slidebar.scss';

function Slide() {
    useEffect(() => {
        fetchCategories();
    }, []);

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [checkedAll, setCheckedAll] = useState(true);
    const [checkedCategories, setCheckedCategories] = useState(false);
    const [orderOption, setOrderOption] = useState("1");

    const fetchCategories = async () => {
        await fetch(`https://kitsu.io/api/edge/categories?page[limit]=20`)
        .then(res => res.json())
        .then(
            (res) => {
                setIsLoaded(true);
                setCategories(res.data);
                console.log(res.data);
            },
            (err) => {
                setIsLoaded(true);
                setError(err);
            }
        );
    };

    let removeOthersCategories = () => {
        console.log("change categories");
        setCheckedCategories(false);
        setCheckedAll(true);
    };

    let setCategoriesList = () => {
        console.log("change all");
        setCheckedAll(false);
        setCheckedCategories(true);
    };

    let changeOrder = (e) => {
        console.log(e.target.value);
        setOrderOption(e.target.value);
    };

    /*
                 <table className="table table-hover" style={{backgroundColor: "white", color: "orange"}}>
                    <thead>
                        <tr>
                            <th scope="col">Categories</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td>{category.attributes.title}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="form-check">
                            <div className="all" onChange={removeOthersCategories}>
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={checkedAll}/>
                                <label className="form-check-label">
                                    All
                                </label>
                            </div>
                            <div className="categories-list">
                                {categories.map(category => (
                                    <div key={category.id} onChange={setCategoriesList}>
                                        <input className="form-check-input" type="checkbox" value={category.attributes.title} id="flexCheckDefault"/>
                                        <label className="form-check-label">
                                            {category.attributes.title}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
    */

    if (!isLoaded)
        return (
            <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    else if (error)
        return <Error />
    else {
        return (
            <div className="filters-box">
                <form className="filters">
                    <div className="categories-filter">
                        <h4 className="filters-titles">Categories</h4>
                        <div className="list-group">
                            {categories.map(category => (
                                <a className="list-group-item list-group-item-action category">
                                    <Link className="category" to={`/Animes/${category.attributes.title}`}>
                                        {category.attributes.title}
                                    </Link>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="order-filter">
                        <h4 className="filters-titles">Order</h4>
                        <select className="form-select order-filter-options" aria-label="Order" onChange={changeOrder}>
                            <option value="1" selected>Newer</option>
                            <option value="2">Older</option>
                        </select>
                    </div>
                    <button type="submit" className="btn submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Slide
