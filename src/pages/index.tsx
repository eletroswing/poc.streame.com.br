import Image from "next/image";
import { Inter } from "next/font/google";
import { useRef, FormEvent, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

import logo from "./../../public/logo.png";
import iptv from "./../../public/iptv.jpg";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const headerAnimation = useAnimationControls();
  const emailRef = useRef<HTMLInputElement>(null);
  const [showMessage, setShowMessage] = useState({ message: "", code: "" });
  const [enableMessage, setEnableMessage] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const fetchUserData = (email: string) => {
    setIsLoading(true);
    fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => {
        return {
          status: res.status,
          json: res.json(),
        };
      })
      .then((data) => {
        if (data.status == 400)
          setShowMessage({
            message: "Erro nos dados enviados.",
            code: "data-send-error",
          });
        if (data.status == 406)
          setShowMessage({
            message: "O úsuario já está cadastrado!",
            code: "data-send-exist",
          });
        if (data.status == 201)
          setShowMessage({
            message: "Você está na lista de espera!",
            code: "data-success",
          });

        setIsLoading(false);
        setEnableMessage(true);
      });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchUserData(emailRef.current?.value || "");
  };

  useEffect(() => {
    setTimeout(() => {
      headerAnimation.start({
        y: 0,
        opacity: 100,
        transition: { ease: "easeOut", duration: 0.4 },
      });
    }, 1200);
  }, [headerAnimation]);

  const hideHeaderAnimation = () => {
    headerAnimation.start({
      y: -120,
      opacity: 0,
      transition: { ease: "easeOut", duration: 0.4 },
    });
  };

  const scrollToHowWeAre = () => {
    const element = document.getElementById("nos");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  };

  const scrollToPrice = () => {
    const element = document.getElementById("price");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-[#1D2226] font-sans">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Stream-me: Seu serviço de Tv</title>
        <meta name="title" content="Stream-me: Seu serviço de Tv" />
        <meta
          name="description"
          content="Assista Tv em qualquer dispositivo da atualidade de forma rápida e segura! Com preços baixos e acessíveis. Eleve sua experiência com TV a outro nível com Stream-me!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://streame-fji0.onrender.com" />
        <meta property="og:title" content="Stream-me: Seu Serviço de Tv" />
        <meta
          property="og:description"
          content="Assista Tv em qualquer dispositivo da atualidade de forma rápida e segura! Com preços baixos e acessíveis. Eleve sua experiência com TV a outro nível com Stream-me!"
        />
        <meta
          property="og:image"
          content="https://streame-fji0.onrender.com/logo.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://streame-fji0.onrender.com"
        />
        <meta property="twitter:title" content="Stream-me: Seu Serviço de Tv" />
        <meta
          property="twitter:description"
          content="Assista Tv em qualquer dispositivo da atualidade de forma rápida e segura! Com preços baixos e acessíveis. Eleve sua experiência com TV a outro nível com Stream-me!"
        />
        <meta
          property="twitter:image"
          content="https://streame-fji0.onrender.com/logo.png"
        />
      </Head>
      <motion.section
        className="fixed w-full"
        initial={{ y: -120, opacity: 0 }}
        animate={headerAnimation}
      >
        <div className="bg-green-600 alert alert-dismissible fade show py-4 px-6 text-white md:flex justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0 flex items-center flex-wrap justify-center md:justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className="w-4 h-4 mr-2"
            >
              <path
                fill="currentColor"
                d="M216 23.86c0-23.8-30.65-32.77-44.15-13.04C48 191.85 224 200 224 288c0 35.63-29.11 64.46-64.85 63.99-35.17-.45-63.15-29.77-63.15-64.94v-85.51c0-21.7-26.47-32.23-41.43-16.5C27.8 213.16 0 261.33 0 320c0 105.87 86.13 192 192 192s192-86.13 192-192c0-170.29-168-193-168-296.14z"
              />
            </svg>
            <strong className="mr-1">Oferta do assinante!</strong> Garanta agora
            antes que seja tarde!
          </div>
          <div className="flex items-center justify-center">
            <a
              className="inline-block px-6 py-2.5 bg-white text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-100 hover:shadow-lg focus:bg-gray-100 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-200 active:shadow-lg transition duration-150 ease-in-out mr-4"
              onClick={() => {
                hideHeaderAnimation();
                scrollToPrice();
              }}
              role="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Eu Quero!
            </a>
            <a
              onClick={() => {
                hideHeaderAnimation();
              }}
              className="cursor-pointer text-white"
              data-bs-dismiss="alert"
              aria-label="Close"
            >
              <svg
                className="w-4 h-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 352 512"
              >
                <path
                  fill="currentColor"
                  d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </motion.section>
      <header className="w-full h-screen mb-10">
        <div className="w-full h-full flex items-center select-none justify-center">
          <motion.div
            className="flex flex-col items-center"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 100 }}
            transition={{ ease: "easeOut", duration: 1, delay: 0.5 }}
          >
            <Image src={logo} draggable={false} alt="Logo do stream-me" />
            <span className="font-sans text-xl text-gray-400">
              O seu serviço de Tv Online!
            </span>
            <button
              type="button"
              onClick={() => {
                scrollToHowWeAre();
              }}
              className="mt-5 cursor-pointer inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              data-te-ripple-init
            >
              Mais
            </button>
          </motion.div>
        </div>
      </header>
      <section
        id="nos"
        className="flex mb-20 ml-10 mr-10 select-none items-center"
      >
        <motion.div
          className="text-gray-200 text-center mr-0 sm:mr-10"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 100, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">
            Quem Somos <strong className="text-rose-600">Nós</strong>?
          </h2>
          <p className="text-gray-500 mb-12">
            &emsp; Somos uma empresa dedicada a desenvolver e distribuir um
            serviço de acesso a canais de tv de forma acessível e por um preço
            justo! Acreditamos em nosso núcleo que o úsuario merece não apenas o
            melhor sistema, como o mais rápido, o mais conectado,{" "}
            <strong>o mais justo.</strong>
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 100, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Image
            className="rounded-3xl w-11/12 hidden sm:block"
            src={iptv}
            draggable={false}
            alt="Segurando controle apontando para Tv."
          />
        </motion.div>
      </section>
      <motion.section
        initial={{ opacity: 0, scale: 0.4 }}
        whileInView={{ rotate: 0, opacity: 100, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        viewport={{ once: true }}
        className=" text-gray-200 text-center select-none"
      >
        <div className="flex justify-center">
          <div className="text-center max-w-[700px]">
            <h2 className="text-3xl font-bold mb-6">
              Por quê <strong className="text-amber-600">você</strong> deveria
              nos <u className="text-sky-400 no-underline">escolher?</u>
            </h2>
            <p className="text-gray-500 mb-12">
              Aqui estão algumas <i>features</i> que nos botam a frente de todo
              e qualquer competidor!
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 lg:gap-x-12 ml-10 mr-10">
          <div className="mb-12 lg:mb-0">
            <div className="p-4 bg-blue-600 rounded-full shadow-lg inline-block mb-6">
              <svg
                className="w-5 h-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z"
                ></path>
              </svg>
            </div>
            <h5 className="text-lg font-bold mb-4">Suporte 24/7</h5>
            <p className="text-gray-500">
              Nosso sitema é feito por telespectadores, para telespectadores.
              Estaremos sempre disponivel para contato atráves do noss email.
            </p>
          </div>

          <div className="mb-12 lg:mb-0">
            <div className="p-4 bg-blue-600 rounded-full shadow-lg inline-block mb-6">
              <svg
                className="w-5 h-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z"
                ></path>
              </svg>
            </div>
            <h5 className="text-lg font-bold mb-4">Seguro e sólido</h5>
            <p className="text-gray-500">
              Trabalhamos o dia todo para manter o sistema de pé e funcionando,
              sem furos de segurança para seu dispositivo!
            </p>
          </div>

          <div className="mb-12 md:mb-0">
            <div className="p-4 bg-blue-600 rounded-full shadow-lg inline-block mb-6">
              <svg
                className="w-5 h-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path
                  fill="currentColor"
                  d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"
                ></path>
              </svg>
            </div>
            <h5 className="text-lg font-bold mb-4">Extremamente Rápido</h5>
            <p className="text-gray-500">
              Devido nossa estrutura de servidores escálaveis, você nunca fica
              na mão com o Stream-me! Trabalhamos pelo melhor, para o
              melhor(você 😁)
            </p>
          </div>

          <div className="mb-12 md:mb-0">
            <div className="p-4 bg-blue-600 rounded-full shadow-lg inline-block mb-6">
              <svg
                className="w-5 h-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 544 512"
              >
                <path
                  fill="currentColor"
                  d="M527.79 288H290.5l158.03 158.03c6.04 6.04 15.98 6.53 22.19.68 38.7-36.46 65.32-85.61 73.13-140.86 1.34-9.46-6.51-17.85-16.06-17.85zm-15.83-64.8C503.72 103.74 408.26 8.28 288.8.04 279.68-.59 272 7.1 272 16.24V240h223.77c9.14 0 16.82-7.68 16.19-16.8zM224 288V50.71c0-9.55-8.39-17.4-17.84-16.06C86.99 51.49-4.1 155.6.14 280.37 4.5 408.51 114.83 513.59 243.03 511.98c50.4-.63 96.97-16.87 135.26-44.03 7.9-5.6 8.42-17.23 1.57-24.08L224 288z"
                ></path>
              </svg>
            </div>
            <h5 className="text-lg font-bold mb-4">Em todo lugar</h5>
            <p className="text-gray-500">
              Uma pequena dos dispositivos onde planejamos estar:
              <br />
            </p>
            <p className="text-gray-500 text-left">
              - Roku Tv <br />
              - Tyzen (Samsung Tv) <br />
              - Android Tv <br />
              - Android <br />
              - Web <br />
            </p>
          </div>
        </div>
      </motion.section>
      <section className="" id="price">
        <motion.div
          className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6"
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-100 dark:text-white">
              Planos e promoções
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Aqui estão aguns planos que se encaixam na sua experiência e no
              seu bolso!
            </p>
          </div>
          <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">
            <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-100 bg-[#3b3b3b] rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 className="mb-4 text-2xl font-semibold">
                Inscrevendo-se agora
              </h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                Você tem o melhor dos dois mundos, o plano mensal por um preço
                mais bacana!
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">R$8,48</span>
                <span className="text-gray-500 dark:text-gray-400">/mês</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
                <li className="flex items-center space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Infinitos tokens</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Prioridade em canais novos</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    Até 30 dias
                    <span className="font-semibold"> grátis</span>
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    Suporte
                    <span className="font-semibold"> Premium</span>
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    Pague planos de vários meses com
                    <span className="font-semibold"> Pix</span>
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-100 bg-[#262626] rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 className="mb-4 text-2xl font-semibold">Mensal</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                Para você que tem vários dispositivos, ou quer compartilhar com
                vários amigos.
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">R$15,48</span>
                <span className="text-gray-500 dark:text-gray-400">/mês</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
                <li className="flex items-center space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Infinitos tokens</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Prioridade em canais novos</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    Até 30 dias
                    <span className="font-semibold"> grátis</span>
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    Suporte
                    <span className="font-semibold"> Premium</span>
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    Pague planos de vários meses com
                    <span className="font-semibold"> Pix</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>
      <section className="pb-20 pt-10 text-white text-center">
        <div className="flex flex-wrap justify-center">
          <div className="grow-0 shrink-0 flex-basis w-full lg:w-6/12 px-3">
            <div className="p-4 bg-rose-500 rounded-full shadow-lg inline-block mb-6">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="envelope"
                className="w-5 h-5 text-white"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
                ></path>
              </svg>
            </div>

            <h2 className="text-3xl font-bold mb-6">Garanta a oferta agora!</h2>

            <p className="text-gray-500 mb-12">
              Nós usaremos seu email para uma Prova de Conceito(POC) e para
              avisos importantes sobre a plataforma!
            </p>
            {!loading ? (
              <div>
                <form
                  className="md:flex flex-row mb-3"
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                  <input
                    type="email"
                    className="form-control block w-full px-4 py-2 mb-2 md:mb-0 md:mr-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Seu melhor email"
                    ref={emailRef}
                    required
                  />
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    Garantir!
                  </button>
                </form>
                {enableMessage && showMessage.code == "data-success" && (
                  <span className="text-lg text-green-600 select-none">
                    {showMessage.message}
                  </span>
                )}
                {enableMessage && showMessage.code == "data-send-exist" && (
                  <span className="text-lg text-red-600 select-none">
                    {showMessage.message}
                  </span>
                )}
                {enableMessage && showMessage.code == "data-send-error" && (
                  <span className="text-lg text-red-600 select-none">
                    {showMessage.message}
                  </span>
                )}
              </div>
            ) : (
              <div role="status" className="w-full flex justify-center">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </section>
      <footer className="rounded-lg shadow dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 flex justify-center">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="#" className="hover:underline">
              Stream-me™
            </a>
            . Todos os direitos reservados.
          </span>
        </div>
      </footer>
    </div>
  );
}
