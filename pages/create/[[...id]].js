import Head from 'next/head'
import {useState, useContext} from 'react' 
import {DataContext} from '../../store/GlobalState'

const ProductsManager = () => {
    const initialState = {
        product_id: "", 
        title: '',
        price: 0,
        inStock: 0,
        description: '',
        content: '',
        category: ''
    }
    const [product, setProduct] = useState(initialState)
    const {product_id, title, price, inStock, description, content, category} = product

    const {state, dispatch} = useContext(DataContext)

    const handleChangeInput = e => {
        const {name, value} = e.target 
        setProduct({...product, [name]:value})
        dispatch({type: 'NOTIFY', payload: {} })
    }

    return(
        <div className="products_manager">
            <Head>
               <title>Products Manager</title> 
            </Head>

            <form className="row">
                <div className="col-md-6">
                    <input type="text" name="product_id" value={product_id} 
                    placeholder="Product ID" className="d-block my-4 w-100 p-2"
                    onChange={handleChangeInput} />

                    <input type="text" name="title" value={title} 
                    placeholder="Title" className="d-block my-4 w-100 p-2"
                    onChange={handleChangeInput} />

                    <div className="row">
                        <div className="col-sm-6">
                            <input type="number" name="price" value={price} 
                            placeholder="Price" className="d-block my-4 w-100 p-2"
                            onChange={handleChangeInput} />
                        </div>

                        <div className="col-sm-6">
                            <input type="number" name="inStock" value={inStock} 
                            placeholder="Stock" className="d-block my-4 w-100 p-2"
                            onChange={handleChangeInput} />
                        </div>
                    </div>

                    <textarea name="description" id="description" cols="30" rows="4" 
                    placeholder="Description" className="d-block my-4 w-100 p-2"
                    onChange={handleChangeInput} />

                    <textarea name="content" id="content" cols="30" rows="6" 
                    placeholder="Content" className="d-block my-4 w-100 p-2"
                    onChange={handleChangeInput} />

                </div>

                
                <div className="col-md-6">
                    
                </div>
            </form>

        </div>
    )
}

export default ProductsManager