import { Modal, ModalBody, ModalHeader, ThemeConfig } from "flowbite-react";

export const ModalPrivacy = ({ open, onClose }) => {

  return (
    <>
    <ThemeConfig dark={false} />
      <Modal show={open} onClose={onClose}>
        <ModalHeader>Política de privacidad</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <p className="text-2xl leading-relaxed ">
              Ultima actualización: 30/05/2025
            </p>
            <p className="text-1xl leading-relaxed ">
              En ITSAConnect, valoramos tu privacidad. Recopilamos únicamente la información necesaria para brindarte nuestros servicios, como tu nombre, matrícula institucional, correo electrónico y actividad en la plataforma. <br /> <br />
              Esta información se utiliza exclusivamente para: <br />
              &middot; Permitir interacción en publicaciones. <br />
              &middot; Mejorar la experiencia del usuario. <br /> <br />
              Nunca compartiremos tu información con terceros sin tu consentimiento. <br /> <br />
              Puedes solicitar la eliminación de tu cuenta y datos personales escribiendo a nuestro correo de contacto.
            </p>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
