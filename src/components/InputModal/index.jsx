const InputModal = ({label, type, name, value, onChange, placeholder}) => {
    return(
      <>
          <label htmlFor={name} className="text-bold">{label}</label>
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            id={name}
            required
           className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </>
    )
}

export default InputModal