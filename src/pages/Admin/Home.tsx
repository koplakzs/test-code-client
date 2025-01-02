import { getStatistic } from "@/service/api";
import { useEffect, useState } from "react";

interface StateHome {
  totalReports: number;
  programs: [
    {
      name: string;
      province: string;
      total: number;
    }
  ];
}

export default function Home() {
  const token = sessionStorage.getItem("authToken");

  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<StateHome>({
    programs: [
      {
        name: "",
        province: "",
        total: 0,
      },
    ],
    totalReports: 0,
  });
  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const response = await getStatistic(token!);
      const result = response.data;
      if (response.status === 200) {
        setState(result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);
  return (
    <main>
      <p className="text-center font-semibold text-2xl pb-10 w-full">
        {" "}
        Laporan Progress Penyaluran{" "}
      </p>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-10">
            <div className="rounded-lg border p-5 flex font-semibold justify-between items-center gap-5">
              <p className="text-xl">Totoal Laporan </p>
              <p className="text-3xl"> {state.totalReports} </p>
            </div>
            {state &&
              state!.programs.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border p-5 flex font-semibold justify-between items-center gap-5"
                >
                  <p className="text-xl">TProgram {item.name} </p>
                  <p className="text-3xl"> {item.total} </p>
                </div>
              ))}
          </div>
          <div className="pt-10">
            <p>grafik</p>
          </div>
        </div>
      )}
    </main>
  );
}
