import { User } from 'src/app/pages/user/shared/user.model';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Category extends BaseResourceModel {

    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
       
    ) {
        super(); // sempre que se extent uma class teve declarar o super();
    }

      /* Instanciando um jsonData de Category*/
      static fromJson(jsonData: any): Category {
        return Object.assign(new Category(), jsonData);
    }


}