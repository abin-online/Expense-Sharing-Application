import { GroupUseCase } from '../../../application/use-cases/Group/GroupUseCase';
import { GroupRepository } from '../../../infrastructure/repositories/GroupRepository';
import { GroupController } from '../../controller/GroupController';

import { EmailService } from "../../../infrastructure/services/EmailService";

const groupRepo = new GroupRepository();
const groupUseCase = new GroupUseCase(groupRepo);
const emailService = new EmailService();

export const groupController = new GroupController( emailService, groupUseCase);

