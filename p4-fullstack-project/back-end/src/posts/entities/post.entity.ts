import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
 
@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn() 
    id: number; // ID unico do post de auto-incremento

    @Column()
    titulo: string; // Titulo do post, ou seja, identificador textual principal

    @Column({type: 'text'}) 
    conteudo: string; // Conteudo do post, ou seja, o corpo principal da publicacao
    
    @Column()
    imagem: string; // referencia ou URL da imagem do post

    @Column({type: 'int'})
    ordenacao: number //Campo que determina a prioeidade de retorno
}
