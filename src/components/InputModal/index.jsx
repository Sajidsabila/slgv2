 const InputModal = ({label, type, name, value, onChange, placeholder}) => {
    return(
      <>
          <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            id={name}
           className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </>
    )
}

export default InputModal

