/**@author Dowglas maia 
 * Class de Base Dados Fake em Momoria - Simula uma API Rest.
 */
import { InMemoryDbService } from "angular-in-memory-web-api";

import { Category } from './pages/categories/shared/category.model';

export class InMemoryDatabase implements InMemoryDbService {

    createDb() {
        const categories: Category[] = [
            { id: 1, name: "Lazer", description: "Gastos fim de Semana" },
            { id: 2, name: "Combustivel", description: "Mes de Combustivel" },
            { id: 3, name: "Almoço", description: "Almoço" },
            { id: 4, name: "Praia", description: "Fim de Semana de Lazer" },
            { id: 5, name: "Cinema", description: "Ferias" },
            { id: 6, name: "Jogos", description: "Diversão" },
        ];

        return { categories }
    }

}