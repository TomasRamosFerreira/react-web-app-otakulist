import React, {useState, useEffect} from 'react'
import Error from '../components/Error/FetchError/FetchError';
import axios from 'axios';
import '../assets/detail.scss';

function Detail({match}) {
    useEffect(() => {
        fetchAnime();
        libStatus();
        console.log(match);
    }, []);

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [anime, setAnime] = useState({
        attributes: {
            titles: {},
            coverImage: {},
            posterImage: {}
        },
        //title: {}
    });
    const [libraryStatus, setLibraryStatus] = useState(false);
    const [entryID, setEntryID] = useState(null);
    const animeEntry = {
        data: {
            attributes: { status: "planned" },
            relationships: {
                anime: {
                  data: {
                        type: "anime",
                        id: `${match.params.id}`
                    }
                },
                user: {
                    data: {
                        type: "users",
                        id: "981584"
                    }
                }
            },
            type: "library-entries"
        }
    };

    const libStatus = async () => {
        await fetch(`https://kitsu.io/api/edge/library-entries?filter[userId]=981584&filter[kind]=anime&filter[animeId]=${match.params.id}`)
        .then(res => res.json())
        .then(
            (res) => {
                if (res.data.length > 0){
                    setLibraryStatus(true);
                    setEntryID(res.data[0].id);
                } else
                setLibraryStatus(false);
                console.log(res.data[0]);
            },
            (err) => {
                setIsLoaded(true);
                setError(err);
            }
        );
    };

    const fetchAnime = async () => {
        await fetch(`https://kitsu.io/api/edge/anime/${match.params.id}`)
        .then(res => res.json())
        .then(
            (res) => {
                setIsLoaded(true);
                setAnime(res.data);
                console.log(res.data);
            },
            (err) => {
                setIsLoaded(true);
                setError(err);
            }
        );
    };
    
    const addAnimeToLibrary = () => {
        const headers = {
            'Content-Type': 'application/vnd.api+json', 
            'Authorization': 'Bearer 09e09f7905a35e79e750510de847a51bc01aaa6f7862912b5fe37a617c902f33'
        };

        axios.post(`https://kitsu.io/api/edge/library-entries`, animeEntry, { headers })
        .then(res => {
            libStatus();
            console.log(res);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    };

    const removeAnimeFromLibrary = () => {
        const headers = {
            'Authorization': 'Bearer 09e09f7905a35e79e750510de847a51bc01aaa6f7862912b5fe37a617c902f33'
        };

        axios.delete(`https://kitsu.io/api/edge/library-entries/${entryID}`, {headers})
        .then(res => {
            libStatus();
            console.log(res);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    };

    if (!isLoaded) {
        return (
            <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    } else if (error) {
        return (<Error />);
    } else {
        return (
            <div className="deitails">
                <div className="row">
                    <div className="user-cover">
                        {anime.attributes.coverImage !== null ?
                            <div className="cover-image" style={{backgroundImage: `url(${anime.attributes.coverImage.original})`}} alt='coverImage'>
                                <div className="dark-cover-overlay">
                                </div>
                            </div> :
                            <div className="cover-image" style={{backgroundImage: `url(${anime.attributes.posterImage.original})`}} alt='coverImage'>
                                <div className="dark-cover-overlay">
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 col-xl-2 col-md-12 col-sm-12">
                            <div className="is-sticky media-sidebar--sticky">
                                <div className="row lazy-image ember-view slide-top">
                                    <img src={anime.attributes.posterImage.small} alt='posterImage'/>
                                </div>
                                <div className="row library-state" style={{marginTop: "25px"}}>
                                    {!libraryStatus ?
                                        <button type="button" className="btn btn-success btn-block button--secondary" onClick={addAnimeToLibrary}>Add to Library</button> :
                                        <button type="button" className="btn btn-danger btn-block button--secondary" onClick={removeAnimeFromLibrary}>Remove from Library</button>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-xl-8 col-md-12 col-sm-12">
                            <h1>
                                {anime.attributes.titles.en ?
                                    anime.attributes.titles.en :
                                    anime.attributes.titles.en_jp
                                }
                            </h1>
                            <p className="card-text">
                                {anime.attributes.synopsis ?
                                    anime.attributes.synopsis :
                                    anime.attributes.description
                                }
                            </p>
                        </div>
                        <div className="col-lg-2 col-xl-2 col-md-12 col-sm-12">
                            <table className="table table-hover" style={{backgroundColor: "white", color: "orange"}}>
                                <thead>
                                    <tr>
                                        <th scope="col">Info</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            Episodes
                                        </td>
                                        <td>
                                            {anime.attributes.episodeCount}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Episode Length
                                        </td>
                                        <td>
                                            {anime.attributes.episodeLength}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            End Date
                                        </td>
                                        <td>
                                            {anime.attributes.endDate}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail