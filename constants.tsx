
import { Product, Client } from './types';

export const MOCK_PRODUCTS: Product[] = [
  { 
    id: '10293', 
    name: 'Jamón Virginia FUD 250g', 
    price: 54.50, 
    qty: 0, 
    unit: 'Pza'
  },
  { 
    id: '20155', 
    name: 'Queso Panela NocheBuena 400g', 
    price: 89.00, 
    qty: 0, 
    unit: 'Pza'
  },
  { 
    id: '33012', 
    name: 'Salchicha Viena Chimex 1kg', 
    price: 112.00, 
    qty: 0, 
    unit: 'Pza'
  },
  { 
    id: '44501', 
    name: 'Yoghurt Piña 330g Yoplait', 
    price: 18.50, 
    qty: 0, 
    unit: 'Pza'
  },
  { 
    id: '55620', 
    name: 'Chorizo Casero 200g', 
    price: 42.00, 
    qty: 0, 
    unit: 'Pza'
  }
];

export const MOCK_CLIENTS: Client[] = [
  { id: '4099238', name: 'ABARROTES "LA BENDICIÓN"', address: 'Av. Independencia 402, Centro' },
  { id: '3389211', name: 'CARNICERÍA SAN JOSÉ', address: 'Calle Morelos #15, San Juan' },
  { id: '5567120', name: 'SUPER EXPRESS S.A.', address: 'Prolongación Reforma S/N' }
];

export const APP_THEME = {
  primary: '#22c3b6',
  sigmaBlue: '#0d3359',
  accentRed: '#D8203E'
};
