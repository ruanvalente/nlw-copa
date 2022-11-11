import Image from "next/image";
import appImagePreview from "../assets/app-nlw-copa-preview.png";
import logoImage from "../assets/logo.svg";
import userAvatarImage from "../assets/users-avatar-example.png";
import iconCheckImage from "../assets/icon-check.svg";

interface HomeProps {
  count: number;
}

export default function Home(props: HomeProps) {
  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center">
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

        <p>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div>
          <div>
            <Image src={iconCheckImage} alt="Icone de check" />
            <span>+2.034</span>
            <span>Bolões criados</span>
          </div>
          <div>
            <Image src={iconCheckImage} alt="Icone de check" />
            <span>+2.034</span>
            <span>Bolões criados</span>
          </div>
        </div>
      </main>
      <Image
        src={appImagePreview}
        alt="Dois celulares mostrando a aplicação NLW Copa em um dispositivo móvel"
      />
    </div>
  );
}

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3333/pools/count");
  const data = await response.json();

  return {
    props: {
      count: data.count,
    },
  };
};
