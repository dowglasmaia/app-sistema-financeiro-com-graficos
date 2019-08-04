import { User } from 'src/app/pages/user/shared/user.model';
/* Todas as Class devem erdar esta*/
export abstract class BaseResourceModel {
    id?: number;
    usuario?: User;
}
