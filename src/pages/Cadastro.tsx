import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, Loader2 } from "lucide-react";
import { Header } from "@/components/sections/Header";
import { SEO } from "@/components/SEO";
import { z } from "zod";
import { UF_OPTIONS, UF_NAMES, COMMON_COLLEGES, type UF } from "@/types/user";
import { addUser } from "@/utils/userStorage";

const cadastroSchema = z.object({
  nome: z.string().trim().min(2, "Nome deve ter no mínimo 2 caracteres").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  estado: z.string().min(2, "Selecione um estado"),
  isEstudante: z.boolean(),
  faculdade: z.string().optional(),
  cargo: z.string().optional(),
  consentimento: z.boolean().refine((val) => val === true, "Você deve aceitar os termos")
}).refine((data) => {
  if (data.isEstudante && !data.faculdade?.trim()) {
    return false;
  }
  return true;
}, {
  message: "Faculdade é obrigatória para estudantes",
  path: ["faculdade"]
});

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    estado: "",
    isEstudante: false,
    faculdade: "",
    cargo: "",
    consentimento: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = cadastroSchema.parse(formData);

      // Salvar no localStorage
      const newUser = {
        id: `user_${Date.now()}`,
        nome: validatedData.nome,
        email: validatedData.email,
        estado: validatedData.estado as UF,
        isEstudante: validatedData.isEstudante,
        faculdade: validatedData.isEstudante ? validatedData.faculdade : undefined,
        cargo: validatedData.isEstudante ? undefined : validatedData.cargo,
        createdAt: new Date().toISOString(),
        origem: "signup" as const
      };

      addUser(newUser);

      setIsSuccess(true);
      toast({
        title: "Cadastro realizado!",
        description: "Sua conta foi criada com sucesso. Entraremos em contato em breve.",
      });

      // Limpar formulário
      setFormData({
        nome: "",
        email: "",
        estado: "",
        isEstudante: false,
        faculdade: "",
        cargo: "",
        consentimento: false
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erro de validação",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erro ao enviar cadastro",
          description: "Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#060111] via-[#0b0720] to-background">
        <SEO 
          title="Cadastro Realizado - 4uCode"
          description="Seu cadastro foi recebido com sucesso"
        />
        <Header />
        <Card data-scroll-reveal className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Recebemos seu cadastro!</CardTitle>
            <CardDescription className="text-base mt-2">
              Entraremos em contato em breve.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => window.location.href = "/"}
              className="gradient-primary shadow-purple w-full"
            >
              Voltar para Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060111] via-[#0b0720] to-background text-white">
      <SEO 
        title="Cadastro - 4uCode"
        description="Cadastre-se para receber mais informa����es sobre o 4uCode"
      />
      <Header />
      <div className="py-12 px-4 flex items-center justify-center" style={{ 
        background: 'radial-gradient(1200px 600px at 20% -10%, hsl(240 10% 12%) 0%, hsl(240 10% 4%) 60%)'
      }}>
      <SEO 
        title="Cadastro - 4uCode"
        description="Cadastre-se para receber mais informações sobre o 4uCode"
      />
      
      {/* Grain texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05]" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat'
        }} 
      />
      <div className="container max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center space-x-3 group mb-6">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-xl shadow-purple group-hover:shadow-lg transition-all">
              4u
            </div>
            <span className="font-display text-3xl font-bold text-white group-hover:text-primary transition-colors">
              4uCode
            </span>
          </a>
          <h1 className="text-4xl font-bold text-white mb-4">
            Cadastre-se
          </h1>
          <p className="text-muted-foreground text-lg">
            Preencha os dados abaixo e entraremos em contato
          </p>
        </div>

      <Card data-scroll-reveal className="shadow-2xl shadow-primary/20 relative"
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '1.5rem'
          }}
        >
          <CardHeader>
            <CardTitle>Informações de Contato</CardTitle>
            <CardDescription>
              Todos os campos são obrigatórios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  maxLength={255}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estado">Estado (UF)</Label>
                <Select value={formData.estado} onValueChange={(value) => setFormData({ ...formData, estado: value })}>
                  <SelectTrigger id="estado">
                    <SelectValue placeholder="Selecione seu estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {UF_OPTIONS.map((uf) => (
                      <SelectItem key={uf} value={uf}>
                        {uf} - {UF_NAMES[uf]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isEstudante"
                  checked={formData.isEstudante}
                  onCheckedChange={(checked) => setFormData({ ...formData, isEstudante: checked === true, cargo: checked ? "" : formData.cargo })}
                />
                <Label htmlFor="isEstudante" className="cursor-pointer">
                  Sou apenas estudante
                </Label>
              </div>

              {formData.isEstudante && (
                <div className="space-y-2">
                  <Label htmlFor="faculdade">Faculdade *</Label>
                  <Input
                    id="faculdade"
                    type="text"
                    list="colleges"
                    placeholder="Digite ou selecione sua faculdade"
                    value={formData.faculdade}
                    onChange={(e) => setFormData({ ...formData, faculdade: e.target.value })}
                    required={formData.isEstudante}
                    maxLength={200}
                  />
                  <datalist id="colleges">
                    {COMMON_COLLEGES.map((college) => (
                      <option key={college} value={college} />
                    ))}
                  </datalist>
                </div>
              )}

              {!formData.isEstudante && (
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input
                    id="cargo"
                    type="text"
                    placeholder="Seu cargo atual"
                    value={formData.cargo}
                    onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                    maxLength={100}
                  />
                </div>
              )}

              <div className="flex items-start space-x-2 p-4 rounded-lg bg-muted/20 border">
                <Checkbox
                  id="consentimento"
                  checked={formData.consentimento}
                  onCheckedChange={(checked) => setFormData({ ...formData, consentimento: checked === true })}
                  required
                />
                <Label htmlFor="consentimento" className="cursor-pointer text-sm leading-relaxed">
                  Aceito os termos e concordo com o processamento dos meus dados conforme a LGPD.
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full gradient-primary shadow-purple"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar Cadastro"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cadastro;
