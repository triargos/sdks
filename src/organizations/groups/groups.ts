import { Dashboard } from '../../dashboard';
import { allGroupsSchema, groupsSchema } from './groups.schema';

export class Groups {
  private readonly dashboard: Dashboard;

  constructor(dashboard: Dashboard) {
    this.dashboard = dashboard;
  }

  /**
   * Find all groups of an organization
   * @param organizationId - The ID of the organization
   */
  async findAll(organizationId: string) {
    return this.dashboard
      .get(`/organizations/${organizationId}/groups`)
      .then((res) => allGroupsSchema.parse(res));
  }

  /**
   * Find a group of an organization by ID
   * @param organizationId - The ID of the organization
   * @param groupId - The ID of the group
   */
  async findById(organizationId: string, groupId: number) {
    return this.dashboard
      .get(`/organizations/${organizationId}/groups/${groupId}`)
      .then((res) => groupsSchema.parse(res));
  }
}
