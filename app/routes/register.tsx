import Layout from "~/components/layout";
import { FormField } from "~/components/form-field";
import type { ChangeEvent } from "react";
import { useState, useEffect, useRef } from "react";
import { json, redirect } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "~/utils/validator.server";
import { login, register, getUser } from "~/utils/auth.server";
import { Form, Link, useActionData, useTransition } from "@remix-run/react";

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

export default function Register() {
  const actionData = useActionData();
  const [formError, setFormError] = useState(actionData?.error || "");
  const [errors, setErrors] = useState(actionData?.errors || {});
  const firstLoad = useRef(true);
  const transition = useTransition();
  let processing =
    transition.state === "submitting" &&
    transition.submission.formData.get("_action") === "register";

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
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  useEffect(() => {
    if (!firstLoad.current) {
      setFormError("");
    }
  }, [formData]);

  useEffect(() => {
    firstLoad.current = false;
  }, []);

  return (
    <Layout>
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="h-12 w-auto" src="./logo.png" alt="Workflow" />
          <h2 className="mt-6 text-left text-3xl font-extrabold text-gray-900">
            Regístrate
          </h2>
          <p className="mt-2 text-left text-sm text-gray-600">
            Registrate para comenzar a usar Google Meet
          </p>
        </div>
        <Form method="post" className="mt-8 space-y-6">
          <p>{formError}</p>
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
          <FormField
            htmlFor="firstName"
            label="Nombre"
            placeholder="Ingresa tu nombre"
            value={formData.firstName}
            onChange={(e) => handleInputChange(e, "firstName")}
            error={errors?.firstName}
          />
          <FormField
            htmlFor="lastName"
            label="Apellido"
            placeholder="Ingresa tu apellido"
            value={formData.lastName}
            onChange={(e) => handleInputChange(e, "lastName")}
            error={errors?.lastName}
          />

          <button
            type="submit"
            name="_action"
            value="register"
            className="disabled:opacity-50 group relative w-full flex justify-center py-3 px-4 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm mb-4"
            disabled={processing}
          >
            {processing && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {processing ? "Procesando..." : "Registrarse"}
          </button>
        </Form>
        <p className="mt-2 text-center text-sm text-gray-600">
          ¿Tienes una cuenta?{" "}
          <Link
            className="font-medium text-indigo-600 hover:text-indigo-500"
            to="/login"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </Layout>
  );
}
