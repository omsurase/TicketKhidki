import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import MoviesForm from './MoviesForm';
import moment from 'moment';
import { Table, message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import { GetAllMovie } from '../../apicalls/movies';

function MoviesList() {
    const dispatch = useDispatch();
    const [movies, setMovies] = useState([]);
    const [showMovieFromModal, setShowMovieFormModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [formType, setFormType] = useState("add");
    const columns = [
        {
            title: "Name",
            dataIndex: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Duration",
            dataIndex: "duration",
        },
        {
            title: "Genre",
            dataIndex: "genre",
        },
        {
            title: "Language",
            dataIndex: "language",
        }, {
            title: "Release Date",
            dataIndex: "releaseDate",
            render: (text, record) => {
                return moment(record.releaseDate).format("DD-MM-YYYY");
            }
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                return <div className="flex gap-1">
                    <i className="ri-pencil-line"
                        onClick={() => {
                            setSelectedMovie(record);
                            setFormType("edit");
                            setShowMovieFormModal(true);
                        }}></i>
                    <i className="ri-delete-bin-2-line "></i>
                </div>
            }
        },
    ];

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllMovie();
            if (response.success) {
                setMovies(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (err) {
            dispatch(HideLoading());
            message.error(err.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <div className="flex justify-end mb-1">
                <Button title="Add Movie" variant='outlined'
                    onclick={() => {
                        setShowMovieFormModal(true);
                        setFormType("add");
                    }} />
            </div>

            <Table columns={columns} dataSource={movies} />

            {showMovieFromModal && <MoviesForm
                showMovieFormModal={showMovieFromModal}
                setShowMovieFormModal={setShowMovieFormModal}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
                formType={formType}
                getData={getData}
            />}
        </div>
    );
}

export default MoviesList
