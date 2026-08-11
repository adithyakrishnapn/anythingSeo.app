import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { createTask } from '@/services/task.service';
import { currentUser } from '@/services/auth.service';
import { getProjectsByClientId } from '@/services/project.service';
import { toast } from 'sonner';
import { X } from 'lucide-react';

function QuickTaskModal({ isOpen, onClose, client, recommendation }) {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    relatedModel: 'Client',
    relatedTo: '',
    assignedTo: '',
    status: 'Pending',
    priority: 'High',
    dueDate: '',
    estimatedHours: 1,
  });

  useEffect(() => {
    if (client) {
      const clientId = client._id || client.id;
      getProjectsByClientId(clientId)
        .then((res) => {
          if (res && res.data) {
            setProjects(res.data);
          }
        })
        .catch((err) => console.error('Error fetching client projects:', err));
    }
  }, [client]);

  useEffect(() => {
    if (client && recommendation) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 2);
      const formattedDate = tomorrow.toISOString().split('T')[0];

      setFormData((prev) => ({
        ...prev,
        title: recommendation,
        description: `Action recommended by Client AI Agent for ${client.name} (${client.company || ''})`,
        relatedModel: 'Client',
        relatedTo: client._id || client.id || '',
        dueDate: formattedDate,
      }));
      setSelectedProjectId('');

      // Fetch currently logged in user to default assignee
      currentUser()
        .then((res) => {
          if (res && res.data) {
            setFormData((prev) => ({
              ...prev,
              assignedTo: res.data._id || '',
            }));
          }
        })
        .catch((err) => console.error('Error fetching current user:', err));
    }
  }, [client, recommendation]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProjectChange = (e) => {
    const projId = e.target.value;
    setSelectedProjectId(projId);
    if (projId) {
      setFormData((prev) => ({
        ...prev,
        relatedModel: 'Project',
        relatedTo: projId,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        relatedModel: 'Client',
        relatedTo: client._id || client.id || '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createTask(formData);
      toast.success('Task created successfully');
      onClose();
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        'Error creating task'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6 text-foreground shadow-2xl animate-in fade-in-50 zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close popup"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="space-y-2 mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            AI Client Recommendation
          </p>
          <h2 className="text-xl font-bold tracking-tight">
            Create Action Task
          </h2>
          <p className="text-xs text-muted-foreground">
            Verify and customize the task details below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground uppercase">Task Title</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground uppercase">Description</label>
            <textarea
              name="description"
              required
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground uppercase">Associate with Project</label>
            <select
              name="projectId"
              value={selectedProjectId}
              onChange={handleProjectChange}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">None (Client Level Task)</option>
              {projects.map((proj) => (
                <option key={proj._id} value={proj._id}>
                  {proj.ProjectName}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase">Due Date</label>
              <input
                type="date"
                name="dueDate"
                required
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary text-primary-foreground hover:opacity-90"
            >
              {loading ? 'Creating...' : 'Create Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuickTaskModal;
