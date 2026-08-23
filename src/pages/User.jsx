import React,{useState} from "react";
import {Home,HeartPulse,ClipboardPlus,Info,UserRound,Settings,LogOut,Bell,Menu,X,ShieldCheck,Activity,History,ChevronRight,ArrowLeft,CheckCircle2,AlertCircle,LockKeyhole,CalendarDays} from "lucide-react";

function Sidebar({page,setPage,open,setOpen}){
 const items=[["dashboard","Dashboard",Home],["prediction","Prediction",ClipboardPlus],["history","My History",History],["about","About Project",Info],["profile","Profile",UserRound],["settings","Settings",Settings]];
 return <aside className={"sidebar "+(open?"open":"")}>
  <div className="sidebrand"><div className="logo"><HeartPulse/></div><div><b>Heart Disease</b><span>FL System</span></div><button className="close" onClick={()=>setOpen(false)}><X/></button></div>
  <nav>{items.map(([id,label,I])=><button key={id} className={"nav "+(page===id?"active":"")} onClick={()=>{setPage(id);setOpen(false)}}><I size={17}/>{label}</button>)}</nav>
  <button className="nav logout" onClick={()=>alert("Demo logout action")}><LogOut size={17}/>Logout</button>
 </aside>
}

function Header({setOpen,page}){
 const titles={dashboard:"Patient Dashboard",prediction:"Heart Disease Prediction",history:"My Prediction History",about:"About Project",profile:"My Profile",settings:"Settings"};
 return <header><button className="hamb" onClick={()=>setOpen(true)}><Menu/></button><div><small>PATIENT PORTAL</small><h1>{titles[page]}</h1><p>Privacy-preserving heart disease prediction</p></div><div className="profile"><Bell size={19}/><button className="bell" onClick={()=>alert("No new notifications")}/><div className="avatar">JD</div><div><b>John Doe</b><span>Patient</span></div></div></header>
}

function Intro({title,sub,action,onAction,back}){
 return <div className="intro"><div>{back&&<button className="back" onClick={back}><ArrowLeft size={14}/>Back</button>}<h2>{title}</h2><p>{sub}</p></div>{action&&<button className="topAction" onClick={onAction}>{action}</button>}</div>
}

function Stat({I,label,value,note,tone="",onClick}){
 return <button className={"stat "+tone} onClick={onClick}><span className="statIcon"><I size={21}/></span><span className="statText"><small>{label}</small><strong>{value}</strong><em>{note}</em></span><ChevronRight className="statArrow" size={15}/></button>
}

function PrivacyCard(){
 return <div className="privacy"><ShieldCheck/><div><b>Your privacy is protected</b><span>Your health information stays protected. The prediction uses the federated learning model without sending your raw patient data to other hospitals.</span></div></div>
}

function Dashboard({setPage}){
 return <><Intro title="Patient Dashboard" sub="Welcome back, John. Manage your heart health prediction securely."/>
 <div className="welcomeCard"><div className="welcomeIcon"><HeartPulse/></div><div><h3>Ready for a prediction?</h3><p>Enter your health information to receive a heart disease risk prediction.</p></div><button onClick={()=>setPage("prediction")}>Start Prediction <ChevronRight size={14}/></button></div>
 <div className="stats"><Stat I={Activity} label="Last Prediction" value="Not Detected" note="12 Aug 2026" tone="green" onClick={()=>setPage("history")}/><Stat I={History} label="Predictions Made" value="3" note="View history" tone="blue" onClick={()=>setPage("history")}/><Stat I={ShieldCheck} label="Privacy Status" value="Protected" note="Federated Learning" tone="green" onClick={()=>setPage("about")}/><Stat I={CalendarDays} label="Profile Status" value="Complete" note="View profile" onClick={()=>setPage("profile")}/></div>
 <div className="grid2"><section className="panel"><div className="panelHead"><div><h3>Latest Prediction</h3><p>Your most recent result</p></div><button onClick={()=>setPage("history")}>View history</button></div><div className="resultMini"><div className="resultIcon safe"><CheckCircle2/></div><div><strong>Heart Disease: Not Detected</strong><span>Prediction completed on 12 Aug 2026</span></div></div></section>
 <section className="panel"><div className="panelHead"><div><h3>How it works</h3><p>Privacy-preserving AI</p></div></div><div className="how"><span><b>1</b><strong>Enter data</strong><small>Health information</small></span><span><b>2</b><strong>Secure prediction</strong><small>Protected processing</small></span><span><b>3</b><strong>Get result</strong><small>Instant feedback</small></span></div></section></div>
 <PrivacyCard/></>
}

