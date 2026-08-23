import React,{useState} from "react";
import {Home,Activity,Upload,Brain,History,UserRound,Settings,LogOut,Bell,Menu,X,HeartPulse,Network,ShieldCheck,CheckCircle2,Clock3,Database,RefreshCw,ChevronRight,LockKeyhole} from "lucide-react";

const activity=[
 ["Global model received","Round 11 • 2 min ago",CheckCircle2,"green"],
 ["Model update prepared","Round 12 • 4 min ago",Upload,"blue"],
 ["Local training started","Round 12 • 8 min ago",Activity,"orange"],
 ["Privacy check completed","Round 12 • 10 min ago",ShieldCheck,"green"]
];

function Sidebar({page,setPage,open,setOpen}){
 const items=[["dashboard","Dashboard",Home],["training","Local Training",Activity],["updates","Model Update",Upload],["model","Global Model",Brain],["history","History",History],["profile","Profile",UserRound],["settings","Settings",Settings]];
 return <aside className={"sidebar "+(open?"open":"")}>
  <div className="sidebrand"><div className="logo"><HeartPulse/></div><div><b>Heart Disease</b><span>FL System</span></div><button className="close" onClick={()=>setOpen(false)}><X/></button></div>
  <nav>{items.map(([id,label,I])=><button key={id} className={"nav "+(page===id?"active":"")} onClick={()=>{setPage(id);setOpen(false)}}><I size={17}/>{label}</button>)}</nav>
  <button className="nav logout" onClick={()=>alert("Demo logout action")}><LogOut size={17}/>Logout</button>
 </aside>
}

function Header({setOpen,page}){
 const titles={dashboard:"Hospital Dashboard",training:"Local Training",updates:"Model Update",model:"Global Model",history:"History",profile:"Profile",settings:"Settings"};
 return <header><button className="hamb" onClick={()=>setOpen(true)}><Menu/></button><div><small>HOSPITAL CLIENT PORTAL</small><h1>{titles[page]}</h1><p>Hospital ID: HOSP-001 • Connected</p></div><div className="profile"><Bell size={19}/><button className="bell" onClick={()=>alert("No new notifications")}/><div className="avatar">HS</div><div><b>Dr. Smith</b><span>Hospital Admin</span></div></div></header>
}

function Stat({I,label,value,note,tone="",onClick}){
 return <button className={"stat "+tone} onClick={onClick}><span className="statIcon"><I size={21}/></span><span className="statText"><small>{label}</small><strong>{value}</strong><em>{note}</em></span><ChevronRight className="statArrow" size={15}/></button>
}

function Intro({title,sub,action,onAction,back}){
 return <div className="intro"><div>{back&&<button className="back" onClick={back}>← Back</button>}<h2>{title}</h2><p>{sub}</p></div>{action&&<button className="topAction" onClick={onAction}>{action}</button>}</div>
}

