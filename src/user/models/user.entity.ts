import {
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ name: 'encrypted_password', default: '', nullable: false })
    password: string;

    @Column()
    full_name: string;

    @Column()
    username: string;

    @Column()
    phone_number: string;

    @Column({ nullable: true })
    gender: number;

    @Column({ nullable: true })
    day_of_birth: Date;

    @Column({ nullable: true })
    tokens: string;

    @Column({ nullable: true })
    cmt: string;

    @Column({ nullable: true })
    the_bhxh: string;

    @Column({ nullable: true })
    country: string;

    @Column({ nullable: true })
    address: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    @Column({ nullable: true })
    ten_xa_phuong: string;

    @Column({ nullable: true })
    ten_quan_huyen: string;

    @Column({ nullable: true })
    ten_tinh_tp: string;
}
