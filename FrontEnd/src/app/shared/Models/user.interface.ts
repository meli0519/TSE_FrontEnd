export interface UserI{
    id_usuario:number;
    nombre: string; 
    apellidos:string;
    sexo:number;
    cedula:string;
    fecha:Date;
    departamento:number;
    correo: string;
    celular: string;
    distrito:number;
    pasword: string;
    foto: string;
    canton: string;
    provincia: string;
}

export interface UserIEnv{
    id:number;
    nombre: string; 
    apellidos:string;
    id_sexo:number;
    cedula:string;
    fechaNacimiento:Date;
    id_departamento:number;
    correo: string;
    celular: string;
    id_distrito:number;
    pasword: string;
    foto: string;

}
