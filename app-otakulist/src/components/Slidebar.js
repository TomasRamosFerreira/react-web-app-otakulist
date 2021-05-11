import React, {useState, useEffect} from 'react'
import Error from './Error/FetchError/FetchError';

function Slide() {
    useEffect(() => {
        fetchCategories();
    }, []);

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchCategories = async () => {
        await fetch(`https://kitsu.io/api/edge/categories`)
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
            <div>
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
            </div>
        )
    }
}

export default Slide
