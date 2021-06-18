import { Response, Request } from "express";

import { IContact } from "./type";

import ContactSchema from "./schema";

const parseBody = (bodyString: string) => {
  try {
    return JSON.parse(bodyString);
  } catch (e) {
    return bodyString;
  }
};

const getContact = async (req: Request, res: Response): Promise<void> => {
  try {
    let { query }: any = req.query;

    const contacts: IContact[] = await ContactSchema.find({
      $or: [
        { name: new RegExp(query || "") },
        { email: new RegExp(query || "") },
        { contact_no: new RegExp(query || "") },
      ],
    }).sort([["_id", -1]]);
    res.status(200).send({ data: contacts });
  } catch (error) {
    console.error({ error });
    res.status(500).json({ error });
  }
};

const addContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = parseBody(req.body);

    const _newContact: IContact = new ContactSchema(body);
    await _newContact.save();
    res.status(200).send({ mesage: "contact added sucessfully", data: [] });
  } catch (error) {
    console.error({ error });
    res.status(500).json({ error });
  }
};

const updateContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id, name, email, contact_no, address } = parseBody(req.body);
    console.log(
      "🚀 ~ file: controller.ts ~ line 49 ~ updateContact ~ req.body",
      req.body
    );
    console.log(
      "🚀 ~ file: controller.ts ~ line 49 ~ updateContact ~ _id",
      _id
    );
    await ContactSchema.findByIdAndUpdate(
      { _id },
      { name, email, contact_no, address }
    );
    res.json({ mesage: "contact updated succesfully", data: [] });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id } = parseBody(req.body);
    console.log("🚀 ~ file: controller.ts ~ line 70 ~ deleteContact ~ _id", _id)
    await ContactSchema.findByIdAndRemove(_id);

    res.status(200).json({
      message: "contact deleted sucessfully",
      data: [],
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export { getContact, addContact, updateContact, deleteContact };
