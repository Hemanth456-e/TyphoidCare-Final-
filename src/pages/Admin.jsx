import React,{useState} from "react";
import {Home,Building2,Network,Brain,Gauge,Users,Settings,LogOut,Bell,Menu,X,HeartPulse,ShieldCheck,Activity,Upload,ChevronRight,ArrowLeft,CheckCircle2,Clock3,Server,RefreshCw} from "lucide-react";

const hospitals=[
 {id:"HOSP-001",name:"City Heart Hospital",status:"Completed",round:12,update:"2 min ago",records:"2,450",progress:100},
 {id:"HOSP-002",name:"Apollo Care Center",status:"Training",round:12,update:"1 min ago",records:"1,980",progress:65},
 {id:"HOSP-003",name:"Unity Medical",status:"Completed",round:12,update:"2 min ago",records:"3,120",progress:100},
 {id:"HOSP-004",name:"Green Valley Hospital",status:"Training",round:12,update:"Just now",records:"1,760",progress:48},
 {id:"HOSP-005",name:"Metro Cardiac Institute",status:"Completed",round:11,update:"5 min ago",records:"2,870",progress:100},
 {id:"HOSP-006",name:"Central Health",status:"Offline",round:11,update:"1 hr ago",records:"1,430",progress:0}
];

function Sidebar({page,setPage,open,setOpen}){
 const items=[["dashboard","Dashboard",Home],["hospitals","Hospitals",Building2],["monitoring","FL Monitoring",Network],["model","Global Model",Brain],["performance","Performance",Gauge],["users","Users",Users],["settings","Settings",Settings]];
 return <aside className={"sidebar "+(open?"open":"")}>
  <div className="sidebrand"><div className="logo"><HeartPulse/></div><div><b>Heart Disease</b><span>FL System</span></div><button className="close" onClick={()=>setOpen(false)}><X/></button></div>
  <nav>{items.map(([id,label,I])=><button key={id} className={"nav "+(page===id||page.startsWith(id+":")?"active":"")} onClick={()=>{setPage(id);setOpen(false)}}><I size={17}/>{label}</button>)}</nav>
  <button className="nav logout" onClick={()=>alert("Demo logout action")}><LogOut size={17}/>Logout</button>
 </aside>
}

function Header({setOpen,page}){
 const titles={dashboard:"Admin Dashboard",hospitals:"Hospitals",monitoring:"FL Monitoring",model:"Global Model",performance:"Performance",users:"Users",settings:"Settings"};
 return <header><button className="hamb" onClick={()=>setOpen(true)}><Menu/></button><div><small>HEALTHCARE AI PLATFORM</small><h1>{page.startsWith("hospitals:")?"Hospital Details":titles[page]||"Admin Dashboard"}</h1><p>Overview of Federated Learning System</p></div><div className="profile"><Bell size={19}/><button className="bell" onClick={()=>alert("No new notifications")}></button><div className="avatar">A</div><div><b>Admin</b><span>Super Admin</span></div></div></header>
}

function Stat({icon:Icon,label,value,note,tone="",onClick}){
 return <button className={"stat "+tone} onClick={onClick}><span className="statIcon"><Icon size={21}/></span><span className="statText"><small>{label}</small><strong>{value}</strong><em>{note}</em></span><ChevronRight className="statArrow" size={15}/></button>
}

function Intro({title,sub,action,onAction,back}){
 return <div className="intro">{<div>{back&&<button className="back" onClick={back}><ArrowLeft size={14}/>Back</button>}<h2>{title}</h2><p>{sub}</p></div>}{action&&<button className="topAction" onClick={onAction}>{action}</button>}</div>
}

function Workflow({progress=76}){
 const steps=[["Local Training","Completed","green",Activity],["Model Update","Ready","blue",Upload],["FedAvg","In Progress","purple",Network],["Global Model","Updated","green",Brain]];
 return <div>
  <div className="workflow">
   {steps.map((s,i)=>{
    const Icon=s[3];
    return <React.Fragment key={s[0]}>
     <div className="step">
      <div className={"stepIcon "+s[2]}><Icon size={17}/></div>
      <strong>{s[0]}</strong>
      <small>Federated process</small>
      <em className={s[2]}>{s[1]}</em>
     </div>
     {i<3&&<ChevronRight className="arrow"/>}
    </React.Fragment>
   })}
  </div>
  <div className="progress">
   <div><b>Round 12 in progress</b><b>{progress}%</b></div>
   <span><i style={{width:progress+"%"}}/></span>
  </div>
 </div>
}