function Field({label,name,type="text",value,onChange,placeholder}){return <label className="fieldLabel"><span>{label}</span><input name={name} type={type} value={value} onChange={onChange} placeholder={placeholder}/></label>}

function Prediction(){
 const initial={age:"",sex:"",cp:"",trestbps:"",chol:"",fbs:"",restecg:"",thalach:"",exang:"",oldpeak:"",slope:"",ca:"",thal:""};
 const [form,setForm]=useState(initial),[result,setResult]=useState(null);
 const update=e=>setForm({...form,[e.target.name]:e.target.value});
 const predict=e=>{e.preventDefault();const nums=["age","trestbps","chol","thalach"].map(k=>Number(form[k])||0);const risk=nums[0]>=60||nums[1]>=150||nums[2]>=240||nums[3]<100;setResult(risk?"Detected":"Not Detected")};
 return <><Intro title="Heart Disease Prediction" sub="Enter your health information. Your data remains protected."/>
 <form className="panel formPanel" onSubmit={predict}><div className="formTitle"><HeartPulse/><div><h3>Patient Information</h3><p>Enter the required health features for the prediction model.</p></div></div><div className="formGrid">
 <Field label="Age" name="age" type="number" value={form.age} onChange={update} placeholder="e.g. 52"/>
 <label className="fieldLabel"><span>Sex</span><select name="sex" value={form.sex} onChange={update}><option value="">Select</option><option>Male</option><option>Female</option></select></label>
 <label className="fieldLabel"><span>Chest Pain Type</span><select name="cp" value={form.cp} onChange={update}><option value="">Select</option><option>Typical angina</option><option>Atypical angina</option><option>Non-anginal pain</option><option>Asymptomatic</option></select></label>
 <Field label="Resting Blood Pressure" name="trestbps" type="number" value={form.trestbps} onChange={update} placeholder="mm Hg"/>
 <Field label="Cholesterol" name="chol" type="number" value={form.chol} onChange={update} placeholder="mg/dl"/>
 <label className="fieldLabel"><span>Fasting Blood Sugar</span><select name="fbs" value={form.fbs} onChange={update}><option value="">Select</option><option>Normal</option><option>High</option></select></label>
 <label className="fieldLabel"><span>Resting ECG</span><select name="restecg" value={form.restecg} onChange={update}><option value="">Select</option><option>Normal</option><option>ST-T abnormality</option><option>LV hypertrophy</option></select></label>
 <Field label="Maximum Heart Rate" name="thalach" type="number" value={form.thalach} onChange={update} placeholder="bpm"/>
 <label className="fieldLabel"><span>Exercise Induced Angina</span><select name="exang" value={form.exang} onChange={update}><option value="">Select</option><option>No</option><option>Yes</option></select></label>
 <Field label="Oldpeak" name="oldpeak" type="number" value={form.oldpeak} onChange={update} placeholder="e.g. 1.4"/>
 <label className="fieldLabel"><span>Slope</span><select name="slope" value={form.slope} onChange={update}><option value="">Select</option><option>Upsloping</option><option>Flat</option><option>Downsloping</option></select></label>
 <label className="fieldLabel"><span>Number of Major Vessels</span><select name="ca" value={form.ca} onChange={update}><option value="">Select</option><option>0</option><option>1</option><option>2</option><option>3</option></select></label>
 <label className="fieldLabel"><span>Thalassemia</span><select name="thal" value={form.thal} onChange={update}><option value="">Select</option><option>Normal</option><option>Fixed defect</option><option>Reversible defect</option></select></label>
 </div><div className="formBottom"><div><LockKeyhole size={15}/><span>Data is processed securely for this prediction.</span></div><button className="predict">Predict Heart Disease <Activity size={16}/></button></div></form>
 {result&&<section className={"result "+(result==="Detected"?"risk":"safe")}><div className="resultBig">{result==="Detected"?<AlertCircle/>:<CheckCircle2/>}</div><div><small>PREDICTION RESULT</small><h2>Heart Disease: {result}</h2><p>{result==="Detected"?"The model indicates an elevated risk. Please consult a qualified healthcare professional.":"The model did not detect heart disease from the entered features. Continue regular health checkups."}</p></div><button onClick={()=>setResult(null)}>New Prediction</button></section>}
 <PrivacyCard/></>
}

