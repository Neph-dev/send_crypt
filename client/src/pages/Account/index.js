import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import { API_URL } from '../../service/API_URL'

// import Spinner from 'react-bootstrap/Spinner'
import '../../styles/globalStyles.css'
import '../../styles/registerUserStyles.css'
import '../../styles/accountStyles.css'
import { BiArrowBack } from 'react-icons/bi'


const Account = () => {

    const navigate = useNavigate()
    const user_id = localStorage.getItem('user_id')
    const user_avatar = localStorage.getItem('user_avatar')

    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        verificationCode: ''
    })
    const [errorMessage, setErrorMessage] = useState({
        verifyEmail: undefined,
        updateEmail: undefined,
        updatePassword: undefined
    })
    const [successMessage, setSuccessMessage] = useState({
        verifyEmail: undefined,
        updateEmail: undefined,
        updatePassword: undefined
    })
    const [emailVerified, setEmailVerified] = useState()
    const [avatars, setAvatars] = useState()
    const [selectedAvatar, setSelectedAvatar] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isSavingAvatar, setIsSavingAvatar] = useState(false)

    useEffect(() => {
        axios.get(`${API_URL}users/${user_id}`)
            .then((response) => {
                setEmailVerified(response?.data?.data?.user?.emailVerified)
                setSelectedAvatar(response?.data?.data?.user?.avatar)
                setInputs({
                    ...inputs,
                    email: response?.data?.data?.user?.email.toUpperCase(),
                    username: response?.data?.data?.user?.username.toUpperCase(),
                })
            })
            .catch((error) => console.error(error))

        axios.get(`${API_URL}avatars`)
            .then((response) => {
                setAvatars(response?.data?.data?.avatars)
            })
            .catch((error) => {
                console.error(error)
            })
        // eslint-disable-next-line
    }, [])


    const handleChangeEmail = (e) => {
        setInputs({ ...inputs, email: e.target.value.toUpperCase() })
    }

    const handleChangeVerificationCode = (e) => {
        setInputs({ ...inputs, verificationCode: e.target.value.toUpperCase() })
    }

    const handleChangeOldPassword = (e) => {
        setInputs({ ...inputs, oldPassword: e.target.value })
    }

    const handleChangeNewPassword = (e) => {
        setInputs({ ...inputs, newPassword: e.target.value })
    }

    const handleChangeConfirmPassword = (e) => {
        setInputs({ ...inputs, confirmPassword: e.target.value })
    }

    const updatePassword = async (e) => {
        e.preventDefault()
        const data = {
            oldPassword: inputs.oldPassword,
            newPassword: inputs.newPassword
        }

        await axios.post(`${API_URL}password/update-password/${user_id}`, data)
            .then((response) => {
                if (response.data.success === false) {
                    setErrorMessage({ ...inputs, updatePassword: response.data.message })
                }
                else setSuccessMessage({ ...inputs, updatePassword: 'Updated' })
            })
            .catch((error) => {
                console.log(error)
                setErrorMessage({ ...inputs, updatePassword: 'Failed' })
            })
    }

    const updateAvatar = async () => {
        setIsSavingAvatar(true)

        const data = { avatar: selectedAvatar }

        await axios.post(`${API_URL}users/update-avatar/${user_id}`, data)
            .then(() => {
                setIsSavingAvatar(false)
                localStorage.setItem('user_avatar', selectedAvatar)
                window.location.reload()
            })
            .catch((error) => {
                console.error(error)
                setIsSavingAvatar(false)
            })
    }

    const updateEmail = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const data = { email: inputs.email.toLowerCase() }

        // update email address
        await axios.post(`${API_URL}users/update-email/${user_id}`, data)
            .then(() => {
                setIsLoading(false)
                setSuccessMessage({ ...inputs, updateEmail: 'Code sent' })
            })
            .catch((error) => {
                console.error(error)
                setSuccessMessage({ ...inputs, updateEmail: 'Failed' })
                setIsLoading(false)
            })
    }

    const verifyEmail = async () => {
        setIsLoading(true)
        const data = {
            email: inputs.email.toLowerCase(),
            verificationCode: inputs.verificationCode.toUpperCase()
        }

        await axios.post(`${API_URL}users/verify-email/${user_id}`, data)
            .then(() => {
                setIsLoading(false)
                setSuccessMessage({ ...inputs, verifyEmail: 'Success' })
            })
            .catch(() => {
                setIsLoading(false)
                setErrorMessage({ ...inputs, verifyEmail: 'Failed' })
            })
    }

    if (errorMessage.verifyEmail !== undefined) {
        setTimeout(() => {
            setErrorMessage({ ...inputs, verifyEmail: undefined })
        }, 4000)
    }
    if (errorMessage.updateEmail !== undefined) {
        setTimeout(() => {
            setErrorMessage({ ...inputs, updateEmail: undefined })
        }, 4000)
    }
    if (errorMessage.updatePassword !== undefined) {
        setTimeout(() => {
            setErrorMessage({ ...inputs, updatePassword: undefined })
        }, 4000)
    }

    if (successMessage.verifyEmail !== undefined) {
        setTimeout(() => {
            setSuccessMessage({ ...inputs, verifyEmail: undefined })
            window.location.reload()
        }, 4000)
    }
    if (successMessage.updateEmail !== undefined) {
        setTimeout(() => {
            setSuccessMessage({ ...inputs, updateEmail: undefined })
            window.location.reload()
        }, 4000)
    }
    if (successMessage.updatePassword !== undefined) {
        setTimeout(() => {
            setSuccessMessage({ ...inputs, updatePassword: undefined })
            window.location.reload()
        }, 4000)
    }

    const disableUpdateButton = () => {
        if (!inputs.oldPassword ||
            (inputs.newPassword !== inputs.confirmPassword) ||
            !inputs.newPassword || !inputs.confirmPassword) return true
        else return false
    }

    return (
        <form id='account'>
            <BiArrowBack
                onClick={() => navigate('/main')}
                size={40}
                className='account-back-btn' />
            {!avatars ?
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <div className='txn-sending'> Loading...</div>
                </div>
                :
                <>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <div className='register-select-avatar-section'>
                            <div style={{ width: '90%', alignItems: 'center' }}>
                                <div className='medium-separator' />

                                <div>
                                    <img src={selectedAvatar}
                                        alt=''
                                        className='register-selected-avatar' />

                                    <div className='small-separator' />

                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <button
                                            disabled={selectedAvatar !== user_avatar
                                                || isSavingAvatar === true
                                                ? false : true}
                                            onClick={updateAvatar}
                                            className='change-avatar-save-btn'>
                                            Save
                                        </button>
                                        {isSavingAvatar &&
                                            <div className='txn-sending'> Saving...</div>
                                        }
                                    </div>

                                </div>

                                <div className='medium-separator' />

                                <div className='register-avatar-list'>
                                    {avatars?.map((item, index) => (
                                        <div key={index}>
                                            <img
                                                alt=''
                                                style={{ border: 'red' }}
                                                onClick={() => setSelectedAvatar(item?.link)}
                                                src={item?.link}
                                                className='register-avatar-element' />
                                            <div className='small-separator' />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className='register-inputs-container'>
                            <div style={{ width: 500 }}>
                                <div className='register-input-container'>
                                    <div className='register-input-label'>
                                        USERNAME_ <b style={{ color: '#b2beb5', marginLeft: 10 }}></b>
                                    </div>
                                    <input
                                        disabled
                                        name='username'
                                        className='account-input'
                                        value={inputs.username}
                                        placeholder='Type in a cool username'
                                        maxLength={100}
                                        autoFocus />
                                </div>
                                <div className='medium-separator' />

                                <div className='register-input-container'>
                                    <div className='register-input-label'>EMAIL_</div>
                                    <input
                                        name='email'
                                        value={inputs.email}
                                        className='account-input'
                                        onChange={handleChangeEmail}
                                        style={{ marginLeft: 10 }}
                                        placeholder='Type in a valid email address' />
                                    {isLoading === true ?
                                        <div className='txn-sending'> Updating...</div>
                                        :
                                        errorMessage.updateEmail !== undefined ?
                                            <div className='txn-sending' style={{ color: 'red' }}>
                                                {errorMessage.updateEmail}
                                            </div>
                                            :
                                            successMessage.updateEmail !== undefined ?
                                                <div className='txn-sending' style={{ color: '#33b53f' }}>
                                                    {successMessage.updateEmail}
                                                </div>
                                                :
                                                <button
                                                    onClick={updateEmail}
                                                    className='account-verification-btn'>
                                                    Update
                                                </button>}
                                </div>
                                <div className='medium-separator' />
                                {emailVerified === false && (
                                    <>
                                        <div className='register-input-container'>
                                            <div className='register-input-label'
                                                style={{ width: '35%' }}>
                                                VERIFICATION CODE_
                                            </div>
                                            <input
                                                name='verificationCode'
                                                value={inputs.verificationCode}
                                                className='account-input'
                                                onChange={handleChangeVerificationCode}
                                                style={{ marginLeft: 10 }}
                                                placeholder='Type in the verification code' />
                                            {isLoading === true ?
                                                <div className='txn-sending'> Verifying...</div>
                                                :
                                                errorMessage.verifyEmail !== undefined ?
                                                    <div className='txn-sending' style={{ color: 'red' }}>
                                                        {errorMessage.verifyEmail}
                                                    </div>
                                                    :
                                                    successMessage.verifyEmail !== undefined ?
                                                        <div className='txn-sending' style={{ color: '#33b53f' }}>
                                                            {successMessage.verifyEmail}
                                                        </div>
                                                        :
                                                        <button
                                                            onClick={verifyEmail}
                                                            className='account-verification-btn'>
                                                            Verify
                                                        </button>
                                            }
                                        </div>
                                        <div className='medium-separator' />
                                    </>)}

                                <div className='medium-separator' />

                                <div className='account-title'>Change Password Information</div>

                                <div className='small-separator' />

                                <div className='register-input-container'>
                                    <div className='register-input-label'>OLD PASSWORD_</div>
                                    <input
                                        name='password'
                                        value={inputs.oldPassword}
                                        onChange={handleChangeOldPassword}
                                        className='account-input'
                                        style={{ marginLeft: 10 }}
                                        placeholder='Old password' />
                                </div>
                                <div className='medium-separator' />

                                <div className='register-input-container'>
                                    <div className='register-input-label'>NEW PASSWORD_</div>
                                    <input
                                        name='password'
                                        value={inputs.newPassword}
                                        onChange={handleChangeNewPassword}
                                        className='account-input'
                                        style={{ marginLeft: 10 }}
                                        placeholder='New password' />
                                </div>
                                <div className='medium-separator' />

                                <div className='register-input-container'>
                                    <div className='register-input-label'
                                        style={{ width: '40%' }}>
                                        CONFIRM PASSWORD_
                                    </div>
                                    <input
                                        name='confirmPassword'
                                        value={inputs.confirmPassword}
                                        onChange={handleChangeConfirmPassword}
                                        className='account-input'
                                        style={{ marginLeft: 10 }}
                                        placeholder='Confirm new password' />
                                    {isLoading === true ?
                                        <div className='txn-sending'> Verifying...</div>
                                        :
                                        errorMessage.updatePassword !== undefined ?
                                            <div className='txn-sending' style={{ color: 'red' }}>
                                                {errorMessage.updatePassword}
                                            </div>
                                            :
                                            successMessage.updatePassword !== undefined ?
                                                <div className='txn-sending' style={{ color: '#33b53f' }}>
                                                    {successMessage.updatePassword}
                                                </div>
                                                :
                                                <button
                                                    disabled={disableUpdateButton()}
                                                    style={{ color: disableUpdateButton() && '#b2beb5' }}
                                                    onClick={updatePassword}
                                                    className='account-verification-btn'>
                                                    Update
                                                </button>}
                                </div>

                                <div className='medium-separator' />
                                <div className='medium-separator' />

                                {/* <button
                                onClick={handleSubmit}
                                className='send-button'
                                disabled={(inputs.email === '' || inputs.username === '') ? true : false}
                                type='submit'>
                                {isLoading === true ? <Spinner variant='light' /> : 'Update'}
                            </button> */}
                            </div>
                        </div>
                    </div>
                </>
            }
        </form>
    )
}

export default Account