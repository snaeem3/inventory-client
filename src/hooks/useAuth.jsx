import { useContext } from 'react';
import { AuthContext } from '../AuthProvider'; // Assuming AuthProvider is defined in another file

export const useAuth = () => useContext(AuthContext);
