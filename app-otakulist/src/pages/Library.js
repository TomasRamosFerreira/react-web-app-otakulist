import React, {useState, useEffect} from 'react'
import Detail from './Detail';

function Library() {
    useEffect(() => {
        getUserLibraryAnimes();
    }, []);

    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [libraryAnimes, setLibraryAnimes] = useState([]);

    const getUserLibraryAnimes = async () => {
        await fetch('https://kitsu.io/api/edge/library-entries?filter[userId]=981584&filter[kind]=anime&sort=-id&include=anime')
        .then(res => res.json())
        .then(
            (res) => {
                setIsLoaded(true);
                setLibraryAnimes(res.data);
                console.log(res.data);
                getAnimesFromLibrarry();
            },
            (err) => {
                setIsLoaded(true);
                setError(err);
            }
        );
    };

    const getAnimesFromLibrarry = () => {
        libraryAnimes.map(entry => (
            console.log(entry.relationships.anime.data.id)
        ));
    };

    return (
        <div className="container">
            <h1>Library</h1>
        </div>
    )
}

export default Library
