import { ITodo } from "./../types/todo";

import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default model<ITodo>("Todo", schema);
