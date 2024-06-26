import React, { useState } from 'react'
import Button from '../../components/Button';
import TheaterForm from './TheaterForm';


function TheaterList() {
    const [showTheaterFormModal = false, setShowTheaterFormModal] = useState(false);
    const [selectedTheater, setSelectedTheater] = useState(null);
    const [formType = "add", setFormType] = useState("add");
    const [theatres = [], setTheatres] = useState([]);

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
                showTheatreFormModal={showTheaterFormModal}
                setShowTheatreFormModal={setShowTheaterFormModal}
                formType={formType}
                setFormType={setFormType}
                selectedTheatre={selectedTheater}
                setSelectedTheatre={setSelectedTheater}
            //getData={getData} 
            />}
        </div>
    )
}

export default TheaterList
