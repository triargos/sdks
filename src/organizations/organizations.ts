import { Dashboard } from '../dashboard';
import {
  allOrganizationsSchema,
  organizationsSchema,
} from './organizations.schema';
import { Members } from './members/members';
import { Groups } from './groups/groups';

export class Organizations {
  private readonly dashboard: Dashboard;
  readonly members: Members;
  readonly groups: Groups;

  constructor(dashboard: Dashboard) {
    this.dashboard = dashboard;
    this.members = new Members(dashboard);
    this.groups = new Groups(dashboard);
  }

  /**
   * Find all available organizations
   */
  async findAll() {
    return this.dashboard
      .get('/organizations')
      .then((res) => allOrganizationsSchema.parse(res));
  }

  /**
   * Find an organization by id
   * @param id - the ID of the organization
   */
  async findById(id: string) {
    return this.dashboard
      .get(`/organizations/${id}`)
      .then((res) => organizationsSchema.parse(res));
  }
}
