export const validateEmail = (email: string): string | undefined => {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9–]+(?:\.[a-zA-Z0-9–]+)*$/;
  if(!email.length || !validRegex.test(email)){
    return 'Oops, ingresa un email válido';
  }
}

export const validatePassword = (password: string): string | undefined => {
  if(password.length < 5){
    return 'Oops, ingresa una contraseña de al menos 5 caracteres';
  }
}

export const validateName = (name: string): string | undefined => {
  if(!name.length){
    return 'Oops, ingresa un valor';
  }
}
