import { ActionFunction, redirect } from "@remix-run/node";
import React from "react";
import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");
  const race = form.get("race");
  const specialMove = form.get("specialMove");
  const gender = form.get("gender");
  const sprite = form.get("sprite");

  const data: any = { name, race, specialMove, gender, sprite };

  try {
    await db.character.create({
      data,
    });
    return redirect("/");
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
};

const NewCharacter: React.FC = () => {
  return (
    <form method="POST">
      <input placeholder="Name" name="name" />
      <input placeholder="Race" name="race" />
      <input placeholder="Special Move" name="specialMove" />
      <select name="gender">
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input placeholder="Sprite link" name="sprite" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewCharacter;
