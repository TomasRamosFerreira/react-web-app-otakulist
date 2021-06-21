import React, {useState, useEffect} from 'react';
import Loader from "react-loader-spinner";
import Error from '../components/Error/FetchError/FetchError';
import Detail from './Detail';
import AnimeCard from '../components/AnimeCard';
import '../assets/animesList.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import Slidebar from '../components/Slidebar';
import { useHistory } from 'react-router-dom';

function AnimesList({match}) {
    const history = useHistory();

    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [animes, setAnimes] = useState([]);
    const [page, setPage] = useState(0);
    const [offset, setOffset] = useState(20);
    const [category, setCategory] = useState(match.params.category);
    const [search, setSearch] = useState(match.params.search);

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
        await fetch(`https://kitsu.io/api/edge/anime?page[limit]=${offset}&page[offset]=${page * offset}${verifyParams()}`)
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
    },[match.params]);

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
                            <InfiniteScroll
                                dataLength={animes.length} //This is important field to render the next data
                                next={() => setPage(page + 1)}
                                hasMore={true}
                                className="row"
                                >
                                <div className="row">
                                    {animes.map(anime => (
                                        <div className="col-lg-4 col-xl-3 col-md-6 col-sm-6 animes-list">
                                            <AnimeCard anime={anime} key={anime.id} />
                                        </div>
                                    ))}
                                </div>
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AnimesList
