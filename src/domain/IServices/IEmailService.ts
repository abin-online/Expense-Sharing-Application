export interface IEmailService {

    sendGroupInvite(email: string, inviteToken: string, groupName: string): Promise<boolean> 
}