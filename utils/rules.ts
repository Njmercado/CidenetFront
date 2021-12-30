export const TextFieldRules = () => {
  return {
    required: (value: any) => !!value || "Required",
    uppercase: (value: String) => {
      return value === value.toUpperCase() || "Debe estar en mayusculas";
    },
    counter: (value: String) => {
      return value.length <= 30 || "Máximo 30 caracteres";
    },
    numeric: (value: any) => {
      if(Number.parseInt(value) && value > 0) return true;
      return "Solo números";
    },
    email: (value: string) => {
      return /(\w|\d)+@(\w|\d)+/.test(value) || "Correo invalido"
    }
  }
}
