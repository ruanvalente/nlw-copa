interface HomeProps {
  count: number;
}

export default function Home(props: HomeProps) {
  return <div>NLW COPA - {props.count}</div>;
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
