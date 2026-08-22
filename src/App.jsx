import React,{useState} from "react";
import {HeartPulse,Heart,ShieldCheck,Building2,Users,Network,Brain,Gauge,Activity,Upload,Home,Settings,UserRound,History,HelpCircle,ClipboardList,LogOut,Bell,Menu,X,ChevronRight,CircleUserRound,LockKeyhole} from "lucide-react";

const hospitals=[
{id:"HOSP-001",name:"City Heart Hospital",status:"Completed",update:"2 min ago"},
{id:"HOSP-002",name:"Apollo Care Center",status:"Training",update:"1 min ago"},
{id:"HOSP-003",name:"Unity Medical",status:"Completed",update:"2 min ago"},
{id:"HOSP-004",name:"Green Valley Hospital",status:"Training",update:"Just now"}
];

const pageTitle=(role,page)=>({
dashboard:role==="Admin"?"Admin Dashboard":role==="Hospital"?"Hospital Dashboard":"Patient Dashboard",
hospitals:"Hospitals",monitoring:"FL Monitoring",model:"Global Model",performance:"Performance",users:"Users",
training:"Local Training",updates:"Model Update",history:"History",profile:"Profile",settings:"Settings",
prediction:"Heart Disease Prediction",privacy:"Privacy",help:"Help"
}[page]||"Dashboard");

function Login({login}){
 const [role,setRole]=useState("Admin");
 return <div className="login">
  <div className="login-left">
   <div className="brand"><div className="logo"><HeartPulse/></div><div><b>Heart Disease</b><span>Federated Learning</span></div></div>
   <div className="brand-copy"><h1>Heart Disease</h1><h2>Federated Learning</h2><p>Privacy-Preserving AI for<br/>Better Healthcare</p>
    <div className="heart-art"><HeartPulse size={145}/><Building2 className="node a"/><Building2 className="node b"/><Building2 className="node c"/></div>
   </div>
   <div className="safe"><ShieldCheck/><div><b>Your data is safe.</b><p>We use Federated Learning to protect patient privacy.</p></div></div>
  </div>
  <div className="login-right"><form className="login-card" onSubmit={e=>{e.preventDefault();login(role)}}>
   <div className="welcome"><h2>Welcome Back</h2><p>Sign in to continue</p></div>
   <label>Username or Email</label><div className="field"><UserRound size={16}/><input placeholder="Username or Email"/></div>
   <label>Password</label><div className="field"><LockKeyhole size={16}/><input type="password" placeholder="Password" defaultValue="demo"/></div>
   <div className="role-row"><label>Login as</label><select value={role} onChange={e=>setRole(e.target.value)}><option>Admin</option><option>Hospital</option><option>User</option></select></div>
   <button className="primary">Sign In</button><button className="link" type="button">Forgot password?</button>
   <div className="copyright">© 2026 Heart Disease FL System</div>
  </form></div>
 </div>
}

function Layout({role,page,setPage,logout,children}){
 const [open,setOpen]=useState(false);
 const menus=role==="Admin"?[
  ["dashboard","Dashboard",Home],["hospitals","Hospitals",Building2],["monitoring","FL Monitoring",Network],["model","Global Model",Brain],["performance","Performance",Gauge],["users","Users",Users],["settings","Settings",Settings]
 ]:role==="Hospital"?[
  ["dashboard","Dashboard",Home],["training","Local Training",Activity],["updates","Model Update",Upload],["model","Global Model",Brain],["history","History",History],["profile","Profile",UserRound],["settings","Settings",Settings]
 ]:[
  ["dashboard","Dashboard",Home],["prediction","Predict",HeartPulse],["history","History",ClipboardList],["profile","Profile",UserRound],["privacy","Privacy",ShieldCheck],["help","Help",HelpCircle]
 ];
 return <div className="app"><aside className={"sidebar "+(open?"open":"")}>
  <div className="side-brand"><div className="logo small"><HeartPulse size={18}/></div><div><b>Heart Disease</b><span>FL System</span></div><button className="close" onClick={()=>setOpen(false)}><X/></button></div>
  <nav>{menus.map(([id,label,Icon])=><button key={id} className={"nav "+(page===id?"active":"")} onClick={()=>{setPage(id);setOpen(false)}}><Icon size={17}/>{label}</button>)}</nav>
  <button className="nav logout" onClick={logout}><LogOut size={17}/>Logout</button>
 </aside><main className="main">
  <header><button className="hamb" onClick={()=>setOpen(true)}><Menu/></button><div><small>HEALTHCARE AI PLATFORM</small><h1>{pageTitle(role,page)}</h1></div><div className="user"><Bell size={18}/><span className="avatar"><CircleUserRound size={18}/></span><div><b>{role==="Admin"?"Admin":role==="Hospital"?"Dr. Smith":"Patient"}</b><small>{role==="Admin"?"Super Admin":role==="Hospital"?"Hospital Admin":"Patient"}</small></div></div></header>
  <section className="content">{children}</section>
 </main></div>
}

function Intro({title,sub}){return <div className="intro"><div><h2>{title}</h2><p>{sub}</p></div><span className="online">● System Online</span></div>}

