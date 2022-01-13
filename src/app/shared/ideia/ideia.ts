import { Aluno } from "../aluno/aluno"


export class Ideia {
    id!: Number
    area_of_interest!: String
    description!: String
    title!: String
    AuthorId!: String
    status!: String

    constructor(json?: Ideia) {
        Object.assign(this, json)
    }
}