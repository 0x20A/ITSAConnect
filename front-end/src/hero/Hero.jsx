import { Link } from "react-router-dom"
import RotatingText from "../common/RotatingText"
import Magnet from "../common/Magnet"
import logo from '../resources/imgs/ITSAConnect Logo.svg';
import Masonry from "../common/Masonry";


export const Hero = () => {

  const data = [
  { id: 1, image: 'https://scontent.fntr6-2.fna.fbcdn.net/v/t39.30808-6/480281414_928955746084682_2012910619724648125_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Ad_X0NUhk_YQ7kNvwGSMn6o&_nc_oc=AdkP6lp0U1ShZaJp2XNb-4EzPik9lYbB0w9zJWGKDO8hNpNpXIeXFbOwbCJcaW5VCmAjq4rrzd8dYFeacf82DgGT&_nc_zt=23&_nc_ht=scontent.fntr6-2.fna&_nc_gid=dAdQmv9yDUGmIDiB3Ja4OQ&oh=00_AfJdT78ley9rF3XmdHA0ckdUMT7YPn1yzrgrpBPB9tX1PA&oe=68307CCA', height: 400 },
  { id: 2, image: 'https://scontent.fntr6-2.fna.fbcdn.net/v/t39.30808-6/484453370_948482410798682_7606262661690779806_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=rQrP7f2cdaYQ7kNvwH4W8Y6&_nc_oc=AdmqwNQCss1i5qVWzj90QIbQqC7GAgoYQ15_yf1RWP-6NViqeYVLijm5zR9NAVyz9Tenw6sD-Z6opm5Nh0eru7gf&_nc_zt=23&_nc_ht=scontent.fntr6-2.fna&_nc_gid=f2wmC1ntzdRXziQk3nr9CA&oh=00_AfKLLTpitHdcteFrcU22c3_0-E6omkAtbYGCaBBCPGQaTg&oe=68307A30', height: 300 },
  { id: 3, image: 'https://scontent.fntr6-4.fna.fbcdn.net/v/t39.30808-6/484362742_948488554131401_6997293299147091408_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=1e9qnl-9HBMQ7kNvwEh7BHV&_nc_oc=AdlD-Y8CnwW0L5-VGLqpB11fVXhtgHO6fBLgDD-fUwqApXcCcp3H3rMwfTRwG98VIOAigx66-k3Cud-ASq7Jfxg3&_nc_zt=23&_nc_ht=scontent.fntr6-4.fna&_nc_gid=yGWkouhc05lBgqyBpDUWcQ&oh=00_AfLCj-URkYaGIckWeXdMXWhQ8TRMWSocyQDSLFAFsWDvRQ&oe=68308E80', height: 300 },
  { id: 4, image: 'https://scontent.fntr6-2.fna.fbcdn.net/v/t39.30808-6/488575466_962796106033979_1835222623752809547_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=KKt_UABMJ9IQ7kNvwH-u-3t&_nc_oc=Adn8TneZhB5hebl-Ub5y0C1CZUmeZzrdvsNXUFWhQpsreBl1LTZyUTv6zmJeEYLdY0Ss6aUPq3i9lUuPM9as8s4D&_nc_zt=23&_nc_ht=scontent.fntr6-2.fna&_nc_gid=mhxeIQkbqNME0I7Mtcscxw&oh=00_AfKrndUDvgq8sVvIWy_-grxBF1Dw36yimdBs3l88Ko668A&oe=683076BE', height: 300 },
  { id: 5, image: 'https://scontent.fntr6-2.fna.fbcdn.net/v/t39.30808-6/489958467_966554095658180_8294847060295176438_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=IWFosxFKIrUQ7kNvwFkfuKr&_nc_oc=Adk20RrfIlCxs2BijO9ARtdtGjsWMqcTZhfUIN7w5Be2wRwXuWvwr4OgwqOgq9oyx1Ht4o7B4_HzdJQu7OAfxTA5&_nc_zt=23&_nc_ht=scontent.fntr6-2.fna&_nc_gid=Dwy7RrCnuvfSEL1xhKamGw&oh=00_AfISFwkOzcWNpFTW30Aiods_43uO96IJiDdcz2qToVLzmw&oe=683088C2', height: 300 },
  { id: 6, image: 'https://imgs.search.brave.com/nzM9Nsj9qxzR8OiovEHGfQ6U3u0KIUjmIzWjK-8jRKc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91bml2/ZXJzaWRhZGVzZ3Jh/dHVpdGFzLmNvbS9z/dG9yYWdlLzIwMjQv/MDIvU2VkZS1kZWwt/SW5zdGl0dXRvLVRl/Y25vbG9naWNvLVN1/cGVyaW9yLWRlLUNp/dWRhZC1BY3VuYS5w/bmc', height: 400 },
  { id: 7, image: 'https://scontent.fntr6-4.fna.fbcdn.net/v/t39.30808-6/490019100_968728738774049_7512147743944920949_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=X3NmE3EisFUQ7kNvwE_2g38&_nc_oc=AdkW0GD3Qg1X7xoE1p8DZ9fCuKlln4wOXWrD81OXknOPN43F5lveeTsIRTKj2RnFRt1rHPuIINjUfWL_UgAcpcqT&_nc_zt=23&_nc_ht=scontent.fntr6-4.fna&_nc_gid=r38F5u2c-usuJmAlFeQnhA&oh=00_AfIP1CzsltdgppaGecfqpYPtGTQ6B8mlV6IAWfV3w6YHxA&oe=68308EC7', height: 200 },
  { id: 8, image: 'https://scontent.fntr6-1.fna.fbcdn.net/v/t39.30808-6/493661881_978461331134123_6226098029134960555_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=eRT3Ue1giwUQ7kNvwGkYOUK&_nc_oc=Adkmc9EmatFRr9HBnRsQ1GjCsv-hm4V3G8CTmwXEtNLHzpHVw0BXrg3cEy8aiGf4rir99eM-h-GiJh6ecd0p5lr6&_nc_zt=23&_nc_ht=scontent.fntr6-1.fna&_nc_gid=v97boMe9T8cnXic7TZ32ZQ&oh=00_AfJ_aBP1s3uFuFpwonUB-6_75SUCITef8bNOIQA0ZtSCFg&oe=6830A52D', height: 300 },
  { id: 9, image: 'https://scontent.fntr6-3.fna.fbcdn.net/v/t39.30808-6/494246047_982191994094390_1806071460858906519_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=yxj0nppHajcQ7kNvwGMAghO&_nc_oc=AdnsZEm9LgLw-DHYSBYaaoc9LAdWoWsSvkrbgkR2y5tqT-XuYMTNgdsyo5joESz7oqO2CG8pggqd4zNimYW0PzOf&_nc_zt=23&_nc_ht=scontent.fntr6-3.fna&_nc_gid=NpzhIQbXK2HsEVcEDgB7AQ&oh=00_AfKrnrRgpr7HX0hFDLPvmnqcaJq4_zCUiB3J0Rej5cEVWg&oe=6830A44F', height: 400 },
  { id: 10, image: 'https://scontent.fntr6-2.fna.fbcdn.net/v/t39.30808-6/497551230_992449109735345_7370042774197242595_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=j_iJTH8kysAQ7kNvwHtarHL&_nc_oc=AdluuHqgdCwYm1mJzKqr3Z0HD7QVuGfe10TIxoabZEb-JU9WqZ5e5nSSeg8Xr-AX7sB_NQ_7Xv6RjPWw-mwvHHqB&_nc_zt=23&_nc_ht=scontent.fntr6-2.fna&_nc_gid=IW3ltJRaxQlPdZdTkdKgww&oh=00_AfLmVVcpUNnF2F7_0nP79EnveLzq45laKMmhfpSxCjvhhg&oe=68309E38', height: 300 }
];

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
          <a href="/about" className="text-xl hover:underline">Acerca de</a>
          <a href="/contact" className="text-xl hover:underline">Contacto</a>
          <a href="/privacy" className="text-xl hover:underline">Privacidad</a>
        </div>
      </div>
    </footer>
    </>
  )
}