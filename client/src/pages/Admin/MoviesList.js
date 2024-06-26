import React, { useState } from 'react';
import Button from '../../components/Button';
import MoviesForm from './MoviesForm';

function MoviesList() {
    const [movies, setMovies] = useState([]);
    const [showMovieFromModal, setShowMovieFormModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [formType, setFormType] = useState("add");
    return (
        <div>
            <div className="flex justify-end">
                <Button title="Add Movie" variant='outlined'
                    onclick={() => {
                        setShowMovieFormModal(true);
                        setFormType("add");
                    }} />
            </div>
            {showMovieFromModal && <MoviesForm
                showMovieFormModal={showMovieFromModal}
                setShowMovieFormModal={setShowMovieFormModal}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
                formType={formType}
            />}
        </div>
    );
}

export default MoviesList
