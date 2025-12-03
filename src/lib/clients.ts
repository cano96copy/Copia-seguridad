// src/lib/clients.ts
import { supabase } from "./supabase";

export interface Client {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  sector: string | null;
  openai_file_ids: string[];
  openai_vector_store_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateClientData {
  name: string;
  description?: string;
  sector?: string;
}

export interface UpdateClientData {
  name?: string;
  description?: string;
  sector?: string;
  openai_file_ids?: string[];
  openai_vector_store_id?: string;
}

/**
 * Obtiene todos los clientes del usuario actual
 */
export async function getClients(userId: string): Promise<Client[]> {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }

  return data || [];
}

/**
 * Obtiene un cliente por ID
 */
export async function getClient(clientId: string): Promise<Client | null> {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", clientId)
    .single();

  if (error) {
    console.error("Error fetching client:", error);
    return null;
  }

  return data;
}

/**
 * Crea un nuevo cliente
 */
export async function createClient(userId: string, clientData: CreateClientData): Promise<Client> {
  const { data, error } = await supabase
    .from("clients")
    .insert({
      user_id: userId,
      name: clientData.name,
      description: clientData.description || null,
      sector: clientData.sector || null,
      openai_file_ids: [],
      openai_vector_store_id: null
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating client:", error);
    throw error;
  }

  return data;
}

/**
 * Actualiza un cliente existente
 */
export async function updateClient(clientId: string, clientData: UpdateClientData): Promise<Client> {
  const { data, error } = await supabase
    .from("clients")
    .update({
      ...clientData,
      updated_at: new Date().toISOString()
    })
    .eq("id", clientId)
    .select()
    .single();

  if (error) {
    console.error("Error updating client:", error);
    throw error;
  }

  return data;
}

/**
 * Elimina un cliente
 */
export async function deleteClient(clientId: string): Promise<void> {
  const { error } = await supabase
    .from("clients")
    .delete()
    .eq("id", clientId);

  if (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
}

/**
 * Sube archivos PDF a OpenAI y actualiza el cliente con los file_ids
 * Esta función debe llamar a una Edge Function para subir los archivos a OpenAI
 */
export async function uploadClientFiles(
  clientId: string, 
  files: File[]
): Promise<{ success: boolean; fileIds: string[]; vectorStoreId?: string }> {
  const formData = new FormData();
  formData.append("clientId", clientId);
  
  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/upload-client-files`,
    {
      method: "POST",
      headers: {
        "apikey": import.meta.env.VITE_SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: formData
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error uploading files: ${error}`);
  }

  return response.json();
}


