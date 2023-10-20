import validator from "validator";

export const isValid = (email, password)=>{
    //CHECK FOR A VALID EMAIL
    if (!validator.isEmail(email)) {
        return 'Enter valid email'
    }
     //EXAMPLE PWD : Nimsara123@
     if (!validator.isStrongPassword(password)) {
        return 'A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required!'
    }
    return 0;

}