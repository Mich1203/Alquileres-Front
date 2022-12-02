export interface IPlace {
  id?: number;
  capacity: number;
  measurements: number;
  measure_units: string;
  address: string;
  no_of_bathrooms: number;
  no_of_rooms: number;
  description: string;
  images?: string[];
  price: number;
  is_rented: boolean;
}
