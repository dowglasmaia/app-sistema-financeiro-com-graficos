import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Entry } from '../../entries/shared/entry.model';
import { Category } from '../../categories/shared/category.model';

export class User extends BaseResourceModel {

    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public senha?: string,
        public perfis?: number[],
        public entries?: Entry[],
        public categories?: Category[],        

    ) {
        super();
    }

    
    /* Instanciando um jsonData de Entry*/
    static fromJson(jsonData: any): User {
        return Object.assign(new User(), jsonData);
    }
}
