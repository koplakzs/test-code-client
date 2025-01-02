import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { UseFormReturn } from "react-hook-form";
import { reportSchema } from "@/utis/schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

interface SubDistrict {
  id: string;
  name: string;
}

interface District {
  id: string;
  name: string;
  subDistricts: SubDistrict[];
}

interface Province {
  id: string;
  name: string;
  districts: District[];
}

interface ReportModalProps {
  isEdit?: boolean;
  isShow?: boolean;
  isOpen: boolean;
  handleModal: () => void;
  form: UseFormReturn<z.infer<typeof reportSchema>>;
  onSubmit: (values: z.infer<typeof reportSchema>) => void;
}

export default function ReportModal({
  isOpen,
  form,
  handleModal,
  onSubmit,
  isEdit,
  isShow,
}: ReportModalProps) {
  const provinces: Province[] = [
    {
      id: "1",
      name: "Jawa Barat",
      districts: [
        {
          id: "1-1",
          name: "Bandung",
          subDistricts: [
            { id: "1-1-1", name: "Cidadap" },
            { id: "1-1-2", name: "Coblong" },
          ],
        },
        {
          id: "1-2",
          name: "Bogor",
          subDistricts: [
            { id: "1-2-1", name: "Babakan" },
            { id: "1-2-2", name: "Tanah Sereal" },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Jawa Timur",
      districts: [
        {
          id: "2-1",
          name: "Surabaya",
          subDistricts: [
            { id: "2-1-1", name: "Genteng" },
            { id: "2-1-2", name: "Sukolilo" },
          ],
        },
        {
          id: "2-2",
          name: "Malang",
          subDistricts: [
            { id: "2-2-1", name: "Blimbing" },
            { id: "2-2-2", name: "Lowokwaru" },
          ],
        },
      ],
    },
  ];

  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const selectedProvinceData = provinces.find(
    (prov) => prov.name === selectedProvince
  );
  const selectedDistrictData = selectedProvinceData?.districts.find(
    (dist) => dist.name === selectedDistrict
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleModal}>
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit" : isShow ? "Lihat" : "Buat"} Laporan
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" grid grid-cols-2 gap-10"
            encType="multipart/form-data"
          >
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Program</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isShow}
                        placeholder="Nama Program"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah Penerima</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isShow}
                        type="number"
                        placeholder="Jumlah Penerima"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wilayah Provinsi</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        setSelectedProvince(value);
                        setSelectedDistrict(null);
                        field.onChange(value);
                        console.log(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Wilayah Provinsi" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {provinces.map((prov) => (
                          <SelectItem key={prov.id} value={prov.name}>
                            {prov.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wilayah Kabupaten</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          setSelectedDistrict(value);
                          field.onChange(value);
                        }}
                        defaultValue={field.value}
                        disabled={!selectedProvince}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Wilayah Kabupaten" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectedProvinceData?.districts.map((dist) => (
                            <SelectItem key={dist.id} value={dist.name}>
                              {dist.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subDistrict"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wilayah Kecamatan</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!selectedDistrict}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Wilayah Kecamatan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectedDistrictData?.subDistricts.map((sub) => (
                            <SelectItem key={sub.id} value={sub.name}>
                              {sub.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Penyaluran</FormLabel>
                    <FormControl>
                      <Input disabled={isShow} type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="proof"
                render={({ field: { onChange } }) => (
                  <FormItem>
                    <FormLabel>Bukti Penyaluran</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isShow}
                        type="file"
                        onChange={(e) => {
                          onChange(e.target.value && e.target.files![0]);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      File upload: JPG/PNG/PDF, maksimal 2MB
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catatan Penyaluran</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter
              className={`${isShow ? "hidden" : "block"} col-end-3`}
            >
              <Button type={"submit"} className="w-full">
                {" "}
                {isEdit ? "Edit" : "Kirim"}{" "}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
