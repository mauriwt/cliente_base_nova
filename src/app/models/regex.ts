export class ExpRegular {
    public static decimal = "^[0-9]+(\.[0-9]{1,2})?$";
    public static entero = "^[0-9]*$";
    public static numerominmax = "^[0-9]{9,10}$";
    public static pArterial = "^([0-9]{1,3})\/([0-9]{1,3})?$";
    public static letras = "^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]*$";
    public static email = "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"



    //mensajes
    public static mdecimal = "El campo solo permite números enteros y decimales.";
    public static mentero = "El campo solo permite números enteros.";
    public static mletras = "El campo solo permite letras.";
    public static mtelf = "El teléfono debe tener entre 9 y 10 dígitos sin carácteres especiales.";
    public static m_email = "El correo electrónico ingresado no es válido";
    
    constructor() {}
}