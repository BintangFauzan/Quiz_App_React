import { Children, useEffect, useRef } from "react"

export default function Modal({isOpenModal, word, component, nama, skor, nilaiSkor, namaUser}) {
    const dialog = useRef(null)

    useEffect(() => {
        if (isOpenModal){
            dialog.current.showModal()
        }else {
            dialog.current.close()
        }
    },[isOpenModal])

  return (
    <dialog ref={dialog} className="h-screen w-screen flex items-center justify-center bg-blue-200">
  <div className="p-8 rounded shadow-md w-full max-w-md bg-white text-center">
  <h2 className="text-center">{word}</h2>
  <p className="text-lg mb-2">{nama} {namaUser}</p>
  <p className="text-lg mb-4">{skor} {nilaiSkor}</p>
  {component}
  </div>
    </dialog>    
  )
}