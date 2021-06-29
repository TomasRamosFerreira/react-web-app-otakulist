import React, {useState, useEffect} from 'react';
import Loader from "react-loader-spinner";
import Error from '../components/Error/FetchError';
import AnimeCard from '../components/AnimeCard';
import '../assets/explore.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import Slidebar from '../components/Slidebar';

function Explore({match}) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [animes, setAnimes] = useState([]);
    const [page, setPage] = useState(0);
    const [offset, setOffset] = useState(20);
    const [category, setCategory] = useState(match.params.category);
    const [categoryInfo, setCategoryInfo] = useState([]);
    const [search, setSearch] = useState(match.params.search);

    const fetchCategories = async () => {
        const headers = {
            'Set-Cookie': 'SameSite=Lax'
        };

        await fetch(`https://kitsu.io/api/edge/categories?filter[slug]=${category}`, {headers})
        .then(res => res.json())
        .then(
            (res) => {
                
                setCategoryInfo(res.data[0]);
                console.log(res.data[0]);
                setIsLoaded(true);
                //console.log(res.data[0].attributes.description);
                //console.log(categoryInfo.attributes);
            },
            (err) => {
                setError(err);
                setIsLoaded(true);
            }
        );
    };

    useEffect(() => {
        fetchCategories();
    }, [category]);

    const verifyParams = () => {
        let queryurl = ``;
        if (category)
            queryurl += `&filter[categories]=${category}`;
        if (search)
            queryurl += `&filter[text]=${search}`;
        else
            queryurl += '&sort=-updatedAt';
        
        return queryurl;
    };

    const getAnimes = async () => {
        const headers = {
            'Set-Cookie': 'SameSite=Lax'
        };

        await fetch(`https://kitsu.io/api/edge/anime?page[limit]=${offset}&page[offset]=${page * offset}${verifyParams()}`, {headers})
        .then(res => res.json())
        .then(
            (res) => {
                setIsLoaded(true);
                // Save one by one
                for (let i = 0; i < res.data.length; i++)
                    setAnimes(items => [...items, res.data[i]]);
                console.log(animes);
            },
            (err) => {
                setIsLoaded(true);
                setError(err);
            }
        );
        //SameSite=Lax
    };

    useEffect(() => {
        console.log(match);
        getAnimes();
        console.log("Carregou página: " + page * 20);
    }, [page]);

    /*useEffect(() => {
        return history.listen((location) => { 
            console.log(`You changed the page to: ${location.pathname}`);
            setCategory(match.params.category);
            setSearch(match.params.search);
            setAnimes([]);
            setPage(0);
            getAnimes();
            console.log(match);
        });
    }, [history]);*/

    useEffect(() => {
        setCategory(match.params.category);
        setSearch(match.params.search);
        setAnimes([]);
        setPage(0);
        getAnimes();
    }, [match.params]);

    // <AnimeCard anime={anime} key={anime.id} />
    if (!isLoaded)
        return (
            <Loader
                type="BallTriangle"
                color="#ffa500"
                height={100}
                width={100}
                timeout={3000} //3 secs
            />
        );
    else if (error)
        return <Error />
    else {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-2 col-xl-2 col-md-12 col-sm-12">
                        <Slidebar />
                    </div>
                    <div className="col-lg-10 col-xl-10 col-md-12 col-sm-12">
                        <div className="row animes-list-area">
                            <div className="explore-filtred mb-4">
                                {categoryInfo ?
                                    <div className="category-descriptiom">
                                        <h2 className="filtred-by-title">{categoryInfo.attributes.title}</h2>
                                        <span>{categoryInfo.attributes.description}</span>
                                    </div> :
                                    null
                                }
                                {search ?
                                    <h2 className="filtred-by-title">{search}</h2>:
                                    null
                                }
                            </div>
                            <div className="animes-infinity-list">
                                <InfiniteScroll
                                    dataLength={animes.length} //This is important field to render the next data
                                    next={() => setPage(page + 1)}
                                    hasMore={true}
                                    endMessage={<span>No more data to display!</span>}
                                    className="row"
                                    >
                                    <div className="row">
                                        {animes.map(anime => (
                                            <div className="col-lg-4 col-xl-3 col-md-6 col-sm-6 animes-list" key={anime.id}>
                                                <AnimeCard anime={anime} key={anime.id} />
                                            </div>
                                        ))}
                                    </div>
                                </InfiniteScroll>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Explore