function HistoryPage({setPage}){
 const rows=[["12 Aug 2026","Not Detected","92.4%","Completed"],["02 Aug 2026","Not Detected","89.7%","Completed"],["18 Jul 2026","Detected","86.1%","Completed"]];
 return <><Intro title="My Prediction History" sub="Your previous heart disease prediction results." action="New Prediction" onAction={()=>setPage("prediction")}/><section className="panel"><h3>Prediction History</h3><div className="history">{rows.map(r=><div key={r[0]}><span><CalendarDays/>{r[0]}</span><b className={r[1]==="Detected"?"danger":"good"}>{r[1]}</b><span>{r[2]}</span><small>{r[3]}</small><button onClick={()=>alert("Prediction details demo")}>View</button></div>)}</div></section></>
}

function About(){
 return <><Intro title="About Project" sub="Learn how privacy-preserving federated learning protects patient data."/><section className="aboutHero"><HeartPulse/><div><h2>Federated Learning for Heart Disease Prediction</h2><p>The system allows hospitals to collaboratively improve a global prediction model while keeping raw patient information inside each hospital.</p></div></section><div className="grid3"><section className="panel"><ShieldCheck/><h3>Privacy First</h3><p>Raw patient records remain local to the hospital and are not shared with other clients.</p></section><section className="panel"><NetworkIcon/><h3>Collaborative Learning</h3><p>Hospitals contribute model updates that can be aggregated into a stronger global model.</p></section><section className="panel"><Activity/><h3>Heart Health AI</h3><p>The interface collects heart-disease-related features and presents a prediction result.</p></section></div></>
}
function NetworkIcon(){return <Activity/>}

function Profile(){return <><Intro title="My Profile" sub="Your patient account information."/><section className="panel"><h3>Patient Information</h3><div className="profileGrid"><div className="avatarLarge">JD</div><div><Info rows={[["Name","John Doe"],["Patient ID","PAT-0001"],["Date of Birth","15 March 1998"],["Email","john@example.com"],["Account Status","Active"]]}/></div></div></section></>}
function Info({rows}){return <div className="info">{rows.map(r=><div key={r[0]}><span>{r[0]}</span><b>{r[1]}</b></div>)}</div>}
function SettingsPage(){const[n,setN]=useState(true);return <><Intro title="Settings" sub="Manage your patient portal preferences."/><section className="panel settings"><h3>Preferences</h3><label><span><b>Notifications</b><small>Receive prediction and account alerts.</small></span><input type="checkbox" checked={n} onChange={e=>setN(e.target.checked)}/></label><button className="topAction" onClick={()=>alert("Settings saved")}>Save Settings</button></section></>}

function App(){
 const[page,setPage]=useState("dashboard"),[open,setOpen]=useState(false);
 let content=page==="dashboard"?<Dashboard setPage={setPage}/>:page==="prediction"?<Prediction/>:page==="history"?<HistoryPage setPage={setPage}/>:page==="about"?<About/>:page==="profile"?<Profile/>:<SettingsPage/>;
 return <div className="app"><Sidebar page={page} setPage={setPage} open={open} setOpen={setOpen}/><main className="main"><Header setOpen={setOpen} page={page}/><section className="content">{content}</section></main></div>
}