function Stat({icon:Icon,label,value,note,tone="purple"}){return <div className="stat"><div className={"stat-icon "+tone}><Icon size={21}/></div><div><small>{label}</small><strong>{value}</strong><em>{note}</em></div></div>}

function Panel({title,children}){return <section className="panel"><h3>{title}</h3>{children}</section>}

function Workflow(){
 const steps=[["Local Training","Train local data","Completed","green"],["Model Update","Upload updates","Ready","blue"],["FedAvg","Aggregate updates","In Progress","purple"],["Global Model","Receive model","Completed","green"]];
 return <div className="workflow">{steps.map((s,i)=><React.Fragment key={s[0]}><div className="step"><b className={"num "+s[3]}>{i+1}</b><strong>{s[0]}</strong><small>{s[1]}</small><em className={s[3]}>{s[2]}</em></div>{i<3&&<ChevronRight className="arrow"/>}</React.Fragment>)}</div>
}

function Progress({value=65,label="Progress"}){return <div className="progress"><div><b>{label}</b><b>{value}%</b></div><span><i style={{width:value+"%"}}/></span></div>}

function Admin({page,setPage}){
 if(page==="hospitals")return <><Intro title="Hospitals" sub="Manage and monitor participating hospitals."/><div className="hospital-grid">{hospitals.map(h=><div className="hospital-card" key={h.id}><div className="hospital-icon"><Building2/></div><div><small>{h.id}</small><h3>{h.name}</h3><p className={h.status==="Training"?"orange":"green"}>● {h.status}</p></div><button onClick={()=>setPage("hospital:"+h.id)}>View Hospital <ChevronRight size={15}/></button></div>)}</div></>;
 if(page.startsWith("hospital:")){let h=hospitals.find(x=>x.id===page.split(":")[1])||hospitals[0];return <><button className="back" onClick={()=>setPage("hospitals")}>← Back to Hospitals</button><Intro title={h.name} sub={`${h.id} • Individual Hospital Details`}/><div className="stats"><Stat icon={Building2} label="Hospital ID" value={h.id} note={h.name} tone="blue"/><Stat icon={Network} label="Current Round" value="12" note="Active" tone="purple"/><Stat icon={Activity} label="Local Training" value={h.status} note="Status" tone="orange"/><Stat icon={Brain} label="Global Model" value="Received" note="v2.1.0" tone="blue"/></div><div className="two"><Panel title="Federated Learning Workflow"><Workflow/></Panel><Panel title="System Information"><Info rows={[["Last Update","2 min ago"],["Data Records","2,450"],["Model Version","v2.1.0"],["Privacy","Protected"]]}/></Panel></div><Panel title="Training Progress"><Progress/></Panel></>}

 if(page==="dashboard")return <><Intro title="Admin Dashboard" sub="Overview of Federated Learning System."/><div className="stats"><Stat icon={Building2} label="Total Hospitals" value="18" note="+2 this month"/><Stat icon={Users} label="Active Clients" value="15" note="● Online" tone="blue"/><Stat icon={Network} label="Current FL Round" value="12" note="In Progress"/><Stat icon={ShieldCheck} label="Global Model Status" value="Updated" note="2 min ago" tone="blue"/></div><div className="admin-grid"><Panel title="Hospital Status"><Table/><button className="text" onClick={()=>setPage("hospitals")}>View All Hospitals</button></Panel><Panel title="Federated Learning Process"><Workflow/><Progress value={76} label="Round 12 in progress"/></Panel><Panel title="Performance Overview"><div className="donut"><b>92.4%<small>Accuracy</small></b></div><div className="legend"><span>Accuracy <b>92.4%</b></span><span>Precision <b>90.8%</b></span><span>Recall <b>91.6%</b></span><span>F1-Score <b>90.2%</b></span></div></Panel></div><Panel title="System Notifications"><p className="notification">● Round 12 aggregation completed from 10 hospitals. <small>2 min ago</small></p></Panel></>;

 return <><Intro title={pageTitle("Admin",page)} sub="Professional frontend monitoring screen."/><div className="stats"><Stat icon={Gauge} label="Accuracy" value="92.4%" note="Latest model"/><Stat icon={Activity} label="Precision" value="90.8%" note="Latest model" tone="blue"/><Stat icon={HeartPulse} label="Recall" value="91.6%" note="Latest model"/><Stat icon={Brain} label="F1-Score" value="90.2%" note="Latest model" tone="blue"/></div><Panel title="Federated Learning / Global Model Status"><Workflow/><Progress value={76}/></Panel></>
}

function Table(){return <table><thead><tr><th>Hospital ID</th><th>Status</th><th>Last Update</th><th>Round</th></tr></thead><tbody>{hospitals.map(h=><tr key={h.id}><td>{h.id}</td><td className={h.status==="Training"?"orange":"green"}>{h.status}</td><td>{h.update}</td><td>12</td></tr>)}</tbody></table>}
function Info({rows}){return <div className="info">{rows.map(r=><div key={r[0]}><span>{r[0]}</span><b>{r[1]}</b></div>)}</div>}

