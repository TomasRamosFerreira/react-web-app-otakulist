import React, {useState, useEffect} from 'react'
import Detail from './Detail';
import AnimeCard from '../components/AnimeCard';
import '../assets/lib.scss';
import InfiniteScroll from 'react-infinite-scroll-component';

function Library() {
    

    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [libraryAnimes, setLibraryAnimes] = useState([]);
    const [animes, setAnimes] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [offset, setOffset] = useState(20);

    useEffect(() => {
        getAnimesFromLibrarry();
    }, [libraryAnimes]);

    const getAnime = async (animeID) => {
        await fetch(`https://kitsu.io/api/edge/anime/${animeID}`)
        .then(res => res.json())
        .then(
            (res) => {
                setIsLoaded(true);
                setAnimes(items => [...items, res.data]);
                console.log(res.data);
                //showAnimesList();
                console.log(animes);
                setHasMore(res.data.length);
            },
            (err) => {
                setIsLoaded(true);
                setError(err);
            }
        );
    };
    
    const getAnimesFromLibrarry = () => {
        /*while (libraryAnimes) {
            
            //getAnime(libraryAnimes.relationships.anime.data.id);
        }*/
        libraryAnimes.map(entry => (
            getAnime(entry.relationships.anime.data.id) +
            console.log(entry)
        ));
    };
    
    const getUserLibraryAnimes = async () => {
        await fetch(`https://kitsu.io/api/edge/library-entries?filter[userId]=981584&filter[kind]=anime&sort=-id&include=anime&page[limit]=${offset}&page[offset]=${page * offset}`)
        .then(res => res.json())
        .then(
            (res) => {
                setIsLoaded(true);
                setLibraryAnimes(res.data);
                /*setTimeout(() => {
                    getAnimesFromLibrarry();
                }, 2000);*/
                console.log(res.data);
            },
            (err) => {
                setIsLoaded(true);
                setError(err);
            }
        );
    };

    useEffect(() => {
        getUserLibraryAnimes();
    }, [page]);

    return (
        <div className="container">
            <div className="row lib-area">
                <InfiniteScroll
                    dataLength={animes.length} //This is important field to render the next data
                    next={() => setPage(page + 1)}
                    hasMore={true}
                    className="row"
                    >
                    <div className="row">
                        {animes.map(anime => (
                            <div className="col-lg-3 col-xl-2 col-md-6 col-sm-6 lib-anime">
                                <AnimeCard anime={anime} key={anime.id} />
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Library
