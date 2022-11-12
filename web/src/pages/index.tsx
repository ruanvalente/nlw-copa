import Image from "next/image";

import appImagePreview from "../assets/app-nlw-copa-preview.png";
import userAvatarImage from "../assets/users-avatar-example.png";
import iconCheckImage from "../assets/icon-check.svg";
import logoImage from "../assets/logo.svg";

import { API } from "../lib/axios";
import { FormEvent, useState } from "react";
interface HomeProps {
  poolCount: number;
  guessesCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState("");

  async function createPool(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await API.post("/pools", {
        title: poolTitle,
      });

      const { code } = response.data;
      await navigator.clipboard.writeText(code);
      alert(
        "Seu bolão foi criado com sucesso. O código foi copiado para área de transferência ! "
      );
    } catch (error) {
      alert(error);
      setPoolTitle("");
      console.log(error);
    } finally {
      setPoolTitle("");
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center max-[826px]:grid-cols-1 px-4">
      <main>
        <Image src={logoImage} alt="NLW Copa" />
        <h1 className="mt-[60px] text-5xl text-white font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image
            src={userAvatarImage}
            alt="Mostra a imagem dos usuários da plataforma NLW Copa"
          />
          <strong className="text-gray-100 text-xl leading-normal">
            <span className="text-ignite-500">+{props.userCount}</span> pessoas
            já usando
          </strong>
        </div>

        <form className="mt-10 flex gap-2" onSubmit={createPool}>
          <input
            className="flex-1 px-6 py-4 rounded text-white bg-gray-800 border border-gray-600 text-sm"
            type="text"
            placeholder="Qual nome do seu bolão"
            required
            value={poolTitle}
            onChange={(event) => setPoolTitle(event.target.value)}
          />
          <button
            className="px-6 py-4 bg-yellow-500 text-gray-900 uppercase font-bold text-sm rounded hover:bg-yellow-700"
            type="submit"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-gray-500 leading-relaxed text-sm">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="flex justify-between mt-10 pt-10 border-t border-gray-500 text-gray-500">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImage} alt="Icone de check" />
            <div className="flex-col">
              <p className="font-bold text-2xl leading-normal">
                +{props.poolCount}
              </p>
              <p className="text-base leading-6">Bolões criados</p>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-500" />

          <div className="flex items-center gap-6">
            <Image src={iconCheckImage} alt="Icone de check" />
            <div className="flex-col">
              <p className="font-bold text-2xl leading-normal">
                +{props.guessesCount}
              </p>
              <p className="text-base leading-6">Palpites enviados</p>
            </div>
          </div>
        </div>
      </main>
      <Image
        className="max-[826px]:hidden"
        src={appImagePreview}
        alt="Dois celulares mostrando a aplicação NLW Copa em um dispositivo móvel"
      />
    </div>
  );
}

export const getStaticProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      API.get("pools/count"),
      API.get("guesses/count"),
      API.get("users/count"),
    ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessesCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
    revalidate: 1,
  };
};
