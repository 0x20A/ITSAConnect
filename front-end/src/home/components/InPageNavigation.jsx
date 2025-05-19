import { useRef, useState } from "react"

export const InPageNavigation = ({ routes }) => {

  let activeTabLineRef = useRef();

  const [inPageNavIndex, setInPageNavIndex] = useState(0);


  return (
    <>
      <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">

        {/* botones de las rutas de home */}
        {
          routes.map((route, i) => {
            return (
              <button 
                key={i} 
                className={"p-4 px-5 capitalize " + ( inPageNavIndex === i ? "text-black" : "text-dark-grey")}
              >
                { route }
              </button>
            )
          })
        }
        
        <hr ref={activeTabLineRef} className="absolute bottom-0 duration-300" />


      </div>
    </>
  )
}
