import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { postAuth } from "@/service/api";
import { authSchema } from "@/utis/schema";
import { useNavigate } from "react-router";

interface ResponseAuth {
  status: string;
  statusCode: number;
  data: {
    token: string;
    userId: number;
    role: string;
  };
}

export default function Login() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof authSchema>) => {
    try {
      const response = await postAuth({
        email: values.email,
        password: values.password,
      });
      const result: ResponseAuth = response.data;
      if (result.statusCode !== 200) {
        throw new Error(`Error ${result.statusCode}`);
      }
      sessionStorage.setItem("authToken", result.data.token);
      sessionStorage.setItem("role", result.data.role);
      if (result.data.role === "user") {
        navigate("/user", { replace: true });
      } else if (result.data.role === "admin") {
        navigate("/admin", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="bg-zinc-50 min-h-screen flex justify-center items-center p-10">
      <section className="border rounded-xl p-10 max-w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <p className="text-2xl font-bold text-center pb-5">
              Selamat Datang
              <br /> Sistem Monitoring dan Evaluasi Program Bantuan Sosial{" "}
            </p>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </section>
    </main>
  );
}
