"use client"
import { useAppSelector, AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import Image from 'next/image'

import { deleteReservationReducer } from "@/redux/features/reservationSlice"
import ModalButton from "./ModalButton"
import ReservationForm from "./ReservationForm"
import getReservations from "@/libs/getReservations"
import { setReservationReducer } from "@/redux/features/reservationSlice"
import { useEffect } from "react"
import { ReservationJson } from "../../interface"
import TextHeader from "./TextHeader"
import dayjs from "dayjs"

export default function BookingList() {

    const reservationItems = useAppSelector(state => state.reservationSlice.reservationItems)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const fetchReservations = async () => {
            const reservations:ReservationJson = await getReservations();
            dispatch(setReservationReducer(reservations.data))
        }
        fetchReservations();
    }, [])

    return (
        <div className="m-5 flex flex-col gap-8">
                <h1 className="text-3xl text-left border-b-2 border-[#426B1F] w-[500px] pb-4 text-[#426B1F] mb-5 ml-5">You have {reservationItems.length} Reservation(s)</h1>
        {
            reservationItems.length > 0 ? (
                reservationItems.map((reservation) => (
                    

                    <div className="bg-[#FFFFFF] rounded-xl mx-5 my-2 h-[180px] flex overflow-hidden shadow-md w-[800px]" key={reservation._id}>
                        <div className="w-[200px] h-full overflow-hidden">
                            <Image src={reservation.massage.picture == "no-photo" ? "/img/massage-default.jpg" : reservation.massage.picture} alt="Reservation image" width={0} height={0} sizes="10vw" className="w-[200px] h-full"/>
                        </div>
                        <div className="p-6 flex flex-col w-full">
                            <div>
                                <div className="text-xl">Date of Reservation : {dayjs(reservation.apptDate).format('DD-MMM-YYYY')} </div>
                                <div className="text-lg text-gray-400">Massage : {reservation.massage.name}</div>
                            </div>

                            <div className="flex flex-row gap-5 justify-end">
                                <ModalButton text="Edit" color="yellow" >
                                    <ReservationForm isUpdate={true} id={reservation.id} />
                                </ModalButton>
                                <button className="rounded-md bg-red-600 hover:bg-red-800 transition px-3 py-1 text-white shadow-sm relative mt-10" onClick={() => dispatch(deleteReservationReducer(reservation._id))}>Cancel</button>
                            </div> 
                        </div>

                    </div>
                ))
            ) : <h1>No Reservation data</h1>
        }
        </div>
    )

}