import { EntityManager } from "typeorm"
import { CredentialModel } from "../config/data-source"
import { Credential } from "../entities/Credentials.entity"

const crypPass = async (pass: string): Promise<string> => {
        const encoder = new TextEncoder()
        const data = encoder.encode(pass)
        const hash =  await crypto.subtle.digest("SHA-256", data)
        const hashArray = Array.from(new Uint8Array(hash))
        const hasHex = hashArray.map( b => b.toString(16).padStart(2,"0")).join("")
        return hasHex
}

const checkUserExist = async (username: string): Promise<void> => {
    const credentialFound: Credential | null = await CredentialModel.findOne({ where:{	username } })
    if(credentialFound) throw new Error(`El usuario con username: ${username} ya existe, intente con nuevo username`)
}

export const getCredentialService = async (entityManager: EntityManager, username: string, password: string): Promise<Credential |undefined> => {
    
		await checkUserExist(username)
    const passwordEncrypted = await crypPass(password)
    const objetoCredenciales: Credential = entityManager.create( Credential, {
        username,
        password: passwordEncrypted
    })   
    
    return await entityManager.save(objetoCredenciales)
}

export const checkUserCredentials = async (username: string, password: string): Promise<number | undefined>  => {
    const credentialFound: Credential | null  = await CredentialModel.findOne({ where:{	username } })
    const passwordEncrypt = await crypPass(password)
    return credentialFound?.password === passwordEncrypt ? credentialFound.id : undefined
}
