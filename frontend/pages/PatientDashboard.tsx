import './styles/User.css'
import { useNavigate } from 'react-router-dom'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import {
  Activity,
  AlertCircle,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardPlus,
  HeartPulse,
  History,
  Home,
  Info,
  LockKeyhole,
  LogOut,
  Menu,
  Network,
  Settings,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { Badge } from '../lib/shadcn/badge'
import { Button } from '../lib/shadcn/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../lib/shadcn/card'
import { Input } from '../lib/shadcn/input'
import { Label } from '../lib/shadcn/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../lib/shadcn/select'
import { Sheet, SheetContent } from '../lib/shadcn/sheet'
import { Switch } from '../lib/shadcn/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../lib/shadcn/table'

type Page = 'dashboard' | 'prediction' | 'history' | 'about' | 'profile' | 'settings'
type FormData = Record<'age' | 'sex' | 'cp' | 'trestbps' | 'chol' | 'fbs' | 'restecg' | 'thalach' | 'exang' | 'oldpeak' | 'slope' | 'ca' | 'thal', string>
type Result = 'Detected' | 'Not Detected' | null

type NavigationProps = {
  page: Page
  onPageChange: (page: Page) => void
  onLogout: () => void
}

const navigationItems: Array<{ id: Page; label: string; icon: typeof Home }> = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'prediction', label: 'Prediction', icon: ClipboardPlus },
  { id: 'history', label: 'My History', icon: History },
  { id: 'about', label: 'About Project', icon: Info },
  { id: 'profile', label: 'Profile', icon: UserRound },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const initialForm: FormData = {
  age: '', sex: '', cp: '', trestbps: '', chol: '', fbs: '', restecg: '',
  thalach: '', exang: '', oldpeak: '', slope: '', ca: '', thal: '',
}

function Navigation({ page, onPageChange, onLogout }: NavigationProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b p-5">
        <div className="rounded-lg bg-primary p-2 text-primary-foreground"><HeartPulse className="h-5 w-5" /></div>
        <div><p className="font-semibold leading-tight">Heart Disease</p><p className="text-xs text-muted-foreground">FL System</p></div>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Patient portal navigation">
        {navigationItems.map(({ id, label, icon: Icon }) => (
          <Button key={id} variant={page === id ? 'secondary' : 'ghost'} className="justify-start gap-3" onClick={() => onPageChange(id)}>
            <Icon className="h-4 w-4" />{label}
          </Button>
        ))}
      </nav>
      <div className="border-t p-3"><Button variant="ghost" className="w-full justify-start gap-3" onClick={onLogout}><LogOut className="h-4 w-4" />Log out</Button></div>
    </div>
  )
}

function PageIntro({ title, description, action, onAction }: { title: string; description: string; action?: string; onAction?: () => void }) {
  return <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-xs font-medium tracking-wider text-muted-foreground">PATIENT PORTAL</p><h1 className="mt-1 text-2xl font-bold tracking-tight">{title}</h1><p className="mt-1 text-sm text-muted-foreground">{description}</p></div>{action && onAction ? <Button onClick={onAction}>{action}<ChevronRight className="ml-1 h-4 w-4" /></Button> : null}</div>
}

function PrivacyCard() {
  return <Card className="border-success/30 bg-success/10"><CardContent className="flex gap-3 p-4"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" /><div><p className="font-medium">Your privacy is protected</p><p className="mt-1 text-sm text-muted-foreground">Your health information stays protected. The federated learning model makes predictions without sharing raw patient data with other hospitals.</p></div></CardContent></Card>
}

