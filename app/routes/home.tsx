import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { requireUserId } from "~/utils/auth.server";
import { FormField } from "~/components/form-field";
import { useActionData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const roomId = form.get("roomId");

  if (typeof roomId !== "string") {
    return json(
      {
        error: "Invalid Form Data",
        form: action,
      },
      { status: 400 }
    );
  }

  const validateRoomId = (password: string): string | undefined => {
    if (password.length < 5) {
      return "Ingresa un ID de sala de al menos 5 caracteres.";
    }
  };

  const errors = {
    roomId: validateRoomId(roomId),
  };

  if (Object.values(errors).some(Boolean))
    return json(
      {
        errors,
        fields: { roomId },
        form: action,
      },
      { status: 400 }
    );

  throw redirect(`/room/${roomId}`);
};

export default function Home() {
  const actionData = useActionData();
  const [errors, setErrors] = useState(actionData?.errors || {});
  const [formData, setFormData] = useState({
    roomId: actionData?.fields?.email || "",
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  return (
    <div>
      <form method="post">
        <FormField
          htmlFor="roomId"
          label="Room"
          placeholder="Ingresa tu room"
          type="text"
          value={formData.roomId}
          onChange={(e) => handleInputChange(e, "roomId")}
          error={errors?.roomId}
        />
        <button>Entrar</button>
      </form>
    </div>
  );
}
