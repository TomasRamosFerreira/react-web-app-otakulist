import React, {useState, useEffect} from 'react'
import Detail from './Detail';
import AnimeCard from '../components/AnimeCard';
import '../assets/animesList.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import Slidebar from '../components/Slidebar';

function AnimesList() {
    

    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [animes, setAnimes] = useState([]);
    const [page, setPage] = useState(0);
    const [offset, setOffset] = useState(20);

    const getAnimes = async () => {
        await fetch(`https://kitsu.io/api/edge/anime?sort=-updatedAt&page[limit]=${offset}&page[offset]=${page * offset}`)
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
        getAnimes();
        console.log("Carregou página: " + page * 20);
    }, [page]);

    // <AnimeCard anime={anime} key={anime.id} />
    return (
        <div className="container">
            <dic className="row">
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
            </dic>
        </div>
    )
}

export default AnimesList
