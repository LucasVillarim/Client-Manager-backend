import { Request, Response } from 'express';
import Register from '../schemas/register';

class UserController {
  // eslint-disable-next-line class-methods-use-this
  public async index(req: Request, res: Response): Promise<Response> {
    const register = await Register.find();

    return res.status(200).json(register);
  }

  // eslint-disable-next-line class-methods-use-this
  public async create(req: Request, res: Response): Promise<Response> {
    const { form, tableData } = req.body;
    const user = { ...form, products: tableData };
    const newUser = await Register.create(user);

    return res.status(200).json(newUser);
  }

  // eslint-disable-next-line class-methods-use-this
  public async remove(req: Request, res: Response): Promise<Response> {
    const { deleteUser } = req.body;
    try {
      const query = { _id: deleteUser._id };
      const sendQuery = await Register.deleteOne(query);
    } catch (err) {
      console.log(err);
    }
    return res.status(200).json();
  }

  // eslint-disable-next-line class-methods-use-this
  public async edit(req: Request, res: Response): Promise<Response> {
    const { userData, newData } = req.body;

    const editInfo = await Register.updateOne(
      { _id: userData._id },
      {
        $set: {
          name: newData.name,
          email: newData.email,
          contact: newData.contact,
          project: newData.project,
          situation: newData.situation,
        },
      },
      function log(err) {
        if (err) throw err;
        console.log('1 document updated');
      },
    );

    const response = await Register.find({ _id: userData._id });

    return res.status(200).json(response);
  }
}

export default new UserController();
