import Layout from "~/components/layout";
import { FormField } from "~/components/form-field";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { json, redirect } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "~/utils/validator.server";
import { login, register, getUser } from "~/utils/auth.server";
import { Form, Link, useActionData, useTransition } from "@remix-run/react";
import Button from "~/components/button";

export const loader: LoaderFunction = async ({ request }) => {
  return (await getUser(request)) ? redirect("/") : null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const action = form.get("_action");
  const email = form.get("email");
  const password = form.get("password");
  let firstName = form.get("firstName");
  let lastName = form.get("lastName");

  if (
    typeof action !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return json(
      {
        error: "Invalid Form Data",
        form: action,
      },
      { status: 400 }
    );
  }

  if (
    action === "register" &&
    (typeof firstName !== "string" || typeof lastName !== "string")
  ) {
    return json(
      {
        error: "Invalid Form Data",
        form: action,
      },
      { status: 400 }
    );
  }

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    ...(action === "register"
      ? {
          firstName: validateName((firstName as string) || ""),
          lastName: validateName((lastName as string) || ""),
        }
      : {}),
  };

  if (Object.values(errors).some(Boolean))
    return json(
      {
        errors,
        fields: { email, password, firstName, lastName },
        form: action,
      },
      { status: 400 }
    );

  switch (action) {
    case "login": {
      return await login({ email, password });
    }
    case "register": {
      firstName = firstName as string;
      lastName = lastName as string;
      return await register({ email, password, firstName, lastName });
    }
    default:
      return json(
        {
          error: "Invalid Form Data",
        },
        { status: 400 }
      );
  }
};

export default function Login() {
  const actionData = useActionData();
  const [formError, setFormError] = useState(actionData?.error || "");
  const [errors, setErrors] = useState(actionData?.errors || {});
  const transition = useTransition();
  let processing =
    transition.state === "submitting" &&
    transition.submission.formData.get("_action") === "login";

  const [formData, setFormData] = useState({
    email: actionData?.fields?.email || "",
    password: actionData?.fields?.password || "",
    firstName: actionData?.fields?.firstName || "",
    lastName: actionData?.fields?.lastName || "",
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormError("");
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  return (
    <Layout>
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="./logo.png"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Accede a tu cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Inicia sesión para comenzar a usar Google Meet
          </p>
        </div>
        <Form method="post" className="mt-8 space-y-6" reloadDocument>
          {formError && (
            <div className="bg-red-200 p-4 rounded-lg">
              <p className="text-red-800 text-sm font-medium">{formError}</p>
            </div>
          )}
          <FormField
            htmlFor="email"
            label="Email"
            placeholder="Ingresa tu email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange(e, "email")}
            error={errors?.email}
          />
          <FormField
            htmlFor="password"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange(e, "password")}
            error={errors?.password}
          />

          <Button
            htmlType="submit"
            name="_action"
            value="login"
            disabled={processing}
            loading={processing}
            block={true}
          >
            Iniciar sesión
          </Button>
        </Form>
        <p className="mt-2 text-center text-sm text-gray-600">
          ¿Aún no tienes una cuenta?{" "}
          <Link
            className="font-medium text-indigo-600 hover:text-indigo-500"
            to="/register"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </Layout>
  );
}
