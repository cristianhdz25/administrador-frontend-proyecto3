import { UserPlus } from "phosphor-react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "keep-react";


const ModalComponent = ({ modal, closeModal, buttonText, sendForm, children, form }) => {
  return (
    <Modal isOpen={modal} >

      <ModalBody className="space-y-3 p-6 max-w-xl w-full">
        <div className="flex justify-center mb-3">
          {form ?
            <UserPlus size={36} color="#1B4DFF" /> :
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path fill="#0284c7" d="M8 18h8v-2H8zm0-4h8v-2H8zm-4 8V2h10l6 6v14zm9-13V4H6v16h12V9zM6 4v5zv16z" /></svg>
          }
        </div>
        {form ?
          <h1 className="text-center text-2xl font-bold text-white mb-3">Registrar Comercio</h1>
          :
          <h1 className="text-center text-2xl font-bold text-white mb-3">Detalles del Comercio</h1>
        }
      
        <form className="form-group" onSubmit={sendForm} noValidate>
          <ModalContent className="min-h-[300px]">
            {children}
          </ModalContent>
          <ModalFooter className="mt-6">
            <Button
              onClick={() => closeModal()}
              variant="outline"
              className="mr-4 px-6 py-2"
            >
              Cerrar
            </Button>
            {form && <Button type="submit" className="px-6 py-2">{buttonText}</Button>}
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ModalComponent;
