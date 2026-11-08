const TASK_API_URL = process.env.NEXT_PUBLIC_TASK_API_URL ?? "http://localhost:8081";
const USER_API_URL = process.env.NEXT_PUBLIC_USER_API_URL ?? "http://localhost:8080";

export type Task = {
  id: string;
  title: string;
  description: string;
  city: string;
  neighborhood: string;
  status: "OPEN" | "ONGOING" | "FINISHED" | "CANCELED";
  modality: "HYBRID" | "HOME_OFFICE" | "IN_PERSON";
  dateTimeOpen?: string;
  dateTimeClosed?: string;
  dateTimeCriation?: string;
  income?: number;
};

async function request<T>(baseUrl: string, path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    credentials: "include",
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Erro ${response.status} ao comunicar com o serviço.`);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export const taskApi = {
  list: () => request<Task[]>(TASK_API_URL, "/tasks"),
  create: (task: Omit<Task, "id"> & { idemployer?: string }) =>
    request<Task>(TASK_API_URL, "/tasks", { method: "POST", body: JSON.stringify(task) }),
};

export const userApi = {
  csrf: () => request<{ token: string }>(USER_API_URL, "/api/auth/csrf"),
  login: (email: string, password: string, csrfToken: string) =>
    request<{ email: string; message: string }>(USER_API_URL, "/api/auth/login", {
      method: "POST",
      headers: { "X-XSRF-TOKEN": csrfToken },
      body: JSON.stringify({ email, password }),
    }),
};
