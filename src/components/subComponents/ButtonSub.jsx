
export default function ButtonSub({onClick}) {
  return (
    <>
        <button
          className="bg-white border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-50 hover:text-blue-600 transition duration-200"
          type="button" 
          onClick={onClick}
          >
          simpanNama
        </button>
    </>
    )
}