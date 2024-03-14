import Header from "../components/Header";
import AddActions from "../components/AddActionsList";
import TranscationsList from "../components/TranscationsList";
import Chart from "../components/ChartComponent";
interface Props {}

function HomePage(props: Props) {
  const {} = props;

  return (
    <div className="bg-slate-300 min-h-[100vh] max-lg:pb-[5vh] ">
      <Header />
      <div className="grid grid-cols-1 xl:grid-cols-12 xl:gap-20 gap-8 mt-[10vh] mx-10 ">
        <AddActions />
        <Chart />
        <TranscationsList />
      </div>
    </div>
  );
}

export default HomePage;
