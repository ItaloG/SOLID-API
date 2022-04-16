import { User } from "../../entities/User";
import { ImailProvider } from "../../providers/IMailProvides";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private mailProvider: ImailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<User> {
    const userAlredyExist = await this.userRepository.findByEmail(data.email);

    console.log(data.email);
    
    if (userAlredyExist) {
      throw new Error("User alredy exist.");
    }

    const user = new User(data);

    await this.userRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Equipe do meu APP",
        email: "equipe@meuapp.com",
      },
      subject: "Seja bem-vindo à plataforma",
      body: "<h1><bold>Você já pode fazer login em nossa plataform.<bold></h1>",
    });

    return user
  }
}
