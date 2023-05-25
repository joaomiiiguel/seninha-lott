import React from "react";
import OtpInput from 'react-otp-input';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Image from "next/image";


import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import { ButtonComp } from "@/components/Button";
import { useLogin } from "./hook/useLogin";
import CapaImage from '../../../public/capa.webp'

export const LoginPage = () => {
    const { nameUser, setNameUser, phone, setPhone, onSignIn, otp, setOTP, loadingLogin, onOTPVerify, stepRegister, lastStepRegister } = useLogin()

    return (
        <div className="fixed bottom-0 flex flex-col w-screen h-screen items-center justify-center">
            <Image src={CapaImage} alt="Capa" className="fixed top-2 w-auto h-[30vh] max-w-sm" />
            {stepRegister === 0 &&
                <div className="flex flex-col bg-green-900  w-11/12 md:w-7/12 lg:w-4/12 h-[60vh] pt-10 absolute bottom-0 items-center pb-28 rounded-t-xl shadow-2xl">
                    <p className="w-full font-bold pb-6 text-center divide-y border-b text-white" > Entrar ou cadastrar-se</p >
                    <p className="text-xl py-4 font-bold text-white">Bem-vindo ao <strong>BOLÃO LOTT</strong></p>
                    <div className="flex flex-col items-center justify-center p-10 text-center ">
                        <PhoneInput
                            country={'br'}
                            preferredCountries={['br']}
                            value={phone}
                            onChange={(phone) => setPhone(phone)}
                            inputProps={{
                                name: 'phone'
                            }}
                            masks={{ br: '(..) .....-....' }}
                        />
                        <p className="mb-4 text-justify text-[10px] opacity-50 text-white">Ligaremos ou enviaremos uma mensagem para confirmar seu número. Podem ser aplicadas tarifas padrão de dados e mensagens.</p>
                    </div>
                    <div className="w-full px-10">
                        {loadingLogin ?
                            <ButtonComp>
                                <CircularProgress color="inherit" size={24} />
                            </ButtonComp>
                            :
                            <ButtonComp onClick={() => onSignIn()} disabled={phone.length >= 13 ? false : true}>
                                Continuar
                            </ButtonComp>
                        }
                    </div>

                    <div id='sign-in-button'></div>
                </div>
            }
            {stepRegister === 1 &&
                <div className="flex flex-col bg-green-900 w-11/12 md:w-7/12 lg:w-4/12 h-[60vh] pt-10 absolute bottom-0 items-center pb-28 rounded-t-xl shadow-2xl">
                    <p className="w-full font-bold pb-6 text-center divide-y border-b uppercase text-white" >Confirme seu número</p >
                    <div className="flex pt-6 flex-col items-center justify-center px-6 text-center w-11/12 md:w-4/6 space-y-6">
                        <p className="text-base font-semibold text-white">Insira o código que enviamos por SMS para</p>
                        <p className="text-lg font-bold text-white">+{phone}</p>
                        <OtpInput
                            inputStyle={{ margin: 5, padding: 10, borderWidth: 1, borderRadius: 5, width: 30, borderColor: 'gray' }}
                            inputType="number"
                            value={otp}
                            onChange={setOTP}
                            numInputs={6}
                            renderInput={(props) => <input {...props} />}
                        />
                    </div>
                    <div className="w-full p-10">
                        {loadingLogin ?
                            <ButtonComp>
                                <CircularProgress color="inherit" size={24} />
                            </ButtonComp>
                            :
                            <ButtonComp onClick={() => onOTPVerify()} disabled={otp.length < 6 ? true : false}>
                                Entrar
                            </ButtonComp>
                        }
                    </div>
                </div>
            }
            {stepRegister === 2 &&
                <div className="flex flex-col bg-green-900 w-11/12 md:w-7/12 lg:w-4/12 h-[60vh] pt-10 absolute bottom-0 items-center pb-28 rounded-t-xl shadow-2xl">
                    <p className="w-full font-bold pb-6 text-center divide-y border-b uppercase text-white" >Finalizar o Cadastro</p >
                    <form className="flex p-10 flex-col items-center justify-center text-center w-full space-y-6">
                        <p className="text-sm text-white">Finalize o cadastro com o seu nome</p>
                        <TextField id="name" required label="Nome" type="text" variant="outlined" size="small" fullWidth value={nameUser} onChange={(e) => setNameUser(e.target.value)} />
                        <div className="w-full">
                            {loadingLogin ?
                                <ButtonComp>
                                    <CircularProgress color="inherit" size={24} />
                                </ButtonComp>
                                :
                                <ButtonComp onClick={() => lastStepRegister()} disabled={nameUser.length < 4 ? true : false}>
                                    cadastrar
                                </ButtonComp>
                            }
                        </div>
                    </form>
                </div>
            }
        </div >
    )
}