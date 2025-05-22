
export default function InputSub({label, required, onChange, button}) {
  return (
      <>
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          <i className="fas fa-lock mr-2"></i>{label}
        </label>
        <div className="relative">
          <input
          onChange={onChange}
            type="text"
            id="name"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10"
            required={required}
            />
        </div>
        {button}
        </>
    )
}