import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { AdminTable } from "@/components/admin/AdminTable";
import { RevealSection } from "@/components/RevealSection";
import { getAllUsers } from "@/utils/userStorage";
import type { User } from "@/types/user";

const Admin = () => {
  const users = getAllUsers();
  
  const [selectedUFs, setSelectedUFs] = useState<string[]>([]);
  const [onlyStudents, setOnlyStudents] = useState(false);
  const [college, setCollege] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<keyof User>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filtros aplicados
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Filtro por UF
      if (selectedUFs.length > 0 && !selectedUFs.includes(user.estado)) {
        return false;
      }

      // Filtro "Somente estudantes"
      if (onlyStudents && !user.isEstudante) {
        return false;
      }

      // Filtro por faculdade
      if (college.trim() && (!user.faculdade || !user.faculdade.toLowerCase().includes(college.toLowerCase()))) {
        return false;
      }

      // Busca por nome ou email
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = user.nome.toLowerCase().includes(query);
        const matchesEmail = user.email.toLowerCase().includes(query);
        if (!matchesName && !matchesEmail) {
          return false;
        }
      }

      return true;
    });
  }, [users, selectedUFs, onlyStudents, college, searchQuery]);

  // Ordenação
  const sortedUsers = useMemo(() => {
    const sorted = [...filteredUsers].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc" 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === "boolean" && typeof bVal === "boolean") {
        return sortDirection === "asc" 
          ? (aVal === bVal ? 0 : aVal ? 1 : -1) 
          : (aVal === bVal ? 0 : bVal ? 1 : -1);
      }

      return 0;
    });

    return sorted;
  }, [filteredUsers, sortField, sortDirection]);

  // Paginação
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return sortedUsers.slice(start, end);
  }, [sortedUsers, currentPage, pageSize]);

  const handleSort = (field: keyof User) => {
    if (field === sortField) {
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
    setCurrentPage(1);
  };

  const handleExport = () => {
    const headers = ["id", "nome", "email", "estado", "isEstudante", "faculdade", "cargo", "createdAt", "origem"];
    const escape = (v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    
    const csv = [headers.join(",")]
      .concat(
        sortedUsers.map((user) =>
          headers.map((h) => escape(user[h as keyof User])).join(",")
        )
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `usuarios_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <SEO 
        title="Painel Admin - 4uCode"
        description="Painel administrativo do 4uCode"
      />
      <div className="container max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <RevealSection
          as="div"
          className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <a href="/" className="inline-flex items-center space-x-3 group mb-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-xl shadow-purple group-hover:shadow-lg transition-all">
                4u
              </div>
              <span className="font-display text-3xl font-bold text-white group-hover:text-primary transition-colors">
                4uCode Admin
              </span>
            </a>
            <p className="text-muted-foreground">
              Gerencie os cadastros recebidos
            </p>
          </div>
          <Button onClick={() => window.location.href = "/"} variant="outline">
            Voltar para Home
          </Button>
        </RevealSection>

        {/* Filtros */}
        <RevealSection as="div" data-reveal-stagger="90">
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
            onExport={handleExport}
            resultCount={sortedUsers.length}
          />
        </RevealSection>

        {/* Tabela */}
        <RevealSection as="div" data-reveal-stagger="110">
          <AdminTable
            users={sortedUsers}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            page={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        </RevealSection>
      </div>
    </div>
  );
};

export default Admin;
