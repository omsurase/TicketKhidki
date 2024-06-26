import React, { useState } from 'react'
import Button from '../../components/Button';
import TheaterForm from './TheaterForm';


function TheaterList() {
    const [showTheaterFormModal, setShowTheaterFormModal] = useState(false);
    const [selectedTheater, setSelectedTheater] = useState(null);
    const [formType, setFormType] = useState("add");
    const [theaters, setTheaters] = useState([]);

    return (
        <div>
            <div className="flex justify-end mb-1">
                <Button title="Add Theater" variant='outlined'
                    onclick={() => {
                        setFormType("add");
                        setShowTheaterFormModal(true);
                    }} />
            </div>

            {showTheaterFormModal && <TheaterForm
                showTheaterFormModal={showTheaterFormModal}
                setShowTheaterFormModal={setShowTheaterFormModal}
                formType={formType}
                setFormType={setFormType}
                selectedTheater={selectedTheater}
                setSelectedTheater={setSelectedTheater}
            />}
        </div>
    )
}

export default TheaterList
