import validator from "validator";

export const isValid = (email, password)=>{
    //CHECK FOR A VALID EMAIL
    if (!validator.isEmail(email)) {
        return 'Enter valid email'
    }
     //EXAMPLE PWD : Nimsara123@
     if (!validator.isStrongPassword(password)) {
        return 'Minimum 8 characters password contains a Uppercase and lowercase letter and Special Character required!'
    }
    return 0;

}