import { Link } from "react-router-dom"
import RotatingText from "../common/RotatingText"
import Magnet from "../common/Magnet"
import Masonry from "../common/Masonry";
import { useState } from "react";
import { ModalContact } from "./components/ModalContact";
import { ModalPrivacy } from "./components/ModalPrivacy";

export const Hero = () => {

  const data = [
    { id: 1, image: 'https://res.cloudinary.com/dj1flju4n/image/upload/v1748588554/tec8_nfcszz.jpg', height: 400 },
    { id: 2, image: 'https://res.cloudinary.com/dj1flju4n/image/upload/v1748588556/tec3_d0yboc.jpg', height: 300 },
    { id: 3, image: 'https://res.cloudinary.com/dj1flju4n/image/upload/v1748588554/tec6_gicdy4.jpg', height: 400 },
    { id: 4, image: 'https://imgs.search.brave.com/nzM9Nsj9qxzR8OiovEHGfQ6U3u0KIUjmIzWjK-8jRKc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91bml2/ZXJzaWRhZGVzZ3Jh/dHVpdGFzLmNvbS9z/dG9yYWdlLzIwMjQv/MDIvU2VkZS1kZWwt/SW5zdGl0dXRvLVRl/Y25vbG9naWNvLVN1/cGVyaW9yLWRlLUNp/dWRhZC1BY3VuYS5w/bmc', height: 400 },
    { id: 5, image: 'https://res.cloudinary.com/dj1flju4n/image/upload/v1748588555/tec1_cokulh.jpg', height: 300 },
    { id: 6, image: 'https://res.cloudinary.com/dj1flju4n/image/upload/v1748588554/tec5_m2dysa.jpg', height: 400 },
    { id: 7, image: 'https://res.cloudinary.com/dj1flju4n/image/upload/v1748588556/tec2_rakbca.jpg', height: 400 },
    { id: 8, image: 'https://res.cloudinary.com/dj1flju4n/image/upload/v1748588555/tec9_ro4ntq.jpg', height: 300 },
    { id: 9, image: 'https://res.cloudinary.com/dj1flju4n/image/upload/v1748588554/tec7_euqtto.jpg', height: 300 },
    { id: 10, image: 'https://res.cloudinary.com/dj1flju4n/image/upload/v1748588554/tec4_siekdg.jpg', height: 300 }
  ];

  const [showContactModal, SetShowContactModal] = useState(false);
  const [showPrivacyModal, SetShowPrivacyModal] = useState(false);

  return (
    <>
      <section className="h-screen flex-col items-center justify-center mb-60">
        <div className="text-center mt-[90px]">
          <h1 className="text-4xl font-bold tracking-normal">
            Una comunidad académica <br />
            donde puedes {' '} 
            <RotatingText
              texts={['compartir', 'descubrir', 'conectar']}
              mainClassName="inline-flex items-center bg-twitter text-white px-3 py-[2px] rounded-md text-4xl"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </h1>
        </div>

        <div className="text-center mt-14">
          <p className="text-2xl font-semibold">
            Conecta con la comunidad tecnológica y enterate de toda<br />
            la información necesaria para tener una mejor experiencia escolar.
          </p>
        </div>

        {/* boton de registro */}
        <div className="text-center mt-14">
          <Magnet padding={50} disabled={false} magnetStrength={3}>
            <Link to="/signup" className="btn-light py-2 font-bold text-2xl hover:bg-twitter hover:text-white normal-case">
              Registrate ahora
            </Link>
          </Magnet>
        </div>

        {/* fotos */}
        <div className="mt-14">
          <Masonry data={data} />
        </div>
      </section>

      {/* footer */}
      <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-xl">&copy; {new Date().getFullYear()} ITSAConnect. Todos los derechos reservados.</p>

        <div className="flex space-x-4 mt-3 md:mt-0">
          <button onClick={() => SetShowContactModal(true)} className="text-xl hover:underline">Contacto</button>
          <button onClick={() => SetShowPrivacyModal(true)} className="text-xl hover:underline">Privacidad</button>
        </div>
      </div>
    </footer>

    {/* modals */}
    <ModalContact open={showContactModal} onClose={() => SetShowContactModal(false)} />
    <ModalPrivacy open={showPrivacyModal} onClose={() => SetShowPrivacyModal(false)} />
    </>
  )
}