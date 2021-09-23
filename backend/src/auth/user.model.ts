import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';


export interface UserModel extends Base { }
export class UserModel extends TimeStamps {
	@prop({ unique: true})
	email: string;

	@prop() 
	login: string;

	@prop()
	passwordHash: string;
	
	@prop()
	is_active: boolean;
	
}
