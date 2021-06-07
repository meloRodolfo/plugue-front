import { Aluno } from "../aluno/aluno"


export class Ideia {
    id!: Number
    areaInteresse!: String
    descricao!: String
    titulo!: String
    aluno!: Aluno
    professores!: Array<any>

    constructor(json?: Ideia) {
        Object.assign(this, json)
    }
}