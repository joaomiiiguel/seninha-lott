import { useEffect, useState } from "react";
import { signInWithPhoneNumber, RecaptchaVerifier, getAuth, updateProfile } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { useDispatch, useSelector } from "react-redux";
import { changeUser, selectUser } from "../../../redux/userSlice";

export const useLogin = () => {
    const [nameUser, setNameUser] = useState('')
    const [emailUser, setEmailUser] = useState('')
    const [stepRegister, setStepRegister] = useState(0)
    const [phone, setPhone] = useState(0)
    const [loadingLogin, setLoadingLogin] = useState(false)
    const [otp, setOTP] = useState('')
    const dispatch = useDispatch();

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
                console.log('Sended Code', stepRegister);
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
                console.log('Code verified');
                console.log(response);

                if (response.user.displayName === null) {
                    setStepRegister(2)
                }
                else {
                    dispatch(changeUser(response.user))
                }
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