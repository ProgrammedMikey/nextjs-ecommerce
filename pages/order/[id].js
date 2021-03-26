import Head from 'next/head' 
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../store/GlobalState'
import { useRouter } from 'next/router' 
import Link from 'next/link'

const DetailOrder = () => {
    const {state, dispatch} = useContext(DataContext) 
    const {orders, auth} = state

    const router = useRouter() 

    const [orderDetail, setOrderDetail] = useState([])

    useEffect(() => {
        const newArr = orders.filter(order => order._id === router.query.id)
        setOrderDetail(newArr)

    }, [orders])

    return(
        <div className="my-3">
            <Head>
                <title>Detail Order</title>
            </Head>
            <div>
                <button className="btn btn-dark" onClick={() => router.back()}>
                    <i className="fas fa-long-arrow-alt-left"></i>Go Back
                </button>
            </div>
        </div>
    )
}

export default DetailOrder