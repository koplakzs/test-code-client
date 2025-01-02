import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Report as ReportInterface } from "../User/Home";
import { useEffect, useRef, useState } from "react";
import { getAdminReports, putStatusReport } from "@/service/api";
import DeclineReportModal from "@/components/modals/DeclineReportModal";
export default function Report() {
  const token = sessionStorage.getItem("authToken");

  const [reports, setReports] = useState<ReportInterface[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    showModal: false,
    id: "",
  });
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const response = await getAdminReports(token!);
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
  const handleAcc = async (id: string) => {
    try {
      const response = await putStatusReport(token!, id, {
        status: "Diterima",
        reason: "",
      });
      if (response.status !== 201) {
        throw new Error(`Error ${response.status}`);
      }
      fetchReports();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDecline = async () => {
    try {
      const response = await putStatusReport(token!, state.id, {
        status: "Ditolak",
        reason: textAreaRef.current?.value,
      });
      if (response.status !== 201) {
        throw new Error(`Error ${response.status}`);
      }
      setState({ ...state, showModal: false });
      fetchReports();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchReports();
  }, []);
  return (
    <main>
      <p className="text-center font-semibold text-2xl pb-10 w-full">
        {" "}
        Data Laporan Progress Penyaluran{" "}
      </p>
      <div className="pt-5">
        <div className="flex gap-5 items-center pb-5">
          <Button variant={"red"}>Export To PDF</Button>
          <Button variant={"green"}>Export To Excel</Button>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Nama Laporan " />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {isLoading ? (
          <p>Loading</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">No</TableHead>
                <TableHead>Nama Program</TableHead>
                <TableHead>Wilayah</TableHead>
                <TableHead>Jumlah Penerima</TableHead>
                <TableHead>Tanggal Penyaluran</TableHead>
                <TableHead>Bukti Pembayaran</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[300px]">Catatan</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports &&
                reports!.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium"> {index + 1} </TableCell>
                    <TableCell> {item.name} </TableCell>
                    <TableCell>
                      {" "}
                      {item.province}, {item.district}, {item.subDistrict}{" "}
                    </TableCell>{" "}
                    <TableCell> {item.count} </TableCell>
                    <TableCell> {item.date} </TableCell>
                    <TableCell>
                      {" "}
                      <a
                        href={`https://api-interview.mcomp.web.id/storage/report/${item.proof}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        {item.proof}{" "}
                      </a>{" "}
                    </TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell className="text-justify">
                      {item.note ? item.note : "Tidak ada"}
                    </TableCell>
                    {item.status === "Pending" && (
                      <TableCell className="gap-4 flex flex-col ">
                        <Button onClick={() => handleAcc(item.id)}>
                          Terima
                        </Button>
                        <Button
                          onClick={() =>
                            setState({ showModal: true, id: item.id })
                          }
                          variant={"destructive"}
                        >
                          Tolak
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </div>

      <DeclineReportModal
        isOpen={state.showModal}
        handleModal={() => setState({ showModal: false, id: "" })}
        handleDelete={handleDecline}
        ref={textAreaRef}
      />
    </main>
  );
}
