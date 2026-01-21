
import { Product, Client } from './types';

export const MOCK_PRODUCTS: Product[] = [
  { id: '10293', name: 'Jamón Virginia 250g', price: 450, qty: 0, unit: 'Kg' },
  { id: '20155', name: 'Queso Panela FUD 400g', price: 1200, qty: 0, unit: 'Pza' },
  { id: '33012', name: 'Salchicha Viena Chimex 1kg', price: 800, qty: 0, unit: 'Pza' },
  { id: '44501', name: 'Yoghurt Piña 330g YPT', price: 16, qty: 0, unit: 'Pza' },
  { id: '55620', name: 'Chorizo Casero 200g', price: 35, qty: 0, unit: 'Pza' }
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
