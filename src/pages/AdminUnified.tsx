import { useState, useEffect } from "react";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { AdminTable } from "@/components/admin/AdminTable";
import { User, type UF } from "@/types/user";
import { getAllUsers, exportToCSV, initializeUsers } from "@/utils/userStorage";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AdminUsers = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUFs, setSelectedUFs] = useState<string[]>([]);
  const [onlyStudents, setOnlyStudents] = useState(false);
  const [college, setCollege] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<keyof User>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);

  useEffect(() => {
    const users = initializeUsers();
    setAllUsers(users);
    setFilteredUsers(users);
  }, []);

  useEffect(() => {
    let result = [...allUsers];

    if (selectedUFs.length > 0) {
      result = result.filter(u => selectedUFs.includes(u.estado));
    }

    if (onlyStudents) {
      result = result.filter(u => u.isEstudante);
    }

    if (college.trim()) {
      result = result.filter(u => 
        u.faculdade?.toLowerCase().includes(college.toLowerCase())
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(u =>
        u.nome.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const compare = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDirection === "asc" ? compare : -compare;
    });

    setFilteredUsers(result);
    setPage(1);
  }, [allUsers, selectedUFs, onlyStudents, college, searchQuery, sortField, sortDirection]);

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleClearFilters = () => {
    setSelectedUFs([]);
    setOnlyStudents(false);
    setCollege("");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <SEO title="Admin - Usuários" description="Gerenciar usuários cadastrados" />
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Usuários</h1>
            <p className="text-muted-foreground">Gerencie os usuários cadastrados</p>
          </div>
          <Button variant="outline" onClick={() => window.location.href = "/"}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        <AdminFilters
          selectedUFs={selectedUFs}
          onUFChange={setSelectedUFs}
          onlyStudents={onlyStudents}
          onOnlyStudentsChange={setOnlyStudents}
          college={college}
          onCollegeChange={setCollege}
          q={searchQuery}
          onQChange={setSearchQuery}
          onClear={handleClearFilters}
          onExport={() => exportToCSV(filteredUsers)}
          resultCount={filteredUsers.length}
        />

        <div className="mt-6">
          <AdminTable
            users={filteredUsers}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            page={page}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
