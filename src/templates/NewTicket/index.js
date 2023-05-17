import { BallNumber } from "@/components/BallNumber"
import { CardComp } from "@/components/Card"
import { ButtonDarkComp } from "@/components/ButtonDark"
import { useNewTicket } from "./hook/useNewTicket"
import CircularProgress from '@mui/material/CircularProgress';
import { AlertModal } from "@/components/Alert";
import Collapse from '@mui/material/Collapse';
import { PaymentPage } from "./Payment";
import Modal from '@mui/material/Modal';
import { IconButtonComp } from "@/components/IconButton";
import { X } from "@phosphor-icons/react";
import { useRouter } from 'next/router';


export const NewTicketPage = () => {
    const { loading, newTicket, listNumber, modalPayment, selectNumber, createNewTicket, modalAlert, setModalPayment } = useNewTicket()
    const router = useRouter();

    return (
        <div className='flex relative flex-col md:justify-around w-11/12 max-w-lg space-y-4 h-screen md:h-[80vh] md:pt-4'>
            <div className='flex flex-row justify-between w-full'>
                <p className='font-bold text-2xl text-green-900'>Nova Aposta</p>
                <IconButtonComp onClick={() => router.push('/')}>
                    <X size={20} />
                </IconButtonComp>
            </div>
            <CardComp>
                <p className="font-semibold w-full">Selecione 10 numeros</p>
                <div className='grid grid-cols-6 gap-y-4 gap-x-6 w-full'>
                    {listNumber?.map((number, index) => (
                        <div key={index}>
                            <button className="rounded-full" onClick={() => selectNumber(number)}>
                                {newTicket.includes(number) ?
                                    <BallNumber outlined={true} >{number}</BallNumber>
                                    :
                                    <BallNumber outlined={false} >{number}</BallNumber>
                                }
                            </button>
                        </div>
                    ))}
                </div>
            </CardComp>
            {loading ?
                <ButtonDarkComp>
                    <CircularProgress color="inherit" size={24} />
                </ButtonDarkComp>
                :
                <ButtonDarkComp
                    disabled={newTicket.length <= 9 ? true : false}
                    onClick={() => setModalPayment(true)}>
                    Fazer aposta
                </ButtonDarkComp>
            }
            <Modal
                open={modalPayment}
                onClose={() => setModalPayment(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <PaymentPage setModalPayment={setModalPayment} onClick={() => createNewTicket(newTicket)}/>
            </Modal>
            {modalAlert === 0 ?
                <Collapse in={false} className="absolute left-[25%] bottom-[10%]">
                    <AlertModal message={'Aposta cadastrada com sucesso!'} status={'success'} />
                </Collapse>
                :
                modalAlert === 1 ?
                <Collapse in={true} className="absolute left-[25%] bottom-[10%]">
                    <AlertModal message={'Aposta cadastrada com sucesso!'} status={'success'} />
                </Collapse>
                :
                <Collapse in={true} className="absolute left-[25%] bottom-[10%]">
                    <AlertModal message={'Limite máximo selecionado'} status={'warning'} />
                </Collapse>
            }
        </div>
    )
}