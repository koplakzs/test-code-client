import axiosInstance from "@/lib/axios";

interface AuthInterface {
  email: string;
  password: string;
  token?: string;
  userId?: string;
  role?: string;
}

interface ReportInterface {
  id?: string;
  name: string;
  count: number;
  province: string;
  district: string;
  subDistrict: string;
  date: string;
  proof?: File;
  note?: string;
  status?: string;
  reason?: string;
}

interface StatusUpdate {
  status: string;
  reason?: string;
}

export const postAuth = (body: AuthInterface) =>
  axiosInstance.post("/auth", body);

export const getReports = (token: string) =>
  axiosInstance.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

export const postReport = (token: string, body: ReportInterface) =>
  axiosInstance.post("/user/store", body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
export const putReport = (token: string, id: string, body: ReportInterface) =>
  axiosInstance.post(`/user/update/${id}?_method=put`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteReport = (token: string, id: string) =>
  axiosInstance.delete(`/user/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

//   Admin

export const getStatistic = (token: string) =>
  axiosInstance.get("/admin/statistic", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAdminReports = (token: string) =>
  axiosInstance.get("/admin", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
export const putStatusReport = (
  token: string,
  id: string,
  body: StatusUpdate
) =>
  axiosInstance.put(`/admin/status-update/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
