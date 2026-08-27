import Panel from '../../components/Panel.jsx'
import { adminUsers } from '../../data/sampleData.js'

export default function Users() {
  return (
    <div className="page-grid">
      <Panel title="Platform Users" subtitle={`${adminUsers.length} accounts`}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <span className={`tag ${u.status === 'active' ? 'tag-success' : 'tag-neutral'}`}>
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  )
}
