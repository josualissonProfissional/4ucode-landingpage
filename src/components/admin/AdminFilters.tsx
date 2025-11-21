import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { UF_OPTIONS, UF_NAMES, COMMON_COLLEGES } from "@/types/user";
import { Search, X, Download, Filter } from "lucide-react";

interface AdminFiltersProps {
  selectedUFs: string[];
  onUFChange: (ufs: string[]) => void;
  onlyStudents: boolean;
  onOnlyStudentsChange: (value: boolean) => void;
  college: string;
  onCollegeChange: (value: string) => void;
  q: string;
  onQChange: (value: string) => void;
  onClear: () => void;
  onExport: () => void;
  resultCount: number;
}

export const AdminFilters = ({
  selectedUFs,
  onUFChange,
  onlyStudents,
  onOnlyStudentsChange,
  college,
  onCollegeChange,
  q,
  onQChange,
  onClear,
  onExport,
  resultCount
}: AdminFiltersProps) => {
  const addUF = (uf: string) => {
    if (!selectedUFs.includes(uf)) {
      onUFChange([...selectedUFs, uf]);
    }
  };

  const removeUF = (uf: string) => {
    onUFChange(selectedUFs.filter(u => u !== uf));
  };

  return (
    <div className="space-y-4 p-6 rounded-lg bg-card border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Filtros</h3>
          <Badge variant="secondary">{resultCount} resultados</Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onClear}>
            <X className="w-4 h-4 mr-2" />
            Limpar filtros
          </Button>
          <Button variant="default" size="sm" onClick={onExport} className="gradient-primary">
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {/* Busca */}
        <div className="space-y-2">
          <Label htmlFor="search">Buscar (nome/email)</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="search"
              type="text"
              placeholder="Buscar..."
              value={q}
              onChange={(e) => onQChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Estado (UF) */}
        <div className="space-y-2">
          <Label htmlFor="uf">Estado (UF)</Label>
          <Select onValueChange={addUF}>
            <SelectTrigger id="uf">
              <SelectValue placeholder="Selecionar estado" />
            </SelectTrigger>
            <SelectContent>
              {UF_OPTIONS.map((uf) => (
                <SelectItem key={uf} value={uf} disabled={selectedUFs.includes(uf)}>
                  {uf} - {UF_NAMES[uf]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Faculdade */}
        <div className="space-y-2">
          <Label htmlFor="college">Faculdade</Label>
          <div className="relative">
            <Input
              id="college"
              type="text"
              list="colleges"
              placeholder="Digite ou selecione"
              value={college}
              onChange={(e) => onCollegeChange(e.target.value)}
            />
            <datalist id="colleges">
              {COMMON_COLLEGES.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
        </div>

        {/* Somente Estudantes */}
        <div className="space-y-2">
          <Label htmlFor="only-students">Somente estudantes</Label>
          <div className="flex items-center space-x-2 h-10">
            <Switch
              id="only-students"
              checked={onlyStudents}
              onCheckedChange={onOnlyStudentsChange}
            />
            <Label htmlFor="only-students" className="cursor-pointer text-sm">
              {onlyStudents ? "Ativo" : "Inativo"}
            </Label>
          </div>
        </div>
      </div>

      {/* Selected UF Chips */}
      {selectedUFs.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {selectedUFs.map((uf) => (
            <Badge key={uf} variant="secondary" className="gap-1">
              {uf}
              <button
                onClick={() => removeUF(uf)}
                className="ml-1 hover:text-destructive"
                aria-label={`Remover filtro ${uf}`}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
