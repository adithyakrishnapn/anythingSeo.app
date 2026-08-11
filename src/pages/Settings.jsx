import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { 
  getSettings, 
  updateEmailConfig, 
  updateAiConfig, 
  deleteEmailConfig, 
  deleteAiConfig 
} from '@/services/settings.service';
import { toast } from 'sonner';
import { 
  Mail, 
  Key, 
  CheckCircle, 
  Eye, 
  EyeOff, 
  Trash2, 
  Loader2,
  Info
} from 'lucide-react';

function Settings() {
  const navigate = useNavigate();
  const { settingsConfigured, setSettingsConfigured } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [submittingEmail, setSubmittingEmail] = useState(false);
  const [submittingAi, setSubmittingAi] = useState(false);
  const [settingsData, setSettingsData] = useState({
    email: { configured: false, address: '' },
    ai: { groqConfigured: false }
  });

  const [emailForm, setEmailForm] = useState({ address: '', appPassword: '' });
  const [aiForm, setAiForm] = useState({ groqApiKey: '' });
  
  const [showAppPassword, setShowAppPassword] = useState(false);
  const [showGroqKey, setShowGroqKey] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await getSettings();
      if (res && res.success) {
        setSettingsData(res.data);
        setEmailForm(prev => ({ ...prev, address: res.data.email?.address || '' }));
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleEmailSave = async (e) => {
    e.preventDefault();
    setSubmittingEmail(true);
    try {
      const res = await updateEmailConfig(emailForm);
      if (res && res.success) {
        toast.success(res.message || 'Email settings saved');
        setEmailForm(prev => ({ ...prev, appPassword: '' })); // clear input password for security
        setSettingsConfigured(true);
        fetchSettings();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save email settings');
    } finally {
      setSubmittingEmail(false);
    }
  };

  const handleAiSave = async (e) => {
    e.preventDefault();
    setSubmittingAi(true);
    try {
      const res = await updateAiConfig(aiForm);
      if (res && res.success) {
        toast.success(res.message || 'AI settings saved');
        setAiForm({ groqApiKey: '' }); // clear input
        setSettingsConfigured(true);
        fetchSettings();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save AI settings');
    } finally {
      setSubmittingAi(false);
    }
  };

  const handleEmailClear = async () => {
    if (!window.confirm('Are you sure you want to clear your email configuration?')) return;
    try {
      const res = await deleteEmailConfig();
      if (res && res.success) {
        toast.success('Email settings cleared');
        setEmailForm({ address: '', appPassword: '' });
        fetchSettings();
      }
    } catch (err) {
      toast.error('Failed to clear email configuration');
    }
  };

  const handleAiClear = async () => {
    if (!window.confirm('Are you sure you want to clear your Groq AI key?')) return;
    try {
      const res = await deleteAiConfig();
      if (res && res.success) {
        toast.success('AI settings cleared');
        setAiForm({ groqApiKey: '' });
        fetchSettings();
      }
    } catch (err) {
      toast.error('Failed to clear AI configuration');
    }
  };

  if (loading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6 p-6">
      {!settingsConfigured && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Welcome to your workspace!</h2>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Let's configure your CRM before you get started. You can connect Gmail to let the **Follow-up Agent** automatically draft and send follow-ups, and Groq to let **AI Agents** automate leads, client health, and daily tasks.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/dashboard/main')}
              className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted cursor-pointer"
            >
              Skip for Now
            </button>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-3xl font-bold text-foreground">SaaS Tenant Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure your personal credentials for automated CRM operations. If empty, the system defaults to global presets.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-blue-500/5 p-4 flex gap-3 text-sm text-blue-700 dark:text-blue-300">
        <Info className="h-5 w-5 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Security Note</p>
          <p className="mt-0.5">
            Your secrets are stored securely using industry-standard **AES-256-GCM** encryption. 
            Once saved, credentials can never be retrieved or read back by the browser or API clients.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* EMAIL SETTINGS */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Gmail Setup</h2>
            </div>
            {settingsData.email?.configured && (
              <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                <CheckCircle className="h-3 w-3" /> Configured
              </span>
            )}
          </div>

          <form onSubmit={handleEmailSave} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase">Gmail Address</label>
              <input
                type="email"
                required
                value={emailForm.address}
                onChange={(e) => setEmailForm({ ...emailForm, address: e.target.value })}
                placeholder="yourname@gmail.com"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase">
                {settingsData.email?.configured ? 'Change App Password' : 'Gmail App Password'}
              </label>
              <div className="relative">
                <input
                  type={showAppPassword ? 'text' : 'password'}
                  placeholder={settingsData.email?.configured ? '••••••••••••••••' : 'Enter 16-character app password'}
                  value={emailForm.appPassword}
                  onChange={(e) => setEmailForm({ ...emailForm, appPassword: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowAppPassword(!showAppPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  {showAppPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">
                Generate an App Password inside your Google Account Security portal. Traditional email logins will fail due to 2FA restrictions.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={submittingEmail}
                className="flex-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1"
              >
                {submittingEmail && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Save Connection
              </button>
              {settingsData.email?.configured && (
                <button
                  type="button"
                  onClick={handleEmailClear}
                  className="rounded-lg border border-rose-500/20 bg-rose-500/5 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-500/10 cursor-pointer"
                  title="Clear email settings"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* AI SETTINGS */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Groq AI API Setup</h2>
            </div>
            {settingsData.ai?.groqConfigured && (
              <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                <CheckCircle className="h-3 w-3" /> Configured
              </span>
            )}
          </div>

          <form onSubmit={handleAiSave} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase">
                {settingsData.ai?.groqConfigured ? 'Change Groq API Key' : 'Groq API Key'}
              </label>
              <div className="relative">
                <input
                  type={showGroqKey ? 'text' : 'password'}
                  placeholder={settingsData.ai?.groqConfigured ? '••••••••••••••••••••••••' : 'gsk_...'}
                  value={aiForm.groqApiKey}
                  onChange={(e) => setAiForm({ groqApiKey: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowGroqKey(!showGroqKey)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  {showGroqKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">
                Connect your individual Groq Cloud console key to use personal rate limits and customize agent models.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={submittingAi}
                className="flex-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1"
              >
                {submittingAi && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Save API Key
              </button>
              {settingsData.ai?.groqConfigured && (
                <button
                  type="button"
                  onClick={handleAiClear}
                  className="rounded-lg border border-rose-500/20 bg-rose-500/5 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-500/10 cursor-pointer"
                  title="Clear API Key"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;