function Workflow({current="training"}){
 const steps=[
  ["Local Training","Training","orange",Activity],
  ["Model Update","Ready","blue",Upload],
  ["FedAvg","Waiting","purple",Network],
  ["Global Model","Received","green",Brain]
 ];
 return <div className="workflow">{steps.map((s,i)=>{const Icon=s[3];return <React.Fragment key={s[0]}><div className="step"><div className={"stepIcon "+s[2]}><Icon size={17}/></div><strong>{s[0]}</strong><small>Federated process</small><em className={s[2]}>{s[1]}</em></div>{i<3&&<ChevronRight className="arrow"/>}</React.Fragment>)}</div>
}

function Progress({value=65,label="Local training progress"}){return <div className="progress"><div><b>{label}</b><b>{value}%</b></div><span><i style={{width:value+"%"}}/></span></div>}

function Info({rows}){return <div className="info">{rows.map(r=><div key={r[0]}><span>{r[0]}</span><b>{r[1]}</b></div>)}</div>}

function ActivityList(){
 return <div className="activityList">{activity.map(([title,time,I,tone])=><div key={title}><span className={"activityIcon "+tone}><I size={15}/></span><span><b>{title}</b><small>{time}</small></span></div>)}</div>
}

function Dashboard({setPage}){
 return <><Intro title="Hospital Dashboard" sub="Privacy-preserving federated learning client overview."/>
 <div className="stats">
  <Stat I={Network} label="Current FL Round" value="12" note="In Progress" onClick={()=>setPage("training")}/>
  <Stat I={Activity} label="Local Training" value="65%" note="Training in progress" tone="orange" onClick={()=>setPage("training")}/>
  <Stat I={Upload} label="Model Update" value="Ready" note="Waiting for aggregation" tone="blue" onClick={()=>setPage("updates")}/>
  <Stat I={Brain} label="Global Model" value="Received" note="Version v2.1.0" tone="green" onClick={()=>setPage("model")}/>
 </div>
 <section className="panel"><div className="panelHead"><div><h3>Federated Learning Workflow</h3><p>Current round 12</p></div><button onClick={()=>setPage("training")}>View Training</button></div><Workflow/><Progress value={65}/></section>
 <div className="grid2">
  <section className="panel"><div className="panelHead"><div><h3>Training Progress</h3><p>Local model training</p></div><button onClick={()=>alert("Training refreshed")}>Refresh</button></div><Progress value={65}/><div className="time"><Clock3 size={15}/>Estimated time remaining <b>00:15:30</b></div><div className="trainingStats"><span><Database/>2,450 records</span><span><Network/>Round 12</span></div></section>
  <section className="panel"><div className="panelHead"><div><h3>System Information</h3><p>Hospital client</p></div></div><Info rows={[["Hospital ID","HOSP-001"],["Hospital","City Heart Hospital"],["Model Version","v2.1.0"],["Last Update","2 min ago"],["Connection","Secure"]]}/></section>
 </div>
 <section className="panel"><div className="panelHead"><div><h3>Recent Activity</h3><p>Latest federated learning events</p></div><button onClick={()=>alert("Activity refreshed")}>Refresh</button></div><ActivityList/></section>
 <div className="secure"><ShieldCheck/><div><b>Patient data stays here</b><span>Raw patient data never leaves this hospital. Only model updates participate in federated aggregation.</span></div></div>
 </>;
}

function Training({setPage}){
 const [running,setRunning]=useState(true),[value,setValue]=useState(65);
 return <><Intro title="Local Training" sub="Train the local model using data stored at HOSP-001." action={running?"Pause Training":"Start Training"} onAction={()=>setRunning(!running)}/>
 <div className="stats"><Stat I={Activity} label="Training Status" value={running?"Running":"Paused"} note={running?"65% complete":"Resume when ready"} tone="orange"/><Stat I={Database} label="Local Records" value="2,450" note="Stored locally" tone="blue"/><Stat I={Network} label="FL Round" value="12" note="Current round"/><Stat I={ShieldCheck} label="Privacy" value="Protected" note="Raw data stays local" tone="green"/></div>
 <section className="panel"><h3>Training Progress</h3><Progress value={value}/><div className="slider"><input type="range" min="0" max="100" value={value} onChange={e=>setValue(Number(e.target.value))}/></div><div className="trainingBox"><Activity/><b>{running?"Local model is training":"Training is paused"}</b><span>{running?"The hospital is training without sending patient records.":"Press Start Training to continue the demo."}</span></div></section>
 <section className="panel"><h3>Federated Privacy</h3><div className="secure"><ShieldCheck/><div><b>Protected local dataset</b><span>Only learned model parameters will be prepared for the next aggregation step.</span></div></div></section>
 </>;
}

function Updates(){
 const [sent,setSent]=useState(false);
 return <><Intro title="Model Update" sub="Prepare and send the local model update for FedAvg aggregation."/>
 <div className="updateCard"><div className="updateIcon"><Upload/></div><div><h3>{sent?"Update Sent":"Update Ready"}</h3><p>{sent?"The demo model update has been marked as submitted for Round 12.":"Your local model has completed its current preparation step."}</p></div><span className={"pill "+(sent?"done":"ready")}>{sent?"Submitted":"Ready"}</span></div>
 <div className="grid2"><section className="panel"><h3>Update Details</h3><Info rows={[["Hospital ID","HOSP-001"],["FL Round","12"],["Model Version","v2.1.0"],["Update Size","2.8 MB"],["Patient records shared","0"]]}/><button className="topAction full" onClick={()=>setSent(true)}>{sent?"Update Submitted":"Submit Model Update"}</button></section><section className="panel"><h3>Next Step</h3><div className="next"><Network/><b>FedAvg Aggregation</b><span>After participating clients submit their updates, the server can aggregate model parameters.</span></div></section></div>
 </>;
}

function Model(){
 return <><Intro title="Global Model" sub="View the global model received by this hospital."/>
 <div className="modelHero"><div className="modelIcon"><Brain/></div><div><small>GLOBAL MODEL</small><h2>v2.1.0</h2><p>Round 12 • Received 2 minutes ago</p></div><span className="pill done">Received</span></div>
 <div className="stats"><Stat I={GaugeIcon} label="Accuracy" value="92.4%" note="Global evaluation"/><Stat I={Activity} label="Precision" value="90.8%" note="Global evaluation" tone="blue"/><Stat I={HeartPulse} label="Recall" value="91.6%" note="Global evaluation" tone="green"/><Stat I={Brain} label="F1-Score" value="90.2%" note="Global evaluation"/></div>
 <section className="panel"><h3>Model Information</h3><Info rows={[["Model version","v2.1.0"],["Federated round","12"],["Aggregation","FedAvg"],["Status","Received"],["Deployment","Available locally"]]}/></section>
 </>;
}

function GaugeIcon(){return <Gauge size={21}/>}

function History(){
 return <><Intro title="History" sub="Recent federated learning activity for HOSP-001."/><section className="panel"><h3>Federated Learning History</h3><div className="historyTable">{[["Round 12","Local Training","65%","Today"],["Round 12","Model Update","Ready","Today"],["Round 11","Global Model","Received","Yesterday"],["Round 11","Aggregation","Completed","Yesterday"]].map(r=><div key={r.join("-")}><b>{r[0]}</b><span>{r[1]}</span><em>{r[2]}</em><small>{r[3]}</small></div>)}</div></section></>
}

function Profile(){return <><Intro title="Hospital Profile" sub="Hospital account and connection information."/><section className="panel"><h3>Hospital Details</h3><Info rows={[["Hospital ID","HOSP-001"],["Hospital Name","City Heart Hospital"],["Administrator","Dr. Smith"],["Role","Hospital Admin"],["Connection","Secure"],["FL Participation","Active"]]}/></section></>}

function SettingsPage(){
 const [notifications,setNotifications]=useState(true),[auto,setAuto]=useState(true);
 return <><Intro title="Settings" sub="Configure hospital portal preferences."/><section className="panel settings"><h3>Preferences</h3><label><span><b>Notifications</b><small>Receive training and model update alerts.</small></span><input type="checkbox" checked={notifications} onChange={e=>setNotifications(e.target.checked)}/></label><label><span><b>Auto refresh</b><small>Refresh federated learning status automatically.</small></span><input type="checkbox" checked={auto} onChange={e=>setAuto(e.target.checked)}/></label><button className="topAction" onClick={()=>alert("Settings saved")}>Save Settings</button></section></>
}

function App(){
 const[page,setPage]=useState("dashboard"),[open,setOpen]=useState(false);
 let content=page==="dashboard"?<Dashboard setPage={setPage}/>:page==="training"?<Training setPage={setPage}/>:page==="updates"?<Updates/>:page==="model"?<Model/>:page==="history"?<History/>:page==="profile"?<Profile/>:<SettingsPage/>;
 return <div className="app"><Sidebar page={page} setPage={setPage} open={open} setOpen={setOpen}/><main className="main"><Header setOpen={setOpen} page={page}/><section className="content">{content}</section></main></div>
}