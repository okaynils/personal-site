import React, { useState, useEffect } from "react";

const Artists = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        console.log(process.env.REACT_APP_LASTFM_USERNAME!)
        fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${process.env.REACT_APP_LASTFM_USERNAME!}&api_key=${process.env.REACT_APP_LASTFM_API_KEY!}&format=json&limit=5&period=${process.env.REACT_APP_LASTFM_TIME_PERIOD!}`)
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setArtists(data["topartists"]["artist"]);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    if (error) {
        return error
    } else if (!isLoaded) {
        return <div className="loading">Loading artists...</div>;
    } else {
        return (
            <div className="artist-box">
                <ul>
                    {artists.map(artist => (
                        <li className="artist-li">
                            <a href={artist["url"]} rel="noreferrer" target="_blank">
                                <div className="artist-div">
                                    <p>{artist["name"]}</p>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Artists;