function PerformanceChart(){
 const data=[["Accuracy",92.4],["Precision",90.8],["Recall",91.6],["F1-Score",90.2]];
 return <div className="chart">{data.map(([n,v])=><div className="barRow" key={n}><span>{n}</span><div><i style={{width:v+"%"}}/></div><b>{v}%</b></div>)}</div>
}

function Donut(){return <div className="donut"><div><strong>92.4%</strong><span>Accuracy</span></div></div>}

function HospitalTable({setPage}){
 return <div className="tableWrap"><table><thead><tr><th>Hospital ID</th><th>Hospital</th><th>Status</th><th>Last Update</th><th>Round</th><th></th></tr></thead><tbody>{hospitals.map(h=><tr key={h.id}><td><b>{h.id}</b></td><td>{h.name}</td><td><span className={"status "+h.status.toLowerCase()}>{h.status}</span></td><td>{h.update}</td><td>{h.round}</td><td><button className="view" onClick={()=>setPage("hospitals:"+h.id)}>View <ChevronRight size={13}/></button></td></tr>)}</tbody></table></div>
}

function Dashboard({setPage}){
 return <><Intro title="Admin Dashboard" sub="Overview of Federated Learning System."/>
 <div className="stats">
  <Stat icon={Building2} label="Total Hospitals" value="18" note="+2 this month" onClick={()=>setPage("hospitals")}/>
  <Stat icon={Users} label="Active Clients" value="15" note="● Online" tone="blue" onClick={()=>setPage("users")}/>
  <Stat icon={Network} label="Current FL Round" value="12" note="In Progress" onClick={()=>setPage("monitoring")}/>
  <Stat icon={ShieldCheck} label="Global Model Status" value="Updated" note="2 min ago" tone="green" onClick={()=>setPage("model")}/>
 </div>
 <div className="grid3">
  <section className="panel"><div className="panelHead"><div><h3>Hospital Status</h3><p>Participating clients</p></div><button onClick={()=>setPage("hospitals")}>View all</button></div><HospitalTable setPage={setPage}/></section>
  <section className="panel"><div className="panelHead"><div><h3>Federated Learning Process</h3><p>Current global round</p></div><button onClick={()=>setPage("monitoring")}>Monitor</button></div><Workflow/></section>
  <section className="panel"><div className="panelHead"><div><h3>Performance Overview</h3><p>Global model</p></div><button onClick={()=>setPage("performance")}>Details</button></div><Donut/><div className="metricsMini"><span>Accuracy <b>92.4%</b></span><span>Precision <b>90.8%</b></span><span>Recall <b>91.6%</b></span><span>F1-Score <b>90.2%</b></span></div></section>
 </div>
 <section className="panel"><div className="panelHead"><div><h3>System Notifications</h3><p>Latest activity</p></div><button onClick={()=>alert("Notifications refreshed")}>Refresh</button></div><div className="notification"><CheckCircle2 size={16}/><span>Round 12 aggregation completed from 10 hospitals.</span><small>2 min ago</small></div></section>
 </>;
}

function Hospitals({setPage}){
 return <><Intro title="Hospitals" sub="Manage and monitor each participating hospital." action="+ Add Hospital" onAction={()=>alert("Add Hospital demo action")}/><div className="hospitalGrid">{hospitals.map(h=><button className="hospitalCard" key={h.id} onClick={()=>setPage("hospitals:"+h.id)}><div className="hIcon"><Building2/></div><div className="hInfo"><small>{h.id}</small><h3>{h.name}</h3><span className={"status "+h.status.toLowerCase()}>{h.status}</span></div><div className="hMeta"><span>Round <b>{h.round}</b></span><span>Records <b>{h.records}</b></span></div><ChevronRight className="hcArrow"/></button>)}</div></>;
}

