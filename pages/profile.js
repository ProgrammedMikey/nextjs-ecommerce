import Head from 'next/head' 
import { useState, useContext, useEffect } from 'react' 
import { DataContext } from '../store/GlobalState'

import valid from '../utils/valid'
import { patchData } from '../utils/fetchData' 
import { imageUpload } from '../utils/imageUpload'

const Profile = () => {
    const initialState = {
        avatar: '',
        name: '', 
        password: '',
        cf_password: '',
    }
    const [data, setData] = useState(initialState)
    const { avatar, name, password, cf_password} = data

    const {state, dispatch} = useContext(DataContext) 
    const { auth, notify } = state 

    useEffect(() => {
        if(auth.user) setData({...data, name: auth.user.name})
    }, [auth.user])

    const handleChange = (e) => {
        const { name, value } = e.target 
        setData({...data, [name]:value})
        dispatch({ type: 'NOTIFY', payload: {} })
    }

    const handleUpdateProfile = e => {
        e.preventDefault()
        if(password){
            const errMsg = valid(name, auth.user.email, password, cf_password)
            if(errMsg) return dispatch({ type: 'NOTIFY', payload: {error:errMsg} })
            updatePassword()
        }

        if(name !== auth.user.name || avatar) updateInfor()
    }

    const updatePassword = () => {
        dispatch({ type: 'NOTIFY', payload: {loading: true} })
        patchData('user/resetPassword', {password}, auth.token)
        .then(res => {
            if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
            dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
        })
    }

    const changeAvatar = (e) => {
        const file = e.target.files[0]
        if(!file) 
            return dispatch({ type: 'NOTIFY', payload: {error: 'File does not exist.'} })
        
        if(file.size > 1024 * 1024) //1mb
            return dispatch({ type: 'NOTIFY', payload: {error: 'Largest image size allowed is 1mb.'} })

        if(file.type !== "image/jpeg" && file.type !== "image/png") 
            return dispatch({ type: 'NOTIFY', payload: {error: 'Image format is incorrect.'} })

        setData({...data, avatar: file})
    }

    const updateInfor = async () => {
        let media;
        dispatch({ type: 'NOTIFY', payload: {loading: true} })

        if(avatar) media = await imageUpload([avatar])

        patchData('user', {
            name, avatar: avatar ? media[0].url : auth.user.avatar
        }, auth.token).then(res => {
            if(res.err) return  dispatch({ type: 'NOTIFY', payload: {error: res.err} })

            dispatch({type: 'AUTH', payload: {
                token: auth.token, 
                user: res.user
            }}) 
            dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
        })
    }

    if(!auth.user) return null; 
    return(
        <div className="profile_page">  
            <Head>
                <title>Profile</title>
            </Head>

            <section className="row text-secondary my-3">
                <div className="col-md-4">
                    <h3 className="text-center text-uppercase">
                        {auth.user.role === 'user' ? 'User Profile' : 'Admin Profile'}
                    </h3>

                    <div className="avatar">
                        <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt="avatar" />
                        <span>
                            <i className="fas fa-camera"></i>
                            <p>Change</p>
                            <input type="file" name="file" id="file_up" 
                            accept="image/*" onChange={changeAvatar} />
                        </span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={name} className="form-control" 
                        placeholder="Your name" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" defaultValue={auth.user.email} 
                        className="form-control" disabled={true} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <input type="password" name="password" value={password} className="form-control" 
                        placeholder="Your new password" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cf_password">Confirm New Password</label>
                        <input type="password" name="cf_password" value={cf_password} className="form-control" 
                        placeholder="Confirm new password" onChange={handleChange} />
                    </div>

                    <button className="btn btn-info" disabled={notify.loading}
                    onClick={handleUpdateProfile}>
                        Update
                    </button>

                </div>

                <div className="col-md-8">
                    <h3>Orders</h3>
                </div>
            </section>
        </div>
    )
}

export default Profile