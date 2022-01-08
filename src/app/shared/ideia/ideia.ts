import { Aluno } from "../aluno/aluno"


export class Ideia {
    id!: Number
    area_of_interest!: String
    description!: String
    title!: String
    author!: Aluno
    status!: String

    constructor(json?: Ideia) {
        Object.assign(this, json)
    }
}