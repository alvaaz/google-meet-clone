import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { requireUserId } from "~/utils/auth.server";
import { FormField } from "~/components/form-field";
import { Form, useActionData } from "@remix-run/react";
import Button from "~/components/button";
import Icon from "~/components/icons/";

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

  const validateRoomId = (roomId: string): string | undefined => {
    if (roomId.length < 5) {
      return "Requiere ID de 5 caracteres o más.";
    }
  };

  const errors = {
    roomId: validateRoomId(roomId),
  };

  console.log(errors);

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
    roomId: actionData?.fields?.roomId || "",
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
    <div className="h-screen grid grid-rows-[min-content_auto] container mx-auto px-8">
      <header className="py-4">
        <nav className="flex justify-between">
          <img className="w-10" src="./logo.png" alt="Logo Google Meet" />

          <Form action="/logout" method="post">
            <button type="submit">Salir</button>
          </Form>
        </nav>
      </header>
      <main className="flex place-items-center">
        <div className="text-left md:w-5/6 lg:w-3/4 xl:w-1/2 max-w-2xl flex-wrap">
          <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-8">
            Videollamadas gratis para todos.
          </h1>
          <p className="text-gray-600 text-xl mb-12">
            Hemos rediseñado nuestro servicio de reuniones seguras. Google Meet,
            para que todo el mundo pueda usarlo de forma gratuita.
          </p>
          <Form
            method="post"
            className="flex items-start gap-3 flex-wrap"
            id="room-form"
            reloadDocument
          >
            <Button href="/room" className="basis-full sm:basis-auto">
              <Icon name="video" className="w-6 h-6 stroke-white" />
              Nueva reunión
            </Button>
            <FormField
              htmlFor="roomId"
              placeholder="Introduce un código"
              type="text"
              value={formData.roomId}
              onChange={(e) => handleInputChange(e, "roomId")}
              error={errors?.roomId}
            />
            {formData.roomId && (
              <Button htmlType="submit" type="ghost">
                Unirme
              </Button>
            )}
          </Form>
        </div>
      </main>
    </div>
  );
}
