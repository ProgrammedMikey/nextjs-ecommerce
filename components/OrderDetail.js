import Link from 'next/link'
import PaypalBtn from './paypalBtn'

const OrderDetail = ({orderDetail}) => {
    return(
        <>
        {
            orderDetail.map(order => (
            <div key={order._id}  style={{margin: '20px auto'}} className="row justify-content-around">

                <div className="text-uppercase my-3" style={{maxWidth: '600px'}}>
                    <h2 className="text-break">Order {order._id}</h2>
                    <div className="mt-4 text-secondary">
                        <h4>Shipping</h4>
                        <p>Name: {order.user.name}</p>
                        <p>Email: {order.user.email}</p>
                        <p>Address: {order.address}</p>
                        <p>Mobile: {order.mobile}</p>

                        <div className={`alert ${order.delivered ? 'alert-success' : 'alert-danger'}
                        d-flex justify-content-between align-items-center`} role="alert">
                            {
                                order.delivered ? `Delivered on ${order.updatedAt}` : 'Not Delivered'
                            }
                        </div>

                        <h3>Payment</h3>
                        <h6>Mehtod: {order.method}</h6>
                        <p>PaymentId: {order.paymentId}</p>
                        <div className={`alert ${order.paid ? 'alert-success' : 'alert-danger'}
                        d-flex justify-content-between align-items-center`} role="alert">
                            {
                                order.paid ? `Paid on ${order.dateOfPayment}` : 'Not Paid'
                            }
                        </div>

                        <div>
                            <h3>Order Items</h3>
                            {
                                order.cart.map(item => (
                                    <div className="row border-bottom mx-0 p-2 justify-content-between
                                    align-items-center" key={item._id} style={{maxWidth: '550px'}}>
                                        <img src={item.images[0].url} alt={item.images[0].url}
                                        style={{width: '50px', height: '45px', objectFit: 'cover'}} />

                                        <h5 className="flex-fill text-secondary px-3 m-0">
                                            <Link href={`/product/${item._id}`}>
                                                <a>{item.title}</a>
                                            </Link>
                                        </h5>

                                        <span className="text-info m-0">
                                            {item.quantity} x ${item.price} = ${item.price * item.quantity}
                                        </span>

                                    </div>
                                ))
                            }
                        </div>

                    </div>

                </div>

              {
                  !order.paid && 
                  <div className="p-4">
                    <h2 className="mb-4 text-uppercase">Total: ${order.total}</h2>
                    <PaypalBtn order={order} />
                  </div>
              }
            </div>
            ))
        }
        </>
    )
}

export default OrderDetail