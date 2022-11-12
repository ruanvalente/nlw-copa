import Image from "next/image";

import appImagePreview from "../assets/app-nlw-copa-preview.png";
import userAvatarImage from "../assets/users-avatar-example.png";
import iconCheckImage from "../assets/icon-check.svg";
import logoImage from "../assets/logo.svg";

export default function Home() {
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
            <span className="text-ignite-500">+12.592</span> pessoas já usando
          </strong>
        </div>

        <form className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded text-white bg-gray-800 border border-gray-600 text-sm"
            type="text"
            placeholder="Qual nome do seu bolão"
            required
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
              <p className="font-bold text-2xl leading-normal">+2.034</p>
              <p className="text-base leading-6">Bolões criados</p>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-500" />

          <div className="flex items-center gap-6">
            <Image src={iconCheckImage} alt="Icone de check" />
            <div className="flex-col">
              <p className="font-bold text-2xl leading-normal">+2.034</p>
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

// export const getServerSideProps = async () => {
//   const response = await fetch("http://localhost:3333/pools/count");
//   const data = await response.json();

//   return {
//     props: {
//       count: data.count,
//     },
//   };
// };
