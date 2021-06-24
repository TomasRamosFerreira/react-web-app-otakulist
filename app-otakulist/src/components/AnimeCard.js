import React from 'react';
import {Link} from 'react-router-dom';
import '../assets/card.scss';

function AnimeCard({anime}) {
    return (
        <div className="poster">
            <Link className="poster-link" to={`/Anime/${anime.id}`}>
                <div className="card-wrapper">
                    <div className="card-image">
                        <img className="card-img-top" src={anime.attributes.posterImage.original} alt="Anime"/>
                        <div className="card-overlay">
                            <button className="btn detail-button">Details</button>
                        </div>
                    </div>
                    <div className="card-title">
                        <h5>
                            {anime.attributes.titles.en ?
                                anime.attributes.titles.en :
                                anime.attributes.titles.en_jp
                            }
                        </h5>
                    </div>
                    {/*
                    <div className="card-description">
                        <p className="card-text">
                            {anime.attributes.synopsis ?
                                anime.attributes.synopsis :
                                anime.attributes.description
                            }
                        </p>
                    </div>
                    */}
                </div>
            </Link>
        </div>
    )
}

export default AnimeCard
