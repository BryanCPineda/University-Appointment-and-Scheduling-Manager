import { Credential } from "../interfaces/CredentialInterface"

const credentialsList: Credential[] = []
let id: number = 1

const crypPass = async (pass: string): Promise<string> => {
        const encoder = new TextEncoder()
        const data = encoder.encode(pass)
        const hash =  await crypto.subtle.digest("SHA-256", data)
        const hashArray = Array.from(new Uint8Array(hash))
        const hasHex = hashArray.map( b => b.toString(16).padStart(2,"0")).join("")
        return hasHex
}

const checkUserExist = (username: string): void => {
    const credentialFound: Credential | undefined = credentialsList.find( credential => credential.username === username )
    if(credentialFound) throw new Error(`El usuario con username: ${username} ya existe, intente con nuevo username`)
}

export const getCredentialService = async (username: string, password: string): Promise<number> => {
    checkUserExist(username)
    const passwordEncrypted = await crypPass(password)
    const objetoCredenciales = {
        id,
        username,
        password: passwordEncrypted
    }
    credentialsList.push(objetoCredenciales)
    return id++
}

export const checkUserCredentials = async (username: string, password: string): Promise<number | undefined>  => {
    const credentialFound: Credential | undefined = credentialsList.find( credential => credential.username === username )
    const passwordEncrypt = await crypPass(password)
    return credentialFound?.password === passwordEncrypt ? credentialFound.id : undefined
}