function Hospital({page}){
 if(page==="dashboard")return <><Intro title="Hospital Dashboard" sub="Hospital ID: HOSP-001"/><div className="stats"><Stat icon={Network} label="Current Round" value="12" note="Active"/><Stat icon={Activity} label="Local Training" value="Training" note="65% complete" tone="orange"/><Stat icon={Upload} label="Model Update" value="Ready" note="Waiting" tone="blue"/><Stat icon={Brain} label="Global Model" value="Received" note="v2.1.0" tone="green"/></div><Panel title="Federated Learning Workflow"><Workflow/></Panel><div className="two"><Panel title="Training Progress"><Progress/><p>Estimated time remaining: 00:15:30</p></Panel><Panel title="System Information"><Info rows={[["Last Update","2 min ago"],["Data Records","2,450"],["Model Version","v2.1.0"]]}/></Panel></div><div className="secure"><ShieldCheck/>Your patient data is secure and never leaves your hospital.</div></>;
 return <><Intro title={pageTitle("Hospital",page)} sub="Hospital client portal."/><Panel title={page==="training"?"Local Training":page==="updates"?"Model Update":page==="model"?"Global Model":page==="history"?"Recent FL Activity":page==="profile"?"Hospital Profile":"Settings"}>{page==="training"?<Progress/>:page==="updates"?<><div className="big green">READY</div><p>Round 12 model update is ready for aggregation.</p></>:page==="model"?<Info rows={[["Status","Received"],["Model Version","v2.1.0"],["Round","12"]]}/>:page==="history"?<Info rows={[["Local training","5 min ago"],["Model update","3 min ago"],["Global model","2 min ago"]]}/>:page==="profile"?<Info rows={[["Hospital ID","HOSP-001"],["Administrator","Dr. Smith"],["Status","Connected"]]}/>:<Info rows={[["Notifications","Enabled"],["Privacy","Enabled"],["Theme","Light"]]}/>}</Panel></>
}

function Patient({page}){
 if(page==="dashboard")return <><Intro title="Patient Dashboard" sub="Privacy-preserving heart disease prediction."/><div className="stats"><Stat icon={HeartPulse} label="Latest Result" value="Low Risk" note="No disease detected" tone="green"/><Stat icon={ShieldCheck} label="Privacy" value="Protected" note="Federated Learning" tone="blue"/></div><Prediction/></>;
 if(page==="prediction")return <Prediction/>;
 return <><Intro title={pageTitle("User",page)} sub="Patient portal."/><Panel title={page==="history"?"Prediction History":page==="privacy"?"Privacy Protection":page==="profile"?"Profile":"Help"}>{page==="history"?<Table/>:page==="privacy"?<div className="privacy"><ShieldCheck size={38}/><h3>Your data is protected</h3><p>Raw patient information is designed to remain at the participating institution.</p></div>:page==="profile"?<Info rows={[["Name","Demo Patient"],["Patient ID","USER-001"],["Privacy","Protected"]]}/>:<p>Use the Predict page to enter patient information and view the demo result.</p>}</Panel></>
}

function Prediction(){
 const [result,setResult]=useState(false);
 const fields=["Age","Sex","Chest Pain Type","Resting Blood Pressure","Cholesterol","Fasting Blood Sugar","Resting ECG","Max Heart Rate","Exercise Induced Angina","ST Depression","Slope","Number of Vessels","Thalassemia"];
 return <div className="prediction"><Panel title="Patient Information"><div className="form">{fields.map(f=><label key={f}>{f}{["Sex","Chest Pain Type","Fasting Blood Sugar","Resting ECG","Exercise Induced Angina","Slope","Number of Vessels","Thalassemia"].includes(f)?<select><option>Select</option><option>Option 1</option><option>Option 2</option></select>:<input placeholder={f==="Age"?"Enter age":"Enter value"}/>}</label>)}</div><button className="primary predict" onClick={()=>setResult(true)}><HeartPulse size={17}/>Predict Heart Disease</button></Panel><div className="result"><h3>Prediction Result</h3><div className="result-heart"><HeartPulse size={50}/></div>{result?<><h2>Low Risk</h2><b className="green">No Heart Disease Detected</b><div className="confidence"><span>Confidence Score</span><b>92.7%</b><i/></div></>:<><h2>Awaiting Input</h2><p>Submit patient information to display the demo result.</p></>}<div className="medical"><ShieldCheck size={17}/>This is an AI prediction interface for demonstration. Please consult a doctor for proper diagnosis.</div></div></div>
}

export default function App(){
 const [role,setRole]=useState(null),[page,setPage]=useState("dashboard");
 const login=r=>{setRole(r);setPage("dashboard")},logout=()=>setRole(null);
 if(!role)return <Login login={login}/>;
 let content=role==="Admin"?<Admin page={page} setPage={setPage}/>:role==="Hospital"?<Hospital page={page}/>:<Patient page={page}/>;
 return <Layout role={role} page={page} setPage={setPage} logout={logout}>{content}</Layout>
}