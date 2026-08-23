import "./styles/Hospital.css"
import { useNavigate } from "react-router-dom"
import { useState, type ComponentType } from "react"
import {
  Activity,
  Bell,
  Brain,
  ChevronRight,
  Clock3,
  Database,
  Gauge,
  HeartPulse,
  History,
  Home,
  LogOut,
  Menu,
  Network,
  Settings,
  ShieldCheck,
  Upload,
  UserRound,
  X,
  type LucideProps,
} from "lucide-react"
import { Button } from "../lib/shadcn/button"
import { Card, CardContent, CardHeader, CardTitle } from "../lib/shadcn/card"
import { Progress } from "../lib/shadcn/progress"
import { Slider } from "../lib/shadcn/slider"
import { Switch } from "../lib/shadcn/switch"
import { cn } from "../lib/shadcn/utils"

type Page = "dashboard" | "training" | "updates" | "model" | "history" | "profile" | "settings"
type Tone = "default" | "warning" | "success" | "info"
type Icon = ComponentType<LucideProps>

const activity: Array<{ title: string; time: string; icon: Icon; tone: Tone }> = [
  { title: "Global model received", time: "Round 11 • 2 min ago", icon: ShieldCheck, tone: "success" },
  { title: "Model update prepared", time: "Round 12 • 4 min ago", icon: Upload, tone: "info" },
  { title: "Local training started", time: "Round 12 • 8 min ago", icon: Activity, tone: "warning" },
  { title: "Privacy check completed", time: "Round 12 • 10 min ago", icon: ShieldCheck, tone: "success" },
]

const pageTitles: Record<Page, string> = {
  dashboard: "Hospital Dashboard", training: "Local Training", updates: "Model Update", model: "Global Model",
  history: "History", profile: "Profile", settings: "Settings",
}

const toneClasses: Record<Tone, string> = {
  default: "bg-primary/10 text-primary", warning: "bg-warning/15 text-warning", success: "bg-success/15 text-success", info: "bg-muted text-foreground",
}

function Panel({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return <Card className={cn("shadow-retool-sm", className)}>{title ? <CardHeader className="pb-2"><CardTitle className="text-sm">{title}</CardTitle></CardHeader> : null}<CardContent>{children}</CardContent></Card>
}

function Sidebar({ page, setPage, open, setOpen, onLogout }: { page: Page; setPage: (page: Page) => void; open: boolean; setOpen: (open: boolean) => void; onLogout: () => void }) {
  const items: Array<{ id: Page; label: string; icon: Icon }> = [
    { id: "dashboard", label: "Dashboard", icon: Home }, { id: "training", label: "Local Training", icon: Activity },
    { id: "updates", label: "Model Update", icon: Upload }, { id: "model", label: "Global Model", icon: Brain },
    { id: "history", label: "History", icon: History }, { id: "profile", label: "Profile", icon: UserRound }, { id: "settings", label: "Settings", icon: Settings },
  ]
  return <aside className={cn("fixed inset-y-0 left-0 z-40 flex w-60 -translate-x-full flex-col border-r border-border bg-card p-4 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0", open && "translate-x-0 shadow-retool-lg")}>
    <div className="mb-8 flex items-center gap-3 px-2"><div className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground"><HeartPulse className="size-5" /></div><div className="min-w-0"><p className="text-sm font-bold">Heart Disease</p><p className="text-xs text-muted-foreground">FL System</p></div><Button aria-label="Close navigation" variant="ghost" size="icon" className="ml-auto lg:hidden" onClick={() => setOpen(false)}><X /></Button></div>
    <nav className="grid gap-1">{items.map(({ id, label, icon: IconComponent }) => <Button key={id} variant={page === id ? "secondary" : "ghost"} className="justify-start" onClick={() => { setPage(id); setOpen(false) }}><IconComponent />{label}</Button>)}</nav>
    <Button variant="ghost" className="mt-auto justify-start text-muted-foreground hover:text-foreground" onClick={onLogout}><LogOut />Logout</Button>
  </aside>
}

function Header({ page, setOpen }: { page: Page; setOpen: (open: boolean) => void }) {
  return <header className="flex min-h-20 items-center justify-between border-b border-border bg-card px-4 sm:px-7"><div className="flex items-center gap-3"><Button aria-label="Open navigation" variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)}><Menu /></Button><div><p className="text-[10px] font-semibold tracking-widest text-muted-foreground">HOSPITAL CLIENT PORTAL</p><h1 className="mt-1 text-xl font-semibold">{pageTitles[page]}</h1><p className="mt-1 text-xs text-muted-foreground">Hospital ID: HOSP-001 • Connected</p></div></div><div className="flex items-center gap-3"><Button aria-label="View notifications" variant="ghost" size="icon" onClick={() => window.alert("No new notifications")}><Bell /></Button><div className="grid size-9 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">HS</div><div className="hidden sm:block"><p className="text-sm font-semibold">Dr. Smith</p><p className="text-xs text-muted-foreground">Hospital Admin</p></div></div></header>
}

