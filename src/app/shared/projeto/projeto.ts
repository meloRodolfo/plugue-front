import { Aluno } from "../aluno/aluno"
import { Professor } from "../professor/professor"

export class Projeto {
    id!: Number
    areaInteresse!: String
    descricao!: String
    titulo!: String
    professor!: Professor
    alunos!: Array<Aluno>

    constructor(json?: Projeto) {
        Object.assign(this, json)
    }
}
