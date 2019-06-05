import { Category } from './../../categories/shared/category.model';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Entry extends BaseResourceModel {

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

    ) {
        super();
    }

    //Tipo de Despesas. para setar os valores dinamicamente no Select do formulario
    static types = {
        expense: 'Despesa',
        revenue: 'Receita',
    }

    // Metodo, que passa os valores, pago ou pendente.
    get paidText(): string {
        return this.paid ? 'Pago' : 'Pendente';
    }
}