function Intro({ title, subtitle, action, onAction }: { title: string; subtitle: string; action?: string; onAction?: () => void }) {
  return <div className="mb-5 flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-2xl font-semibold">{title}</h2><p className="mt-1 text-sm text-muted-foreground">{subtitle}</p></div>{action && onAction ? <Button onClick={onAction}>{action}</Button> : null}</div>
}

function Metric({ icon: IconComponent, label, value, note, tone = "default", onClick }: { icon: Icon; label: string; value: string; note: string; tone?: Tone; onClick?: () => void }) {
  const content = <><span className={cn("grid size-11 shrink-0 place-items-center rounded-full", toneClasses[tone])}><IconComponent className="size-5" /></span><span className="min-w-0 text-left"><span className="block text-xs text-muted-foreground">{label}</span><strong className="my-1 block text-lg leading-none">{value}</strong><span className="block text-xs text-muted-foreground">{note}</span></span><ChevronRight className="ml-auto size-4 text-muted-foreground" /></>
  return onClick ? <button type="button" onClick={onClick} className="flex min-h-24 w-full items-center gap-3 rounded-lg border border-border bg-card p-4 text-left shadow-retool-sm transition hover:bg-accent">{content}</button> : <div className="flex min-h-24 items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-retool-sm">{content}</div>
}

function Metrics({ children }: { children: React.ReactNode }) { return <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{children}</div> }

function ProgressDisplay({ value, label = "Local training progress" }: { value: number; label?: string }) { return <div className="space-y-2"><div className="flex justify-between text-sm"><span className="font-medium">{label}</span><span className="font-semibold">{value}%</span></div><Progress value={value} /></div> }

function Information({ rows }: { rows: Array<[string, string]> }) { return <dl className="divide-y divide-border">{rows.map(([label, value]) => <div key={label} className="flex justify-between gap-4 py-3 text-sm"><dt className="text-muted-foreground">{label}</dt><dd className="text-right font-medium">{value}</dd></div>)}</dl> }

function SecureNotice({ children }: { children: React.ReactNode }) { return <div className="flex gap-3 rounded-lg bg-success/10 p-4 text-sm"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-success" /><div>{children}</div></div> }

function Workflow() { const steps: Array<{ name: string; status: string; icon: Icon; tone: Tone }> = [{ name: "Local Training", status: "Training", icon: Activity, tone: "warning" }, { name: "Model Update", status: "Ready", icon: Upload, tone: "info" }, { name: "FedAvg", status: "Waiting", icon: Network, tone: "default" }, { name: "Global Model", status: "Received", icon: Brain, tone: "success" }]; return <div className="flex min-w-max items-start justify-between gap-3 py-5">{steps.map(({ name, status, icon: IconComponent, tone }, index) => <div key={name} className="flex items-center gap-3"><div className="w-24 text-center"><span className={cn("mx-auto grid size-10 place-items-center rounded-full", toneClasses[tone])}><IconComponent className="size-5" /></span><p className="mt-2 text-xs font-semibold">{name}</p><p className="mt-1 text-[11px] text-muted-foreground">{status}</p></div>{index < steps.length - 1 ? <ChevronRight className="mt-3 size-4 text-muted-foreground" /> : null}</div>)}</div> }

function Dashboard({ setPage }: { setPage: (page: Page) => void }) { return <><Intro title="Hospital Dashboard" subtitle="Privacy-preserving federated learning client overview." /><Metrics><Metric icon={Network} label="Current FL Round" value="12" note="In progress" onClick={() => setPage("training")} /><Metric icon={Activity} label="Local Training" value="65%" note="Training in progress" tone="warning" onClick={() => setPage("training")} /><Metric icon={Upload} label="Model Update" value="Ready" note="Waiting for aggregation" tone="info" onClick={() => setPage("updates")} /><Metric icon={Brain} label="Global Model" value="Received" note="Version v2.1.0" tone="success" onClick={() => setPage("model")} /></Metrics><Panel title="Federated Learning Workflow"><div className="overflow-x-auto"><Workflow /></div><ProgressDisplay value={65} /></Panel><div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]"><Panel title="Training Progress"><ProgressDisplay value={65} /><div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"><Clock3 className="size-4" />Estimated time remaining <strong className="text-foreground">00:15:30</strong></div><div className="mt-5 flex flex-wrap gap-2 text-xs"><span className="flex items-center gap-1 rounded-md bg-muted px-3 py-2"><Database className="size-3.5" />2,450 records</span><span className="flex items-center gap-1 rounded-md bg-muted px-3 py-2"><Network className="size-3.5" />Round 12</span></div></Panel><Panel title="System Information"><Information rows={[["Hospital ID", "HOSP-001"], ["Hospital", "City Heart Hospital"], ["Model Version", "v2.1.0"], ["Last Update", "2 min ago"], ["Connection", "Secure"]]} /></Panel></div><Panel title="Recent Activity"><div className="grid gap-2">{activity.map(({ title, time, icon: IconComponent, tone }) => <div key={title} className="flex items-center gap-3 rounded-lg bg-muted/60 p-3"><span className={cn("grid size-8 place-items-center rounded-full", toneClasses[tone])}><IconComponent className="size-4" /></span><div><p className="text-sm font-medium">{title}</p><p className="text-xs text-muted-foreground">{time}</p></div></div>)}</div></Panel><SecureNotice><p className="font-semibold text-success">Patient data stays here</p><p className="mt-1 text-xs text-muted-foreground">Raw patient data never leaves this hospital. Only model updates participate in federated aggregation.</p></SecureNotice></> }

