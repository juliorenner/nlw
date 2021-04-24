import { Request, Response } from "express";
import { MessagesService } from "../services/MessagesService";

class MessagesController {
  async create(req: Request, res: Response): Promise<Response> {
    const messagesService = new MessagesService();

    const { admin_id, text, user_id } = req.body;

    try {
      const message = await messagesService.create({
        admin_id,
        text,
        user_id,
      });

      return res.json(message);
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }

  async showByUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const messagesService = new MessagesService();

    const userMessages = await messagesService.listByUser(id);

    return res.json(userMessages);
  }
}

export { MessagesController };
