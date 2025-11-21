import { User } from "@/types/user";
import { mockUsers } from "@/data/mockUsers";

const STORAGE_KEY = "users";
const MOCK_SEEDED_KEY = "mockSeeded";

export const initializeUsers = (): User[] => {
  const mockSeeded = localStorage.getItem(MOCK_SEEDED_KEY);
  
  if (!mockSeeded) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUsers));
    localStorage.setItem(MOCK_SEEDED_KEY, "true");
    return mockUsers;
  }
  
  const storedUsers = localStorage.getItem(STORAGE_KEY);
  return storedUsers ? JSON.parse(storedUsers) : mockUsers;
};

export const getAllUsers = (): User[] => {
  const users = localStorage.getItem(STORAGE_KEY);
  return users ? JSON.parse(users) : initializeUsers();
};

export const addUser = (user: User): void => {
  const users = getAllUsers();
  const updatedUsers = [...users, user];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
};

export const exportToCSV = (users: User[]): void => {
  const esc = (v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const headers = ["id", "nome", "email", "estado", "isEstudante", "faculdade", "cargo", "createdAt", "origem"];
  
  const csvContent = [
    headers.join(","),
    ...users.map(user => 
      headers.map(h => esc(user[h as keyof User])).join(",")
    )
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `usuarios_${Date.now()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