function Training() { const [running, setRunning] = useState(true); const [value, setValue] = useState(65); return <><Intro title="Local Training" subtitle="Train the local model using data stored at HOSP-001." action={running ? "Pause Training" : "Start Training"} onAction={() => setRunning((current) => !current)} /><Metrics><Metric icon={Activity} label="Training Status" value={running ? "Running" : "Paused"} note={running ? `${value}% complete` : "Resume when ready"} tone="warning" /><Metric icon={Database} label="Local Records" value="2,450" note="Stored locally" tone="info" /><Metric icon={Network} label="FL Round" value="12" note="Current round" /><Metric icon={ShieldCheck} label="Privacy" value="Protected" note="Raw data stays local" tone="success" /></Metrics><Panel title="Training Progress"><ProgressDisplay value={value} /><Slider className="mt-6" aria-label="Training progress demo control" min={0} max={100} step={1} value={[value]} onValueChange={(nextValue) => { const next = nextValue[0]; if (next !== undefined) setValue(next) }} /><div className="mt-6 flex items-start gap-3 rounded-lg bg-primary/5 p-4"><Activity className="mt-0.5 size-5 text-primary" /><div><p className="text-sm font-semibold">{running ? "Local model is training" : "Training is paused"}</p><p className="mt-1 text-xs text-muted-foreground">{running ? "The hospital is training without sending patient records." : "Press Start Training to continue the demo."}</p></div></div></Panel><Panel title="Federated Privacy"><SecureNotice><p className="font-semibold text-success">Protected local dataset</p><p className="mt-1 text-xs text-muted-foreground">Only learned model parameters will be prepared for the next aggregation step.</p></SecureNotice></Panel></> }

