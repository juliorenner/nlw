import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersService {
  private repository: Repository<User>;

  constructor() {
    this.repository = getCustomRepository(UsersRepository);
  }

  async create(email: string) {
    const user = await this.repository.findOne({
      email,
    });

    if (user) {
      console.log(`user: ${user}`);
      return user;
    }

    const newUser = this.repository.create({
      email,
    });

    await this.repository.save(newUser);

    return newUser;
  }

  async findByEmail(email: string) {
    return await this.repository.findOne({
      email,
    });
  }
}

export { UsersService };
