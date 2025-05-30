import { Modal, ModalBody, ModalHeader, ThemeConfig } from "flowbite-react";

export const ModalContact = ({ open, onClose }) => {

  return (
    <>
    <ThemeConfig dark={false} />
      <Modal show={open} onClose={onClose}>
        <ModalHeader>Contacto</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <p className="text-2xl leading-relaxed ">
              Si tienes dudas, comentarios o necesitas ayuda con tu cuenta, contáctanos:
            </p>
            <p className="text-1xl leading-relaxed ">
              Correo:&nbsp;
              <a href="mailto:2213s11221@cdacuna.tecnm.mx" className="text-blue-400 underline">2213s11221@cdacuna.tecnm.mx</a> <br />
              Dirección: TecNM - Campus Ciudad Acuña <br />
              Carretera Presa de la Amistad, Industrial, 26280 Cd Acuña, Coah.
            </p>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
