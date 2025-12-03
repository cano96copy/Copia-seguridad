// src/components/ClientManager.tsx
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Upload,
  Trash2,
  Edit2,
  Check,
  X,
  FileText,
  Loader2,
  Building2,
  Users,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { Client, CreateClientData, createClient, updateClient, deleteClient, uploadClientFiles } from "@/lib/clients";

interface ClientManagerProps {
  clients: Client[];
  userId: string;
  selectedClientId: string | null;
  onClientSelect: (clientId: string | null) => void;
  onClientsChange: () => void;
}

const ClientManager = ({
  clients,
  userId,
  selectedClientId,
  onClientSelect,
  onClientsChange
}: ClientManagerProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newClientData, setNewClientData] = useState<CreateClientData>({ name: "", description: "", sector: "" });
  const [editData, setEditData] = useState<CreateClientData>({ name: "", description: "", sector: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingClientId, setUploadingClientId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateClient = async () => {
    if (!newClientData.name.trim()) {
      setError("El nombre del cliente es obligatorio");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await createClient(userId, newClientData);
      setNewClientData({ name: "", description: "", sector: "" });
      setIsCreating(false);
      onClientsChange();
    } catch (err) {
      setError("Error al crear el cliente");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateClient = async (clientId: string) => {
    if (!editData.name.trim()) {
      setError("El nombre del cliente es obligatorio");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await updateClient(clientId, editData);
      setEditingId(null);
      onClientsChange();
    } catch (err) {
      setError("Error al actualizar el cliente");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClient = async (clientId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este cliente? Se eliminarán también todos los archivos asociados.")) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await deleteClient(clientId);
      if (selectedClientId === clientId) {
        onClientSelect(null);
      }
      onClientsChange();
    } catch (err) {
      setError("Error al eliminar el cliente");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (client: Client) => {
    setEditingId(client.id);
    setEditData({
      name: client.name,
      description: client.description || "",
      sector: client.sector || ""
    });
  };

  const handleFileUpload = async (clientId: string, files: FileList | null) => {
    if (!files || files.length === 0) return;

    const pdfFiles = Array.from(files).filter(f => f.type === "application/pdf");
    if (pdfFiles.length === 0) {
      setError("Solo se permiten archivos PDF");
      return;
    }

    setUploadingClientId(clientId);
    setError(null);

    try {
      await uploadClientFiles(clientId, pdfFiles);
      onClientsChange();
    } catch (err) {
      setError("Error al subir los archivos");
      console.error(err);
    } finally {
      setUploadingClientId(null);
    }
  };

  const triggerFileUpload = (clientId: string) => {
    setUploadingClientId(clientId);
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        multiple
        className="hidden"
        onChange={(e) => {
          if (uploadingClientId) {
            handleFileUpload(uploadingClientId, e.target.files);
          }
        }}
      />

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-auto">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Create new client form */}
      {isCreating ? (
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-3">
          <input
            type="text"
            placeholder="Nombre del cliente *"
            value={newClientData.name}
            onChange={(e) => setNewClientData({ ...newClientData, name: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            autoFocus
          />
          <input
            type="text"
            placeholder="Sector (ej: Marketing, Coaching...)"
            value={newClientData.sector}
            onChange={(e) => setNewClientData({ ...newClientData, sector: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <textarea
            placeholder="Descripción (opcional)"
            value={newClientData.description}
            onChange={(e) => setNewClientData({ ...newClientData, description: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            rows={2}
          />
          <div className="flex gap-2">
            <Button
              onClick={handleCreateClient}
              disabled={isLoading}
              className="flex-1 bg-primary hover:bg-primary/90 text-white"
              size="sm"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4 mr-1" />}
              Crear
            </Button>
            <Button
              onClick={() => {
                setIsCreating(false);
                setNewClientData({ name: "", description: "", sector: "" });
              }}
              variant="outline"
              size="sm"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsCreating(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-primary hover:text-primary transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span className="text-sm font-medium">Nuevo Cliente</span>
        </button>
      )}

      {/* Client list */}
      <div className="space-y-2">
        {clients.length === 0 && !isCreating ? (
          <div className="text-center py-8 text-gray-400">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No tienes clientes todavía</p>
            <p className="text-xs mt-1">Crea un cliente para guardar su información</p>
          </div>
        ) : (
          clients.map((client) => (
            <div key={client.id}>
              {editingId === client.id ? (
                // Edit mode
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                  <input
                    type="text"
                    placeholder="Nombre del cliente *"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    autoFocus
                  />
                  <input
                    type="text"
                    placeholder="Sector"
                    value={editData.sector}
                    onChange={(e) => setEditData({ ...editData, sector: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <textarea
                    placeholder="Descripción"
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleUpdateClient(client.id)}
                      disabled={isLoading}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white"
                      size="sm"
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4 mr-1" />}
                      Guardar
                    </Button>
                    <Button
                      onClick={() => setEditingId(null)}
                      variant="outline"
                      size="sm"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                // View mode
                <div
                  className={`
                    p-4 border rounded-xl transition-all cursor-pointer
                    ${selectedClientId === client.id
                      ? "bg-primary/5 border-primary"
                      : "bg-white border-gray-200 hover:border-gray-300"
                    }
                  `}
                  onClick={() => onClientSelect(client.id === selectedClientId ? null : client.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <h4 className="font-medium text-gray-900 truncate">{client.name}</h4>
                        {selectedClientId === client.id && (
                          <ChevronRight className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      {client.sector && (
                        <p className="text-xs text-gray-500 mt-1 ml-6">{client.sector}</p>
                      )}
                      {client.description && (
                        <p className="text-xs text-gray-400 mt-1 ml-6 line-clamp-2">{client.description}</p>
                      )}
                      
                      {/* File count */}
                      <div className="flex items-center gap-1 mt-2 ml-6">
                        <FileText className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-xs text-gray-400">
                          {client.openai_file_ids?.length || 0} archivo(s)
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => triggerFileUpload(client.id)}
                        disabled={uploadingClientId === client.id}
                        className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        title="Subir PDFs"
                      >
                        {uploadingClientId === client.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => startEditing(client)}
                        className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientManager;


