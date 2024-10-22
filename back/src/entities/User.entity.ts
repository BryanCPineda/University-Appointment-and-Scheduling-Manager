import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Credential } from "./Credentials.entity";
import { Appointment } from "./Appointments.entity";


@Entity("users")
export class User{

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 100, nullable: false  })
    name: string

    @Column({ type: "varchar", length: 100, unique: true, nullable: false})
    email: string

    @Column({ type: "date", nullable: false})
    birthdate: Date

    @Column({ type: "integer", nullable: false, unique: true })
    nDni: number

    @OneToOne( () => Credential, { cascade: true } )
    @JoinColumn()
    credentials: Credential 

    @OneToMany(() => Appointment, appointment => appointment.user, { nullable: false })
    appointments: Appointment[]

    @CreateDateColumn()
    createdAt?: Date

    @UpdateDateColumn()
    updateAt?: Date
}