function Updates() { const [sent, setSent] = useState(false); return <><Intro title="Model Update" subtitle="Prepare and send the local model update for FedAvg aggregation." /><Card className="mb-4 shadow-retool-sm"><CardContent className="flex flex-wrap items-center gap-4 p-5"><span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary"><Upload /></span><div><h3 className="font-semibold">{sent ? "Update Sent" : "Update Ready"}</h3><p className="mt-1 text-sm text-muted-foreground">{sent ? "The demo model update has been marked as submitted for Round 12." : "Your local model has completed its current preparation step."}</p></div><span className={cn("ml-auto rounded-full px-3 py-1 text-xs font-semibold", sent ? "bg-success/15 text-success" : "bg-warning/15 text-warning")}>{sent ? "Submitted" : "Ready"}</span></CardContent></Card><div className="grid gap-4 lg:grid-cols-2"><Panel title="Update Details"><Information rows={[["Hospital ID", "HOSP-001"], ["FL Round", "12"], ["Model Version", "v2.1.0"], ["Update Size", "2.8 MB"], ["Patient records shared", "0"]]} /><Button className="mt-4 w-full" onClick={() => setSent(true)} disabled={sent}>{sent ? "Update Submitted" : "Submit Model Update"}</Button></Panel><Panel title="Next Step"><div className="grid place-items-center px-5 py-12 text-center"><Network className="size-10 text-primary" /><p className="mt-4 text-sm font-semibold">FedAvg Aggregation</p><p className="mt-2 text-xs leading-relaxed text-muted-foreground">After participating clients submit their updates, the server can aggregate model parameters.</p></div></Panel></div></> }

function Model() { return <><Intro title="Global Model" subtitle="View the global model received by this hospital." /><Card className="mb-4 shadow-retool-sm"><CardContent className="flex items-center gap-4 p-5"><span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary"><Brain /></span><div><p className="text-[11px] font-medium tracking-widest text-muted-foreground">GLOBAL MODEL</p><h3 className="mt-1 text-xl font-semibold">v2.1.0</h3><p className="mt-1 text-xs text-muted-foreground">Round 12 • Received 2 minutes ago</p></div><span className="ml-auto rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">Received</span></CardContent></Card><Metrics><Metric icon={Gauge} label="Accuracy" value="92.4%" note="Global evaluation" /><Metric icon={Activity} label="Precision" value="90.8%" note="Global evaluation" tone="info" /><Metric icon={HeartPulse} label="Recall" value="91.6%" note="Global evaluation" tone="success" /><Metric icon={Brain} label="F1-Score" value="90.2%" note="Global evaluation" /></Metrics><Panel title="Model Information"><Information rows={[["Model version", "v2.1.0"], ["Federated round", "12"], ["Aggregation", "FedAvg"], ["Status", "Received"], ["Deployment", "Available locally"]]} /></Panel></> }

function HistoryPage() { const rows = [["Round 12", "Local Training", "65%", "Today"], ["Round 12", "Model Update", "Ready", "Today"], ["Round 11", "Global Model", "Received", "Yesterday"], ["Round 11", "Aggregation", "Completed", "Yesterday"]]; return <><Intro title="History" subtitle="Recent federated learning activity for HOSP-001." /><Panel title="Federated Learning History"><div className="overflow-x-auto"><div className="min-w-[500px] divide-y divide-border">{rows.map(([round, activityName, status, day]) => <div key={`${round}-${activityName}`} className="grid grid-cols-[1fr_1.5fr_1fr_.8fr] gap-3 py-3 text-sm"><strong>{round}</strong><span>{activityName}</span><span className="text-success">{status}</span><span className="text-muted-foreground">{day}</span></div>)}</div></div></Panel></> }

function Profile() { return <><Intro title="Hospital Profile" subtitle="Hospital account and connection information." /><Panel title="Hospital Details"><Information rows={[["Hospital ID", "HOSP-001"], ["Hospital Name", "City Heart Hospital"], ["Administrator", "Dr. Smith"], ["Role", "Hospital Admin"], ["Connection", "Secure"], ["FL Participation", "Active"]]} /></Panel></> }

function SettingsPage() { const [notifications, setNotifications] = useState(true); const [autoRefresh, setAutoRefresh] = useState(true); return <><Intro title="Settings" subtitle="Configure hospital portal preferences." /><Panel title="Preferences"><div className="divide-y divide-border"><div className="flex items-center justify-between gap-4 py-4"><div><p className="text-sm font-medium">Notifications</p><p className="mt-1 text-xs text-muted-foreground">Receive training and model update alerts.</p></div><Switch checked={notifications} onCheckedChange={setNotifications} aria-label="Toggle notifications" /></div><div className="flex items-center justify-between gap-4 py-4"><div><p className="text-sm font-medium">Auto refresh</p><p className="mt-1 text-xs text-muted-foreground">Refresh federated learning status automatically.</p></div><Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} aria-label="Toggle auto refresh" /></div></div><Button className="mt-5" onClick={() => window.alert("Settings saved")}>Save Settings</Button></Panel></> }

export default function HospitalDashboard() { const navigate = useNavigate(); const [page, setPage] = useState<Page>("dashboard"); const [open, setOpen] = useState(false); const content: Record<Page, React.ReactNode> = { dashboard: <Dashboard setPage={setPage} />, training: <Training />, updates: <Updates />, model: <Model />, history: <HistoryPage />, profile: <Profile />, settings: <SettingsPage /> }; return <div className="min-h-screen bg-background text-foreground lg:flex"><Sidebar page={page} setPage={setPage} open={open} setOpen={setOpen} onLogout={() => navigate('/')} /><main className="min-w-0 flex-1"><Header page={page} setOpen={setOpen} /><section className="mx-auto max-w-[1700px] p-4 sm:p-6">{content[page]}</section></main></div> }
