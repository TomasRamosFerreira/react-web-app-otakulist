import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Detail from './Detail';
import Slidebar from '../components/Slidebar';
import AnimeCard from '../components/AnimeCard';
import Error from '../components/Error/FetchError/FetchError';
import '../assets/home.scss'

function Home() {
    useEffect(() => {
        /*const animes = fetchAnimes("Android");
        console.log(animes);*/
        //setAndroidAcnimes(state => fetchAnimes("Android"));
        fetchAnimes();
    }, []);

    const [trendingAnimes, setTrendingAcnimes] = useState([]);
    const [androidAnimes, setAndroidAcnimes] = useState([]);
    const [samuraiAnimes, setSamuraiAnimes] = useState([]);
    const [middleSchooleAnimes, setMiddleSchoolAcnimes] = useState([]);
    //let AndroidAnimes = [];

    const fetchAnimesURL = (category) => {
        return (`https://kitsu.io/api/edge/anime?filter[categories]=${category}&page[limit]=4&include=categories,characters&sort=-createdAt`);
    };

    const fetchAnimes = () => {
        const trendingAnimesData = axios.get(`https://kitsu.io/api/edge/trending/anime`);
        const AndroidAnimesData = axios.get(fetchAnimesURL("Android"));
        const samuraiAnimesData = axios.get(fetchAnimesURL("Samurai"));
        const middleSchooleAnimesData = axios.get(fetchAnimesURL("Middle School"));
        axios.all([trendingAnimesData, AndroidAnimesData, samuraiAnimesData, middleSchooleAnimesData]).then(
            axios.spread((...allData) => {
                console.log("trending");
                console.log(allData[0].data.data);
                console.log(allData[1].data.data);
                console.log(allData[2].data.data);

                setTrendingAcnimes(allData[0].data.data.slice(0,4));
                setAndroidAcnimes(allData[1].data.data);
                setSamuraiAnimes(allData[2].data.data);
                setMiddleSchoolAcnimes(allData[3].data.data);
            })
        );
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-2 col-xl-2 col-md-12 col-sm-12">
                    <Slidebar />
                </div>
                <div className="col-10">
                    <h2>Trending Animes</h2>
                    <div className="row box">    
                        {trendingAnimes.map(anime => (
                            <div className="col-lg col-xl col-md-6 col-sm-6">
                                <AnimeCard anime={anime} key={anime.id} />
                            </div>
                        ))}
                    </div>
                    <h2>Android</h2>
                    <div className="row box">    
                        {androidAnimes.map(anime => (
                            <div className="col-lg col-xl col-md-6 col-sm-6">
                                <AnimeCard anime={anime} key={anime.id} />
                            </div>
                        ))}
                    </div>
                    <h2>Samurai</h2>
                    <div className="row box">    
                        {samuraiAnimes.map(anime => (
                            <div className="col-lg col-xl col-md-6 col-sm-6">
                                <AnimeCard anime={anime} key={anime.id} />
                            </div>
                        ))}
                    </div>
                    <h2>Middle School</h2>
                    <div className="row box">    
                        {middleSchooleAnimes.map(anime => (
                            <div className="col-lg col-xl col-md-6 col-sm-6">
                                <AnimeCard anime={anime} key={anime.id} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
