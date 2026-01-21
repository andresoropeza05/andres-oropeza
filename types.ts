
export interface Product {
  id: string;
  name: string;
  price: number;
  qty: number;
  unit: string;
  category?: string;
  stock?: number;
}

export interface Client {
  id: string;
  name: string;
  address: string;
  rfc?: string;
  channel?: string;
}

export interface Order {
  id: string;
  client: Client;
  items: Product[];
  total: number;
  date: string;
  status: 'Sincronizado' | 'Pendiente';
}

export interface AppState {
  isOffline: boolean;
  user: {
    name: string;
    id: string;
    route: string;
  };
}
