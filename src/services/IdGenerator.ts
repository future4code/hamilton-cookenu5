import { v4 } from "uuid"

export class IdGenerator {
    public idGenerator(): string {
        const id = v4()
        return id
    }

}