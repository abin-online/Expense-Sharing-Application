import { GroupUseCase } from '../../../application/use-cases/Group/GroupUseCase';
import { GroupRepository } from '../../../infrastructure/repositories/GroupRepository';
import { GroupController } from '../../controller/GroupController';


const groupRepo = new GroupRepository();
const groupUseCase = new GroupUseCase(groupRepo);
export const groupController = new GroupController(groupUseCase);

