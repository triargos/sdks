import { Dashboard } from '../../dashboard';
import { allMembersSchema, membersSchema } from './members.schema';

export class Members {
  private readonly dashboard: Dashboard;

  constructor(dashboard: Dashboard) {
    this.dashboard = dashboard;
  }

  /**
   * Find all members of an organization
   * @param organizationId - The ID of the organization
   */
  async findAll(organizationId: string) {
    return this.dashboard
      .get(`/organizations/${organizationId}/members`)
      .then((res) => allMembersSchema.parse(res));
  }

  /**
   * Find a member of an organization by ID
   * @param organizationId - The ID of the organization
   * @param memberId - The ID of the member
   */
  async findById(organizationId: string, memberId: number) {
    return this.dashboard
      .get(`/organizations/${organizationId}/members/${memberId}`)
      .then((res) => membersSchema.parse(res));
  }
}
