import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnectionsCreate {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

class ConnectionsService {
  private repository: Repository<Connection>;

  constructor() {
    this.repository = getCustomRepository(ConnectionsRepository);
  }

  async create({ socket_id, user_id, admin_id, id }: IConnectionsCreate) {
    const connection = this.repository.create({
      socket_id,
      user_id,
      admin_id,
      id,
    });

    await this.repository.save(connection);

    return connection;
  }

  async findByUserId(user_id: string) {
    return await this.repository.findOne({
      user_id,
    });
  }

  async findAllWithoutAdmin() {
    return await this.repository.find({
      where: {
        admin_id: null,
      },
      relations: ["user"],
    });
  }

  async findBySocketID(socket_id: string) {
    return await this.repository.findOne({
      socket_id,
    });
  }

  async updateAdminId(user_id: string, admin_id: string) {
    await this.repository
      .createQueryBuilder()
      .update(Connection)
      .set({ admin_id })
      .where("user_id = :user_id", {
        user_id,
      })
      .execute();
  }
}

export { ConnectionsService };
