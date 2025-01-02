import DeleteModal from "@/components/modals/DeleteModal";
import ReportModal from "@/components/modals/ReportModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteReport, getReports, postReport, putReport } from "@/service/api";
import { reportSchema } from "@/utis/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface Report {
  id: string;
  name: string;
  count: number;
  province: string;
  district: string;
  subDistrict: string;
  date: string;
  proof: string;
  note: string;
  status?: string;
  reason?: string;
}

interface StateHome extends Report {
  isModalAdd: boolean;
  isModalEdit: boolean;
  isModalDelete: boolean;
  isModalShow: boolean;
}

export default function Home() {
  const token = sessionStorage.getItem("authToken");
  const [reports, setReports] = useState<Report[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<StateHome>({
    isModalAdd: false,
    isModalDelete: false,
    isModalEdit: false,
    isModalShow: false,
    id: "",
    count: 0,
    date: "",
    district: "",
    name: "",
    note: "",
    proof: "",
    province: "",
    subDistrict: "",
  });

  const handleCloseModal = () =>
    setState((prevState) => ({
      ...prevState,
      isModalAdd: false,
      isModalDelete: false,
      isModalEdit: false,
      isModalShow: false,
    }));

  const handleModal = (
    type: keyof StateHome,
    payload: Partial<StateHome> = {}
  ) =>
    setState((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
      ...payload,
    }));

  const formAddReport = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      count: 0,
      date: "",
      district: "",
      name: "",
      note: "",
      province: "",
      subDistrict: "",
    },
  });
  const formEditReport = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      count: 0,
      date: "",
      district: "",
      name: "",
      note: "",
      province: "",
      subDistrict: "",
    },
  });

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const response = await getReports(token!);
      const result = response.data;
      if (response.status === 200) {
        setReports(result.reports);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const onSubmitAdd = async (values: z.infer<typeof reportSchema>) => {
    try {
      handleCloseModal();
      const response = await postReport(token!, values);
      if (response.status !== 201) {
        throw new Error(`Error ${response.status}`);
      }
      fetchReports();
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmitEdit = async (values: z.infer<typeof reportSchema>) => {
    try {
      handleCloseModal();
      // console.log(values);
      const response = await putReport(token!, state.id, values);
      console.log(response);
      if (response.status !== 201) {
        throw new Error(`Error ${response.status}`);
      }
      fetchReports();
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitDelete = async () => {
    try {
      handleCloseModal();
      const response = await deleteReport(token!, state.id);
      if (response.status !== 200) {
        throw new Error(`Status Code ${response.status}`);
      }
      fetchReports();
    } catch (error) {
      console.log(error);
    } finally {
      console.log(reports);
    }
  };
  useEffect(() => {
    fetchReports();
  }, []);
  useEffect(() => {
    formAddReport.reset({
      name: state.name,
      count: state.count,
      date: state.date,
      district: state.district,
      note: state.note ? state.note : "",
      province: state.province,
      subDistrict: state.subDistrict,
    });
  }, [state.isModalShow]);
  useEffect(() => {
    formEditReport.reset({
      name: state.name,
      count: state.count,
      date: state.date,
      district: state.district,
      note: state.note ? state.note : "",
      province: state.province,
      subDistrict: state.subDistrict,
    });
  }, [state.isModalEdit]);
  return (
    <main>
      <p className="text-center font-semibold text-2xl pb-10 w-full">
        {" "}
        Data Laporan Progress Penyaluran{" "}
      </p>
      <div className="pt-5">
        <div className="flex gap-5 items-center pb-5">
          <Button onClick={() => handleModal("isModalAdd")}>
            Buat Laporan
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Nama Program</TableHead>
              <TableHead>Wilayah</TableHead>
              <TableHead>Jumlah Penerima</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <p>Loading</p>
          ) : (
            <TableBody>
              {reports &&
                reports!.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium"> {index + 1} </TableCell>
                    <TableCell> {item.name} </TableCell>
                    <TableCell>
                      {" "}
                      {item.province}, {item.district}, {item.subDistrict}{" "}
                    </TableCell>
                    <TableCell> {item.count} </TableCell>
                    <TableCell> {item.status!} </TableCell>

                    <TableCell className="gap-4 flex">
                      <Button
                        variant={"green"}
                        onClick={() => {
                          console.log(item);
                          handleModal("isModalShow", {
                            count: item.count,
                            date: item.date,
                            district: item.district,
                            name: item.name,
                            note: item.note,
                            proof: item.proof,
                            province: item.province,
                            subDistrict: item.subDistrict,
                          });
                        }}
                      >
                        Lihat
                      </Button>
                      <Button
                        onClick={() =>
                          handleModal("isModalEdit", {
                            id: item.id,
                            count: item.count,
                            date: item.date,
                            district: item.district,
                            name: item.name,
                            note: item.note,
                            province: item.province,
                            subDistrict: item.subDistrict,
                          })
                        }
                      >
                        Edit
                      </Button>
                      {item.status === "Pending" && (
                        <Button
                          variant={"destructive"}
                          onClick={() =>
                            handleModal("isModalDelete", {
                              id: item.id,
                            })
                          }
                        >
                          Hapus
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          )}
        </Table>
      </div>

      {/* Modal Add */}
      <ReportModal
        isOpen={state.isModalAdd}
        handleModal={handleCloseModal}
        form={formAddReport}
        onSubmit={onSubmitAdd}
      />
      <ReportModal
        isShow
        isOpen={state.isModalShow}
        handleModal={handleCloseModal}
        form={formAddReport}
        onSubmit={onSubmitAdd}
      />
      <ReportModal
        isEdit
        isOpen={state.isModalEdit}
        handleModal={handleCloseModal}
        form={formEditReport}
        onSubmit={onSubmitEdit}
      />

      <DeleteModal
        isOpen={state.isModalDelete}
        handleModal={handleCloseModal}
        handleDelete={onSubmitDelete}
      />
    </main>
  );
}
