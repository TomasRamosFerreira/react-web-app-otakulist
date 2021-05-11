import React from 'react'
import {Link} from 'react-router-dom';

function AnimeCard({anime}) {
    return (
        <div className="col-lg col-xl col-md-6 col-sm-6">
            <Link to={`/Anime/${anime.id}`}>
                <div className="card" key={anime.id}>
                    <img className="card-img-top" src={anime.attributes.posterImage.original} alt="Anime"/>
                    <div className="card-body">
                        <h3>
                            {anime.attributes.titles.en ?
                                anime.attributes.titles.en :
                                anime.attributes.titles.en_jp
                            }
                        </h3>
                        <p className="card-text">
                            {anime.attributes.synopsis ?
                                anime.attributes.synopsis :
                                anime.attributes.description
                            }
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default AnimeCard
