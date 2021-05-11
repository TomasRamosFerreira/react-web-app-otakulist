import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Detail from './Detail';
import Slidebar from '../components/Slidebar';
import AnimeCard from '../components/AnimeCard';
import Error from '../components/Error/FetchError/FetchError';

function Home() {
    useEffect(() => {
        /*const animes = fetchAnimes("action");
        console.log(animes);*/
        //setActionAcnimes(state => fetchAnimes("action"));
        fetchAnimes();
    }, []);

    const [trendingAnimes, setTrendingAcnimes] = useState([]);
    const [actionAnimes, setActionAcnimes] = useState([]);
    const [adventureAnimes, setAdventureAcnimes] = useState([]);
    const [middleSchooleAnimes, setMiddleSchoolAcnimes] = useState([]);
    //let actionAnimes = [];

    const fetchAnimesURL = (category) => {
        return (`https://kitsu.io/api/edge/anime?filter[categories]=${category}&page[limit]=4&include=categories,characters&sort=-createdAt`);
    };

    const fetchAnimes = () => {
        const trendingAnimesData = axios.get(`https://kitsu.io/api/edge/trending/anime`);
        const actionAnimesData = axios.get(fetchAnimesURL("action"));
        const adventureAnimesData = axios.get(fetchAnimesURL("adventure"));
        const middleSchooleAnimesData = axios.get(fetchAnimesURL("Middle School"));
        axios.all([trendingAnimesData, actionAnimesData, adventureAnimesData, middleSchooleAnimesData]).then(
            axios.spread((...allData) => {
                console.log("trending");
                console.log(allData[0].data.data);
                console.log(allData[1].data.data);
                console.log(allData[2].data.data);

                setTrendingAcnimes(allData[0].data.data.slice(0,4));
                setActionAcnimes(allData[1].data.data);
                setAdventureAcnimes(allData[2].data.data);
                setMiddleSchoolAcnimes(allData[3].data.data);
            })
        );
    };

    return (
        <div className="row">
            <div className="col-lg-2 col-xl-2 col-md-12 col-sm-12">
                <Slidebar />
            </div>
            <div className="col-10">
                <h2>Trending Animes</h2>
                <div className="row">    
                    {trendingAnimes.map(anime => (
                        <AnimeCard anime={anime} key={anime.id} />
                    ))}
                </div>
                <h2>Action</h2>
                <div className="row">    
                    {actionAnimes.map(anime => (
                        <AnimeCard anime={anime} key={anime.id} />
                    ))}
                </div>
                <h2>Adventure</h2>
                <div className="row">    
                    {adventureAnimes.map(anime => (
                        <AnimeCard anime={anime} key={anime.id} />
                    ))}
                </div>
                <h2>Middle School</h2>
                <div className="row">    
                    {middleSchooleAnimes.map(anime => (
                        <AnimeCard anime={anime} key={anime.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
