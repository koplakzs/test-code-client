import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

const stringSchema = z.string().min(2, { message: "Minimal 2 huruf" });
const numberSchema = z.coerce.number();
const pict = z
  .instanceof(File, { message: "Bukti tidak boleh kosong" })
  .refine((file) => ALLOWED_FILE_TYPES.includes(file.type), {
    message: "File harus berupa JPG, PNG, atau PDF.",
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "Ukuran file maksimal adalah 2MB.",
  });

export const authSchema = z.object({
  email: stringSchema.email(),
  password: stringSchema,
});

export const reportSchema = z.object({
  name: stringSchema,
  count: numberSchema,
  province: stringSchema,
  district: stringSchema,
  subDistrict: stringSchema,
  date: stringSchema,
  proof: pict,
  note: z.string().optional(),
});
