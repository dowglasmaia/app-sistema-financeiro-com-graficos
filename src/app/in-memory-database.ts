/**@author Dowglas maia 
 * Class de Base Dados Fake em Momoria - Simula uma API Rest.
 */
import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDatabase implements InMemoryDbService {

    createDb() {
        const categories = [
            { id: 1, nome: "Lazer", descricao: "Gastos fim de Semana" },
            { id: 2, nome: "Combustivel", descricao: "Mes de Combustivel" },
            { id: 3, nome: "Almoço", descricao: "Almoço" },
            { id: 4, nome: "Praia", descricao: "Fim de Semana de Lazer" },
            { id: 5, nome: "Cinema", descricao: "Ferias" },
            { id: 6, nome: "Jogos", descricao: "Diversão" },
        ];

        return { categories }
    }

}