import { HomeProps } from "../../utils/interfaces/home";
import { Hero } from "./";

const Home = ({ hospitals }: HomeProps) => {
  return (
    <>
      <Hero hospitals={hospitals} />
    </>
  );
};

export default Home;
