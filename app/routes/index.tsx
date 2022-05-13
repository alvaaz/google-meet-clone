import { getUser } from "~/utils/auth.server";
import type { LoaderFunction } from "@remix-run/node";
import Button from "~/components/button";
import Icon from "~/components/icons";
import { Form, Link, useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  let user = await getUser(request);
  return {
    user,
  };
};

export default function Index() {
  let data = useLoaderData();
  return (
    <>
      <header className="mb-24 container mx-auto px-5">
        <nav className="flex justify-between items-center mb-28">
          <Link
            className="flex items-center gap-2 font-medium text-xl py-6"
            to="/"
          >
            <img className="w-10" src="./logo.png" alt="Logo Google Meet" />
            <p>Google Meet Clone</p>
          </Link>

          {data.user ? (
            <Form action="/logout" method="post">
              <Button htmlType="submit" type="ghost">
                Salir
              </Button>
            </Form>
          ) : null}
        </nav>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-x-8">
          <div className="md:basis-1/2">
            <h1 className="text-4xl font-semibold mb-8 md:text-5xl lg:text-6xl">
              Videollamadas gratuitas y seguras.
            </h1>
            <p className="text-xl text-gray-500 mb-8">
              Hablar con tus seres queridos y cercanos nunca fue tan fácil.
            </p>
            <Button href="/home" className="mb-8 md:w-max">
              {data.user ? "Ir al home" : "Probar ahora"}
            </Button>
          </div>

          <div className="md:basis-1/2">
            <img
              className="w-full h-full object-cover"
              src="/hero.png"
              alt="Speakers in a videocall"
            />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-5 mb-24">
        <p className="font-semibold text-indigo-600 mb-4 md:text-lg">
          Características
        </p>
        <h2 className="font-semibold text-3xl md:text-4xl mb-3">
          Conoce todas las características
        </h2>
        <p className="text-lg md:text-xl text-gray-500 mb-12 md:mb-24">
          Sácale el máximo provecho a todas las funcionalidades que te
          ofrecemos.
        </p>
        <div className="flex md:gap-x-24 flex-col md:flex-row">
          <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-y-12 md:gap-y-0 md:gap-x-16 mb-16 md:mb-0">
            <section className="flex md:block items-start gap-4">
              <Icon name="rooms" className="w-10 shrink-0 md:mb-4" />
              <div>
                <h6 className="font-semibold text-lg md:text-xl mb-2">
                  Salas ilimitadas
                </h6>
                <p className="text-gray-500 md:text-lg">
                  Crea todas las salas que quieras e invita a tus amigos con el
                  código de seguridad.
                </p>
              </div>
            </section>
            <section className="flex md:block items-start gap-4">
              <Icon name="secure" className="w-10 shrink-0 md:mb-4" />
              <div>
                <h6 className="font-semibold text-lg md:text-xl mb-2">
                  Seguridad de salas
                </h6>
                <p className="text-gray-500 md:text-lg">
                  A través del código proporcionado puedes restringir el acceso.
                </p>
              </div>
            </section>
            <section className="flex md:block items-start gap-4">
              <Icon name="screen" className="w-10 shrink-0 md:mb-4" />
              <div>
                <h6 className="font-semibold text-lg md:text-xl mb-2">
                  Comparte pantalla
                </h6>
                <p className="font-bold px-4 py-2 rounded text-indigo-600 uppercase text-xs bg-indigo-100 mb-2 inline-block">
                  Proximamente
                </p>
                <p className="text-gray-500 md:text-lg">
                  Comparte esos apuntes importantes para la reunión con esta
                  característica.
                </p>
              </div>
            </section>
            <section className="flex md:block items-start gap-4">
              <Icon name="chat" className="w-10 shrink-0 md:mb-4" />

              <div>
                <h6 className="font-semibold text-lg md:text-xl mb-2">
                  Chat en vivo
                </h6>
                <p className="font-bold px-4 py-2 rounded text-indigo-600 uppercase text-xs bg-indigo-100 mb-2 inline-block">
                  Proximamente
                </p>
                <p className="text-gray-500 md:text-lg">
                  Chatea con los participantes de tu reunión de una manera
                  rápida y segura.
                </p>
              </div>
            </section>
          </div>
          <div className="md:basis-1/3 rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover md:hidden lg:inline"
              src="/hero2.png"
              alt=""
            />
          </div>
        </div>
      </main>
      <footer className="bg-indigo-600 text-center py-10">
        <Link
          to="/"
          className="flex items-center gap-2 font-medium text-xl mb-8 pb-8 justify-center border-b border-indigo-300"
        >
          <img className="w-10" src="./logo.png" alt="Logo Google Meet" />
          <p className="text-white">Google Meet Clone</p>
        </Link>
        <p className="text-indigo-50 px-5">
          Creado para la{" "}
          <a
            href="https://github.com/midudev/google-meet-clone/blob/main/README.md"
            rel="noreferrer"
            target="_blank"
            className="underline"
          >
            hackaton
          </a>{" "}
          de{" "}
          <a
            href="https://www.twitch.tv/midudev"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            midudev
          </a>{" "}
          . Hecho con 💛 por{" "}
          <a
            href="https://goede.cl"
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            @alvaaz
          </a>{" "}
          con Remix, Prisma y Twilio.
        </p>
      </footer>
    </>
  );
}