function HospitalDetails({id,setPage}){
 const h=hospitals.find(x=>x.id===id)||hospitals[0];
 return <><Intro back={()=>setPage("hospitals")} title={h.name} sub={`${h.id} • Individual Hospital Details`}/>
 <div className="stats"><Stat icon={Building2} label="Hospital ID" value={h.id} note={h.name}/><Stat icon={Network} label="Current FL Round" value={h.round} note="Active" tone="blue"/><Stat icon={Activity} label="Training Status" value={h.status} note={h.progress+"% progress"} tone="orange"/><Stat icon={Brain} label="Global Model" value="v2.1.0" note="Updated 2 min ago" tone="green"/></div>
 <div className="grid2"><section className="panel"><div className="panelHead"><div><h3>Federated Learning Workflow</h3><p>{h.id} current round</p></div><button onClick={()=>alert("Training restarted for demo")}>Restart</button></div><Workflow progress={h.progress||65}/></section><section className="panel"><div className="panelHead"><div><h3>Hospital Information</h3><p>Client details</p></div></div><Info rows={[["Hospital ID",h.id],["Patient records",h.records],["Current round",h.round],["Last update",h.update],["Privacy status","Protected"]]}/></section></div>
 <section className="panel"><div className="panelHead"><div><h3>Training Activity</h3><p>Recent events</p></div><button onClick={()=>alert("Activity refreshed")}>Refresh</button></div><ActivityList/></section></>
}

function Info({rows}){return <div className="info">{rows.map(r=><div key={r[0]}><span>{r[0]}</span><b>{r[1]}</b></div>)}</div>}
function ActivityList(){return <div className="activityList"><div><CheckCircle2/><span><b>Global model received</b><small>Round 11 • 2 min ago</small></span></div><div><Upload/><span><b>Model update prepared</b><small>Round 12 • 4 min ago</small></span></div><div><Activity/><span><b>Local training started</b><small>Round 12 • 8 min ago</small></span></div></div>}

function Generic({page,setPage}){
 const content={
 monitoring:["FL Monitoring","Monitor every federated learning round and client status."],
 model:["Global Model","Global model versions, aggregation and deployment status."],
 performance:["Performance","Global model evaluation metrics."],
 users:["Users","Manage platform users and roles."],
 settings:["Settings","Configure admin dashboard preferences."]
 }[page]||["Admin Dashboard",""];
 return <><Intro title={content[0]} sub={content[1]}/>{page==="performance"?<><div className="stats"><Stat icon={Gauge} label="Accuracy" value="92.4%" note="Latest global model"/><Stat icon={Activity} label="Precision" value="90.8%" note="Latest global model" tone="blue"/><Stat icon={HeartPulse} label="Recall" value="91.6%" note="Latest global model"/><Stat icon={Brain} label="F1-Score" value="90.2%" note="Latest global model" tone="green"/></div><section className="panel"><h3>Metric Comparison</h3><PerformanceChart/></section></>:page==="monitoring"?<section className="panel"><h3>Federated Learning Round 12</h3><Workflow progress={76}/><HospitalTable setPage={setPage}/></section>:page==="model"?<section className="panel"><h3>Global Model Status</h3><div className="bigStatus"><CheckCircle2/><strong>Updated</strong><span>Version v2.1.0 • Round 12 • 2 min ago</span></div><button className="topAction" onClick={()=>alert("Model deployment demo action")}>Deploy Model</button></section>:page==="users"?<section className="panel"><h3>Platform Users</h3><div className="userRows">{["Admin • Super Admin","Dr. Smith • HOSP-001","Hospital Admin • HOSP-002","Demo Patient • User"].map(x=><div key={x}><Users/><b>{x}</b><button onClick={()=>alert("User details demo")}>View</button></div>)}</div></section>:<section className="panel"><h3>Admin Settings</h3><Info rows={[["Auto refresh","Enabled"],["Notifications","Enabled"],["Theme","Light"],["Federated privacy","Enabled"]]}/><button className="topAction" onClick={()=>alert("Settings saved")}>Save Settings</button></section>}</>;
}

export default function AdminPage(){
 const[page,setPage]=useState("dashboard"),[open,setOpen]=useState(false);
 const content=page==="dashboard"?<Dashboard setPage={setPage}/>:page==="hospitals"?<Hospitals setPage={setPage}/>:page.startsWith("hospitals:")?<HospitalDetails id={page.split(":")[1]} setPage={setPage}/>:<Generic page={page} setPage={setPage}/>;
 return <div className="app"><Sidebar page={page} setPage={setPage} open={open} setOpen={setOpen}/><main className="main"><Header setOpen={setOpen} page={page}/><section className="content">{content}</section></main></div>;
}