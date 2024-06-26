import React from 'react'
import { Modal } from 'antd'
function MoviesForm({
    showMovieFormModal,
    setShowMovieFormModal,
    selectedMovie,
    setSelectedMovie,
    formType
}) {
    return (
        <Modal
            title={formType == "add" ? "Add Movie" : "Edit Movie"}
            open={showMovieFormModal}
            onCancel={() => setShowMovieFormModal(false)}
            footer={null}
        >
            <div>MovieForm</div>
        </Modal>
    )
}

export default MoviesForm
