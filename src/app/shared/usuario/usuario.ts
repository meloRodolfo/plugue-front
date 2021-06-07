export class Usuario {
    id!: Number
    contato!: String
    senha!: String
    tipoUsuario!: String

    constructor(json?: Usuario) {
        Object.assign(this, json)
    }
}
