
'use client'
import { Check, X } from 'phosphor-react'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalIcon } from 'keep-react'

export const AlertComponent = ({modal,titulo, texto, tipo, closeModal}) => {

  return (
    
      <Modal isOpen={modal} onClose={() => closeModal()}>
        <ModalBody className="flex w-[30rem] flex-col items-center p-6 lg:p-8 text-white">
        {
            tipo === 'success' ?
            <ModalIcon className="h-20 w-20 border border-success-100 bg-success-50 text-success-500">
            <Check size={60} />
            </ModalIcon>
            : 
            <ModalIcon className="h-20 w-20 border border-error-100 bg-error-50 text-error-500">
            <X size={60} />
            </ModalIcon>
        }
          
           <ModalContent className="my-4 text-center">
            <h3 className="mb-2 text-body-1 font-bold ">{titulo}</h3>
            <p className="mx-auto max-w-xs text-body-4 font-normal text-metal-200">
             {texto}
            </p>
          </ModalContent>
          <ModalFooter>
          <Button onClick={() => closeModal()} size="sm" color={tipo === 'success' ? 'success' : 'error'}>
                {tipo === 'success' ? 'Aceptar' : 'Cerrar'}
            </Button> 
          </ModalFooter>
        </ModalBody>
      </Modal>
  )
}

export default AlertComponent;


