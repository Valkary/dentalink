import { Input } from "@chakra-ui/input"

const FormInput = ({ show, placeholder }) => {
  return (
    <Input
      type={show ? "text" : "password"} 
      placeholder={placeholder} 
      variant="flushed" 
    />
  )
}

export default FormInput;