function StatCard({ icon: Icon, label, value, note, onClick }: { icon: typeof Activity; label: string; value: string; note: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="rounded-lg border bg-card p-4 text-left shadow-retool-sm transition-colors hover:bg-accent"><div className="flex items-start justify-between"><span className="rounded-md bg-muted p-2"><Icon className="h-5 w-5 text-foreground" /></span><ChevronRight className="h-4 w-4 text-muted-foreground" /></div><p className="mt-4 text-sm text-muted-foreground">{label}</p><p className="mt-1 text-lg font-semibold">{value}</p><p className="mt-1 text-xs text-muted-foreground">{note}</p></button>
}

function Dashboard({ onPageChange }: { onPageChange: (page: Page) => void }) {
  return <div className="space-y-6"><PageIntro title="Patient Dashboard" description="Welcome back, John. Manage your heart health prediction securely." />
    <Card className="bg-secondary"><CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"><div className="rounded-full bg-background p-3"><HeartPulse className="h-7 w-7" /></div><div className="flex-1"><p className="font-semibold">Ready for a prediction?</p><p className="mt-1 text-sm text-muted-foreground">Enter your health information to receive a heart disease risk prediction.</p></div><Button onClick={() => onPageChange('prediction')}>Start prediction<ChevronRight className="ml-1 h-4 w-4" /></Button></CardContent></Card>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard icon={Activity} label="Last Prediction" value="Not Detected" note="12 Aug 2026" onClick={() => onPageChange('history')} /><StatCard icon={History} label="Predictions Made" value="3" note="View history" onClick={() => onPageChange('history')} /><StatCard icon={ShieldCheck} label="Privacy Status" value="Protected" note="Federated Learning" onClick={() => onPageChange('about')} /><StatCard icon={CalendarDays} label="Profile Status" value="Complete" note="View profile" onClick={() => onPageChange('profile')} /></div>
    <div className="grid gap-4 lg:grid-cols-2"><Card><CardHeader><CardTitle>Latest prediction</CardTitle><CardDescription>Your most recent result</CardDescription></CardHeader><CardContent className="flex items-center gap-3"><CheckCircle2 className="h-9 w-9 text-success" /><div><p className="font-medium">Heart Disease: Not Detected</p><p className="text-sm text-muted-foreground">Prediction completed on 12 Aug 2026</p></div></CardContent></Card><Card><CardHeader><CardTitle>How it works</CardTitle><CardDescription>Privacy-preserving AI</CardDescription></CardHeader><CardContent className="grid grid-cols-3 gap-2 text-center">{[['1', 'Enter data', 'Health information'], ['2', 'Secure prediction', 'Protected processing'], ['3', 'Get result', 'Instant feedback']].map(([number, title, detail]) => <div key={number}><span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{number}</span><p className="mt-2 text-sm font-medium">{title}</p><p className="text-xs text-muted-foreground">{detail}</p></div>)}</CardContent></Card></div><PrivacyCard />
  </div>
}

function TextField({ label, name, value, placeholder, onChange }: { label: string; name: keyof FormData; value: string; placeholder: string; onChange: (event: ChangeEvent<HTMLInputElement>) => void }) {
  return <div className="space-y-2"><Label htmlFor={name}>{label}</Label><Input id={name} name={name} type="number" value={value} placeholder={placeholder} onChange={onChange} /></div>
}

function SelectField({ label, name, value, options, onChange }: { label: string; name: keyof FormData; value: string; options: string[]; onChange: (value: string) => void }) {
  return <div className="space-y-2"><Label htmlFor={name}>{label}</Label><Select value={value} onValueChange={onChange}><SelectTrigger id={name}><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{options.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></div>
}

function Prediction() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [result, setResult] = useState<Result>(null)
  const updateText = (event: ChangeEvent<HTMLInputElement>) => { const key = event.target.name as keyof FormData; setForm((current) => ({ ...current, [key]: event.target.value })) }
  const updateSelect = (key: keyof FormData, value: string) => setForm((current) => ({ ...current, [key]: value }))
  const predict = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const risk = Number(form.age) >= 60 || Number(form.trestbps) >= 150 || Number(form.chol) >= 240 || (Number(form.thalach) > 0 && Number(form.thalach) < 100); setResult(risk ? 'Detected' : 'Not Detected') }
  return <div className="space-y-6"><PageIntro title="Heart Disease Prediction" description="Enter your health information. Your data remains protected." />
    <form onSubmit={predict}><Card><CardHeader><div className="flex gap-3"><HeartPulse className="mt-0.5 h-5 w-5" /><div><CardTitle>Patient information</CardTitle><CardDescription>Enter the required health features for the prediction model.</CardDescription></div></div></CardHeader><CardContent className="space-y-6"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"><TextField label="Age" name="age" value={form.age} placeholder="e.g. 52" onChange={updateText} /><SelectField label="Sex" name="sex" value={form.sex} options={['Male', 'Female']} onChange={(value) => updateSelect('sex', value)} /><SelectField label="Chest Pain Type" name="cp" value={form.cp} options={['Typical angina', 'Atypical angina', 'Non-anginal pain', 'Asymptomatic']} onChange={(value) => updateSelect('cp', value)} /><TextField label="Resting Blood Pressure" name="trestbps" value={form.trestbps} placeholder="mm Hg" onChange={updateText} /><TextField label="Cholesterol" name="chol" value={form.chol} placeholder="mg/dl" onChange={updateText} /><SelectField label="Fasting Blood Sugar" name="fbs" value={form.fbs} options={['Normal', 'High']} onChange={(value) => updateSelect('fbs', value)} /><SelectField label="Resting ECG" name="restecg" value={form.restecg} options={['Normal', 'ST-T abnormality', 'LV hypertrophy']} onChange={(value) => updateSelect('restecg', value)} /><TextField label="Maximum Heart Rate" name="thalach" value={form.thalach} placeholder="bpm" onChange={updateText} /><SelectField label="Exercise Induced Angina" name="exang" value={form.exang} options={['No', 'Yes']} onChange={(value) => updateSelect('exang', value)} /><TextField label="Oldpeak" name="oldpeak" value={form.oldpeak} placeholder="e.g. 1.4" onChange={updateText} /><SelectField label="Slope" name="slope" value={form.slope} options={['Upsloping', 'Flat', 'Downsloping']} onChange={(value) => updateSelect('slope', value)} /><SelectField label="Number of Major Vessels" name="ca" value={form.ca} options={['0', '1', '2', '3']} onChange={(value) => updateSelect('ca', value)} /><SelectField label="Thalassemia" name="thal" value={form.thal} options={['Normal', 'Fixed defect', 'Reversible defect']} onChange={(value) => updateSelect('thal', value)} /></div><div className="flex flex-col justify-between gap-3 border-t pt-5 sm:flex-row sm:items-center"><p className="flex items-center gap-2 text-sm text-muted-foreground"><LockKeyhole className="h-4 w-4" />Data is processed securely for this prediction.</p><Button type="submit">Predict Heart Disease<Activity className="ml-1 h-4 w-4" /></Button></div></CardContent></Card></form>
    {result ? <Card className={result === 'Detected' ? 'border-destructive/40 bg-destructive/10' : 'border-success/40 bg-success/10'}><CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"><div>{result === 'Detected' ? <AlertCircle className="h-10 w-10 text-destructive" /> : <CheckCircle2 className="h-10 w-10 text-success" />}</div><div className="flex-1"><p className="text-xs font-medium tracking-wider text-muted-foreground">PREDICTION RESULT</p><h2 className="mt-1 text-xl font-bold">Heart Disease: {result}</h2><p className="mt-1 text-sm text-muted-foreground">{result === 'Detected' ? 'The model indicates an elevated risk. Please consult a qualified healthcare professional.' : 'The model did not detect heart disease from the entered features. Continue regular health checkups.'}</p></div><Button variant="outline" onClick={() => setResult(null)}>New prediction</Button></CardContent></Card> : null}<PrivacyCard />
  </div>
}

function HistoryPage({ onPageChange, onNotice }: { onPageChange: (page: Page) => void; onNotice: (message: string) => void }) {
  const history = [['12 Aug 2026', 'Not Detected', '92.4%'], ['02 Aug 2026', 'Not Detected', '89.7%'], ['18 Jul 2026', 'Detected', '86.1%']] as const
  return <div className="space-y-6"><PageIntro title="My Prediction History" description="Your previous heart disease prediction results." action="New Prediction" onAction={() => onPageChange('prediction')} /><Card><CardHeader><CardTitle>Prediction history</CardTitle></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Result</TableHead><TableHead>Confidence</TableHead><TableHead>Status</TableHead><TableHead><span className="sr-only">Actions</span></TableHead></TableRow></TableHeader><TableBody>{history.map(([date, result, confidence]) => <TableRow key={date}><TableCell className="font-medium"><CalendarDays className="mr-2 inline h-4 w-4 text-muted-foreground" />{date}</TableCell><TableCell><Badge variant={result === 'Detected' ? 'destructive' : 'secondary'}>{result}</Badge></TableCell><TableCell>{confidence}</TableCell><TableCell className="text-muted-foreground">Completed</TableCell><TableCell><Button variant="ghost" size="sm" onClick={() => onNotice(`Prediction details for ${date} are a demo view.`)}>View</Button></TableCell></TableRow>)}</TableBody></Table></CardContent></Card></div>
}

function About() { return <div className="space-y-6"><PageIntro title="About Project" description="Learn how privacy-preserving federated learning protects patient data." /><Card className="bg-secondary"><CardContent className="flex gap-4 p-6"><HeartPulse className="h-9 w-9 shrink-0" /><div><h2 className="text-xl font-semibold">Federated Learning for Heart Disease Prediction</h2><p className="mt-2 text-sm text-muted-foreground">The system allows hospitals to collaboratively improve a global prediction model while keeping raw patient information inside each hospital.</p></div></CardContent></Card><div className="grid gap-4 md:grid-cols-3">{[[ShieldCheck, 'Privacy First', 'Raw patient records remain local to the hospital and are not shared with other clients.'], [Network, 'Collaborative Learning', 'Hospitals contribute model updates that can be aggregated into a stronger global model.'], [Activity, 'Heart Health AI', 'The interface collects heart-disease-related features and presents a prediction result.']].map(([Icon, title, description]) => { const FeatureIcon = Icon as typeof Activity; return <Card key={title as string}><CardContent className="p-5"><FeatureIcon className="h-6 w-6" /><h3 className="mt-4 font-semibold">{title as string}</h3><p className="mt-2 text-sm text-muted-foreground">{description as string}</p></CardContent></Card> })}</div></div> }

function Profile() { const details = [['Name', 'John Doe'], ['Patient ID', 'PAT-0001'], ['Date of Birth', '15 March 1998'], ['Email', 'john@example.com'], ['Account Status', 'Active']]; return <div className="space-y-6"><PageIntro title="My Profile" description="Your patient account information." /><Card><CardHeader><CardTitle>Patient information</CardTitle></CardHeader><CardContent className="flex flex-col gap-6 sm:flex-row"><div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground">JD</div><dl className="grid flex-1 gap-4 sm:grid-cols-2">{details.map(([label, value]) => <div key={label}><dt className="text-sm text-muted-foreground">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div>)}</dl></CardContent></Card></div> }

function SettingsPage({ onNotice }: { onNotice: (message: string) => void }) { const [notifications, setNotifications] = useState(true); return <div className="space-y-6"><PageIntro title="Settings" description="Manage your patient portal preferences." /><Card><CardHeader><CardTitle>Preferences</CardTitle></CardHeader><CardContent className="space-y-6"><div className="flex items-center justify-between gap-4"><Label htmlFor="notifications" className="space-y-1"><span className="block font-medium">Notifications</span><span className="block text-sm font-normal text-muted-foreground">Receive prediction and account alerts.</span></Label><Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} /></div><Button onClick={() => onNotice('Settings saved.')}>Save settings</Button></CardContent></Card></div> }

export default function PatientDashboard() {
  const navigate = useNavigate()
  const [page, setPage] = useState<Page>('dashboard')
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const changePage = (nextPage: Page) => { setPage(nextPage); setMobileNavigationOpen(false) }
  const content = page === 'dashboard' ? <Dashboard onPageChange={changePage} /> : page === 'prediction' ? <Prediction /> : page === 'history' ? <HistoryPage onPageChange={changePage} onNotice={setNotice} /> : page === 'about' ? <About /> : page === 'profile' ? <Profile /> : <SettingsPage onNotice={setNotice} />
  return <div className="min-h-screen bg-background text-foreground"><aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r bg-card md:block"><Navigation page={page} onPageChange={changePage} onLogout={() => navigate('/')} /></aside><Sheet open={mobileNavigationOpen} onOpenChange={setMobileNavigationOpen}><SheetContent side="left" className="w-72 p-0"><Navigation page={page} onPageChange={changePage} onLogout={() => navigate('/')} /></SheetContent></Sheet><main className="md:pl-64"><header className="flex items-center justify-between border-b bg-card px-4 py-3 md:px-8"><Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation" onClick={() => setMobileNavigationOpen(true)}><Menu className="h-5 w-5" /></Button><div className="hidden md:block" /><div className="flex items-center gap-3"><Button variant="ghost" size="icon" aria-label="Show notifications" onClick={() => setNotice('No new notifications.')}><Bell className="h-5 w-5" /></Button><div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">JD</div><div className="hidden sm:block"><p className="text-sm font-medium">John Doe</p><p className="text-xs text-muted-foreground">Patient</p></div></div></header><section className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{notice ? <div className="mb-5 flex items-center justify-between rounded-md border bg-muted px-4 py-3 text-sm"><span>{notice}</span><Button variant="ghost" size="sm" onClick={() => setNotice(null)}>Dismiss</Button></div> : null}{content}</section></main></div>
}
