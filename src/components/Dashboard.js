import React from 'react';
import patientStore from '../db/stores/patient';
import appointmentsStore from '../db/stores/appointments';
import { useEffect, useState } from 'react';
import AppointmentCard from './AppointmentCard';
import Pet from './Pet';

export default function Dashboard(){

    
        
    const [pets, setPets] = useState([]);
    const [appointments, setAppointments] = useState([]);

    const getData = async() => {
        let user = localStorage.getItem("user");
        if (!user) {
            window.location.href = "/";
        }
        console.log(user)
        let pets = await patientStore.getPets(user);
        setPets(pets);
        console.log(pets)
        setAppointments(await appointmentsStore.getPastAppointments(user))
    }
    
    useEffect(()=> {
        getData();
    }, [])

    return (
        <div>
            <h1>Home</h1>
            <h3>Your Pets</h3>
            <div className="pets">
                {pets.length && pets.map(pet => <Pet key={pet._id} pet={pet} />)}
                <div className="add-pets">
                    <a href="/patient/add">Add Patient</a>
                </div>
            </div>
            <h3>Previous Visits</h3>
            <div className="appointments">
                {appointments.length && appointments.map(appointment => <AppointmentCard key={appointment._id} appointment={appointment}/>)}
            </div>
            <a href={`/appointment`}>BookAppointment</a>
            <a href={`/patients`}>Your pets</a>


        </div>
    )
}