import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/user";
import { CheckCircle, XCircle, ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface AdminTableProps {
  users: User[];
  sortField: keyof User;
  sortDirection: "asc" | "desc";
  onSort: (field: keyof User) => void;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const AdminTable = ({
  users,
  sortField,
  sortDirection,
  onSort,
  page,
  pageSize,
  onPageChange
}: AdminTableProps) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedUsers = users.slice(startIndex, endIndex);
  const totalPages = Math.ceil(users.length / pageSize);

  const SortButton = ({ field, label }: { field: keyof User; label: string }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onSort(field)}
      className="h-8 px-2 gap-1"
    >
      {label}
      <ArrowUpDown className="w-3 h-3" />
    </Button>
  );

  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Nenhum usuário encontrado</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Limpar filtros
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><SortButton field="nome" label="Nome" /></TableHead>
              <TableHead>Email</TableHead>
              <TableHead><SortButton field="estado" label="Estado" /></TableHead>
              <TableHead>Estudante?</TableHead>
              <TableHead>Faculdade</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead><SortButton field="createdAt" label="Criado em" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.nome}</TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{user.estado}</Badge>
                </TableCell>
                <TableCell>
                  {user.isEstudante ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-muted" />
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {user.faculdade || "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {user.cargo || (user.isEstudante ? "Estudante" : "—")}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(new Date(user.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1}-{Math.min(endIndex, users.length)} de {users.length}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
            >
              Anterior
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={page === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(pageNum)}
                    className="w-8"
                  >
                    {pageNum}
                  </Button>
                );
              })}
              {totalPages > 5 && <span className="px-2">...</span>}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
            >
              Próxima
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
