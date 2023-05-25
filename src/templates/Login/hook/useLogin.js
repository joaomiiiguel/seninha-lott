import { useEffect, useState } from "react";
import { signInWithPhoneNumber, RecaptchaVerifier, getAuth, updateProfile } from "firebase/auth";
import { auth } from "../../../services/firebase";


import { selectUser, changeUser } from "../../../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';

export const useLogin = () => {
    const [nameUser, setNameUser] = useState('')
    const [emailUser, setEmailUser] = useState('')
    const [stepRegister, setStepRegister] = useState(0)
    const [phone, setPhone] = useState(0)
    const [loadingLogin, setLoadingLogin] = useState(false)
    const [otp, setOTP] = useState('')
    const dispatch = useDispatch();
    const { isLogged } = useSelector(selectUser)
    const router = useRouter();

    if(isLogged){
        router.push('/')
    }

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
                'size': 'invisible',
                'callback': (response) => {
                    onSignIn()
                }
            }, auth);
        }
    }

    async function onSignIn() {
        setLoadingLogin(true)
        onCaptchVerify()

        const appVerifier = window.recaptchaVerifier
        const formatPhone = '+' + phone

        signInWithPhoneNumber(auth, formatPhone, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoadingLogin(false)
                setStepRegister(1)
                console.log('Sended Code');
            })
            .catch((error) => {
                console.log(error);
                window.recaptchaVerifier.render().then(function (widgetId) {
                    grecaptcha.reset(widgetId);
                });
                setLoadingLogin(false)

            })
    }

    function onOTPVerify() {
        setLoadingLogin(true)
        window.confirmationResult.confirm(otp)
            .then(async (response) => {
                const user = auth.currentUser;
                const dataUser = {
                    displayName: response.user.displayName,
                    email: response.user.email,
                    emailVerified: response.user.emailVerified,
                    phoneNumber: response.user.phoneNumber,
                    photoURL: response.user.photoURL,
                    uid: response.user.uid ,
                }
                console.log(dataUser);
                localStorage.setItem("userKey", JSON.stringify(dataUser));

                if (response._tokenResponse.isNewUser === true) {
                    setStepRegister(2)
                }

                console.log(isLogged);
                dispatch(changeUser(dataUser))
                console.log(isLogged);
                setLoadingLogin(false)
            })
            .catch((error) => {
                console.log(error);
                setLoadingLogin(false)
            })
    }

    function lastStepRegister() {
        setLoadingLogin(true)
        const auth = getAuth();


        updateProfile(auth.currentUser, {
            displayName: nameUser
        }).then(() => {
            dispatch(changeUser(auth.currentUser))
            setLoadingLogin(false)

        }).catch((error) => {
            console.log(error);
            setLoadingLogin(false)
        });
    }

    useEffect(() => {
    }, [])

    return { nameUser, setNameUser, emailUser, setEmailUser, phone, setPhone, onSignIn, otp, setOTP, loadingLogin, onOTPVerify, stepRegister, lastStepRegister }
}