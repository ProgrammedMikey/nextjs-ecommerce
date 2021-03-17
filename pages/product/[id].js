import Head from 'next/head'
import { useState } from 'react'
import { getData } from '../../utils/fetchData'

const DetailProduct = (props) => {
    const [product] = useState(props.product)

    const [tab, setTab] = useState(0)
    // const imgRef = useRef()

    const isActive = (index) => {
        if(tab === index) return " active"; 
        return ""
    }
    // useEffect(() => {
    //     const images = imgRef.current.children;
    //     for(let i=0; i<images.length; i++){
    //         images[i].className = images[i].className.replace("active", "img-thumbnail rounded")
    //     }

    //     images[tab].className = "img-thumbnail rounded active";
    // }, [tab])
     
    return(
        <div className="row detail_page">
            <Head>
                <title>Detail Product</title>
            </Head>

            <div className="col-md-6">
                <img src={ product.images[tab].url } alt={ product.images[tab].url } 
                className="d-block img-thumbnail rounded mt-4 w-100" 
                style={{height: '350px'}} />

                <div className="row mx-0" style={{cursor: 'pointer'}}>
                    {product.images.map((img, index) => (
                        <img key={index} src={img.url} alt={img.url} 
                        className={`img-thumbnail rounded ${isActive(index)}`} 
                        style={{height: '80px', with: '20%'}} 
                        onClick={() => setTab(index)} />
                    ))}
                </div>
            </div>

            <div className="col-md-6 mt-3">
                <h2 className="text-uppercase">{ product.title }</h2>
                <h5 className="text-danger">${ product.price }</h5>

                <div class="row mx-0 d-flex justify-content-between">
                    {
                        product.inStock > 0
                        ? <h6 className="text-danger">In Stock: { product.inStock }</h6>
                        : <h6 className="text-danger">Out of Stock</h6>
                    }

                    <h6 className="text-danger">Sold: { product.sold }</h6>
                </div>

                <div className="my-2">{product.description}</div>
                <div className="my-2">{product.content}</div>
            
                <button type="button" className="btn btn-dark d-block my-3 px-5">
                    Buy
                </button>
            </div>
        </div>
    )
}

export async function getServerSideProps({params: {id}}) {
  
    const res = await getData(`product/${id}`)

    return {
      props: {
        product: res.product,
      }, // will be passed to the page component as props
    }
}

export default DetailProduct