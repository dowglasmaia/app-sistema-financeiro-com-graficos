import { Category } from './../../categories/shared/category.model';

export class Entry {

    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public type?: string,
        public amount?: string,
        public date?: string,
        public paid?: boolean,
        public categoryId?: number,
        public category?: Category,

    ) { }

    //Tipo de Despesas. para setar os valores dinamicamente no Select do formulario
    static types = {
        expense: 'Despesa',
        revenue: 'Receita',
<<<<<<< HEAD
        ///
=======
>>>>>>> adding-entries-modules
    }

     // Metodo, que passa os valores, pago ou pendente.
    get paidText() : string {
        return this.paid ? 'Pago' : 'Pendente';
    }
}
